import { useRouter } from "next/navigation";
import { useCallback, useEffect, useReducer, useRef } from "react";
import getLocalImagePreview from "./image-preview";

/** A file that is added to the queue */
type UploadFile = {
  /** Unique identifier of the file */
  id: number;

  /** The actual file data */
  file: File;

  /** Status of the file in the queue */
  status: "waiting" | "queued" | "uploading" | "success" | "error";

  /** Error message, if any */
  error?: string;

  /** Generated preview image to show with the file */
  preview?: string;
};

/** State type of the upload queue */
type UploadQueueState = {
  /** All files in the upload queue */
  files: UploadFile[];

  /**  */
  next: UploadFile | null;

  /** The number of files currently being uploaded */
  current: number;
};

/** Initial state of the upload queue */
const uploadQueueInit: UploadQueueState = {
  files: [],
  next: null,
  current: 0,
};

/** Actions that can be dispatched through the upload queue reducer */
type UploadQueueAction =
  | {
      /** The type of action to dispatch */
      type: "reset";
    }
  | {
      /** The type of action to dispatch */
      type: "enqueue";

      /** Unqiue identifier to identify the file */
      id: number;

      /** The file to add to the queue */
      file: File;
    }
  | {
      /** The type of action to dispatch */
      type: "preview";

      /** Unqiue identifier to identify the file */
      id: number;

      /** (Object) URL of the preview */
      preview: string;
    }
  | {
      /** The type of action to dispatch */
      type: "start-upload";

      /** Unqiue identifier to identify the file */
      id: number;
    }
  | {
      /** The type of action to dispatch */
      type: "finish-upload";

      /** Unqiue identifier to identify the file */
      id: number;

      /** Error message (if unsuccessful) */
      error?: string;
    };

/**
 * Takes a state and ensures there are 3 files being uploaded, or selects the
 * first waiting file from the queue to be uploaded next
 *
 * @param state - The previous queue state
 * @returns The updated queue state
 */
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

/**
 * Reducer that handles the upload queue by taking in dispatched actions and
 * updating the state accordingly
 *
 * @param state - The previous queue state
 * @param action - The dispatched action
 * @returns The updated queue state
 */
const uploadQueueReducer = (
  state: UploadQueueState,
  action: UploadQueueAction,
): UploadQueueState => {
  switch (action.type) {
    case "reset":
      return uploadQueueInit;

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
                status: action.error === undefined ? "success" : "error",
                error: action.error,
              }
            : ul,
        ),
      });

    default:
      return state;
  }
};

/**
 * Hook to use the upload queue from the dialog component
 *
 * @param albumId - Id of the album to upload the images to
 * @returns List of all files in the queue and functions to queue new files for
 * upload and reset the queue state
 */
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
          dispatchUploadQueue({ type: "finish-upload", id: next.id, error });
        }
      })
      .catch(() => {
        dispatchUploadQueue({
          type: "finish-upload",
          id: next.id,
          error: "Upload failed",
        });
      });
  }, [albumId, next, router]);

  return {
    files,
    queueUpload,
    resetQueue: () => dispatchUploadQueue({ type: "reset" }),
  };
};
