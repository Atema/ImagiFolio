import { useRouter } from "next/navigation";
import { useCallback, useEffect, useReducer, useRef } from "react";
import getLocalImagePreview from "./image-preview";

type UploadFile = {
  id: number;
  file: File;
  status: "waiting" | "queued" | "uploading" | "success" | "error";
  error?: string;
  preview?: string;
};

type UploadQueueState = {
  files: UploadFile[];
  next: UploadFile | null;
  current: number;
};

const uploadQueueInit = {
  files: [],
  next: null,
  current: 0,
};

type UploadQueueAction = {
  /** The type of action to dispatch */
  type: string;
} & (
  | {
      type: "enqueue";

      /** Unqiue identifier to identify the file */
      id: number;

      /** The file to add to the queue */
      file: File;
    }
  | {
      type: "preview";

      /** Identifier of the file to add the preview to */
      id: number;

      /** (Object) URL of the preview */
      preview: string;
    }
  | {
      type: "start-upload";

      /** Identifier of the file to start the upload of */
      id: number;
    }
  | {
      type: "finish-upload";

      /** Identifier of the file to finish the upload of */
      id: number;
    }
  | {
      type: "error-upload";

      /** Identifier of the file to report as error */
      id: number;

      /** The error message */
      error: string;
    }
);

const ensureQueue = (state: UploadQueueState): UploadQueueState => {
  if (state.next || state.current >= 3) return state;

  const next = state.files.find((file) => file.status == "waiting");
  if (!next) return state;

  return {
    ...state,
    next,
    files: state.files.map((f) =>
      next.id == f.id ? { ...f, status: "queued" } : f,
    ),
  };
};

const uploadQueueReducer = (
  state: UploadQueueState,
  action: UploadQueueAction,
): UploadQueueState => {
  switch (action.type) {
    case "enqueue":
      return ensureQueue({
        ...state,
        files: [
          ...state.files,
          {
            id: action.id,
            file: action.file,
            status: "waiting",
          },
        ],
      });

    case "preview":
      return {
        ...state,
        files: state.files.map((ul) =>
          ul.id == action.id
            ? {
                ...ul,
                preview: action.preview,
              }
            : ul,
        ),
      };

    case "start-upload":
      return ensureQueue({
        ...state,
        next: null,
        current: state.current + 1,
        files: state.files.map((ul) =>
          ul.id == action.id
            ? {
                ...ul,
                status: "uploading",
              }
            : ul,
        ),
      });

    case "finish-upload":
      return ensureQueue({
        ...state,
        current: state.current - 1,
        files: state.files.map((ul) =>
          ul.id == action.id
            ? {
                ...ul,
                status: "success",
              }
            : ul,
        ),
      });

    case "error-upload":
      return ensureQueue({
        ...state,
        current: state.current - 1,
        files: state.files.map((ul) =>
          ul.id == action.id
            ? {
                ...ul,
                status: "error",
                error: action.error,
              }
            : ul,
        ),
      });

    default:
      return state;
  }
};

export const useUploadQueue = (albumId: string) => {
  const [{ files, next }, dispatchUploadQueue] = useReducer(
    uploadQueueReducer,
    uploadQueueInit,
  );
  const router = useRouter();

  const idCounter = useRef(1);

  const queueUpload = useCallback((file: File) => {
    const id = idCounter.current++;

    dispatchUploadQueue({
      type: "enqueue",
      id,
      file,
    });

    getLocalImagePreview(file, 100).then((preview) =>
      dispatchUploadQueue({ type: "preview", id, preview }),
    );
  }, []);

  useEffect(() => {
    if (!next) return;

    dispatchUploadQueue({
      type: "start-upload",
      id: next.id,
    });

    const formData = new FormData();
    formData.append("albumId", albumId);
    formData.append("file", next.file);

    fetch("/image/upload", { method: "POST", body: formData })
      .then(async (response) => {
        if (response.ok) {
          dispatchUploadQueue({ type: "finish-upload", id: next.id });
          router.refresh();
        } else {
          const { error } = await response.json();
          dispatchUploadQueue({ type: "error-upload", id: next.id, error });
        }
      })
      .catch(() => {
        dispatchUploadQueue({
          type: "error-upload",
          id: next.id,
          error: "Upload failed",
        });
      });
  }, [albumId, next, router]);

  return { files, queueUpload };
};
