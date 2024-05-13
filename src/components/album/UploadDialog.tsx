"use client";

import { Album } from "@/db/prisma/generated";
import cx from "@/utils/class-names/cx";
import { useUploadQueue } from "@/utils/upload-queue/upload-queue";
import { UploadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { FC, useRef } from "react";
import { useDropzone } from "react-dropzone";
import DialogBox from "../basic/DialogBox";
import HoverIcon from "../basic/HoverIcon";

type UploadDialogProps = {
  /** The album to upload images to */
  album: Album;
};

/**
 * Dialog to upload new images to an album
 *
 * @component
 * @param props - See {@link UploadDialogProps}
 */
const UploadDialog: FC<UploadDialogProps> = ({ album }) => {
  const closeRef = useRef(() => {});
  // const { action } = useAction(updateAlbum, () => closeRef.current());

  const { files, queueUpload } = useUploadQueue(album.id);

  const { getRootProps, getInputProps, isDragAccept, isDragReject, open } =
    useDropzone({
      accept: {
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"],
        "image/webp": [".webp"],
        "image/tiff": [".tiff", ".tif"],
        "image/gif": [".gif"],
        "image/heif": [".heif"],
      },
      onDrop: (acceptedFiles) => {
        acceptedFiles.forEach(queueUpload);
      },
      noClick: true,
      noKeyboard: true,
    });

  return (
    <DialogBox
      trigger={
        <HoverIcon>
          <button>
            <UploadIcon className="size-8" />
          </button>
        </HoverIcon>
      }
      title="Upload"
      closeRef={closeRef}
    >
      <div className="space-y-4">
        <div
          {...getRootProps()}
          className={cx(
            "p-8 text-center text-gray-dim",
            "border-2 radius-2 border-dashed border-gray-5 dark:border-graydark-5",
            "bg-gray-3 dark:bg-graydark-3",
            (isDragAccept || isDragReject) &&
              "bg-gray-4 dark:bg-graydark-4 border-gray-6 dark:border-graydark-6",
          )}
        >
          <input {...getInputProps()} />
          <p>Drag and drop images here, or</p>
          <button className="underline" onClick={open}>
            select files
          </button>
        </div>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {files.map(
            ({ id, file, preview, status, error }) =>
              status != "success" && (
                <div
                  key={id}
                  className="w-full text-sm flex space-x-2 items-center"
                >
                  <div className="size-16 bg-gray-3 dark:bg-graydark-3 relative">
                    {preview && (
                      <Image
                        src={preview}
                        alt="Preview"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="text-gray-dim w-0 flex-grow flex flex-col">
                    <div className="text-nowrap overflow-hidden text-ellipsis">
                      {file.name}
                    </div>
                    {status == "waiting" && <div>Waiting...</div>}
                    {status == "queued" && <div>Queued...</div>}
                    {status == "uploading" && <div>Uploading...</div>}
                    {status == "error" && error && (
                      <div className="text-red-11 dark:text-darkred-11">
                        Error: {error}
                      </div>
                    )}
                  </div>
                </div>
              ),
          )}
        </div>
      </div>
    </DialogBox>
  );
};

export default UploadDialog;
