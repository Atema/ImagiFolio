"use client";

import { deleteAlbum, updateAlbum } from "@/actions/album";
import { Album } from "@/db/prisma/generated";
import { GearIcon } from "@radix-ui/react-icons";
import { FC, useEffect, useRef } from "react";
import Button from "../basic/Button";
import DialogBox from "../basic/DialogBox";
import InputField from "../basic/InputField";
import { useFormState } from "react-dom";

type AlbumSettingsDialogProps = {
  album: Album;
};

const AlbumSettingsDialog: FC<AlbumSettingsDialogProps> = ({ album }) => {
  const closeRef = useRef(() => {});
  const [updateAlbumState, updateAlbumAction] = useFormState(updateAlbum, {});

  useEffect(() => {
    if (updateAlbumState.success) closeRef.current();
  }, [updateAlbumState]);

  return (
    <DialogBox
      trigger={
        <button>
          <GearIcon className="size-8" />
        </button>
      }
      hoverIconTrigger
      title="Edit album"
      closeRef={closeRef}
    >
      <form action={updateAlbumAction} className="space-y-4">
        <input type="hidden" name="id" value={album.id} />
        <InputField
          label="Name"
          name="name"
          required
          defaultValue={album.name}
        />
        <div className="flex flex-row-reverse space-x-2 space-x-reverse">
          <Button styleType="primary" label="Save" type="submit" />
          <Button
            styleType="secondary"
            label="Delete"
            formAction={deleteAlbum}
          />
        </div>
      </form>
    </DialogBox>
  );
};

export default AlbumSettingsDialog;
