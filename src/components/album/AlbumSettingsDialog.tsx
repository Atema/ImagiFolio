"use client";

import { deleteAlbum, updateAlbum } from "@/actions/album";
import { useAction } from "@/actions/types";
import { Album } from "@/db/prisma/generated";
import { GearIcon } from "@radix-ui/react-icons";
import { FC, useRef } from "react";
import Button from "../basic/Button";
import ConfirmationBox from "../basic/ConfirmationBox";
import DialogBox from "../basic/DialogBox";
import InputField from "../basic/InputField";

type AlbumSettingsDialogProps = {
  album: Album;
};

const AlbumSettingsDialog: FC<AlbumSettingsDialogProps> = ({ album }) => {
  const closeRef = useRef(() => {});
  const { action } = useAction(updateAlbum, () => closeRef.current());

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
      <form action={action} className="space-y-4">
        <input type="hidden" name="id" value={album.id} />
        <InputField
          label="Name"
          name="name"
          required
          defaultValue={album.name}
        />
        <div className="flex flex-row-reverse space-x-2 space-x-reverse">
          <Button styleType="primary" label="Save" type="submit" />
          <ConfirmationBox
            title="Are you sure?"
            description="The album and all of its photos will be deleted permanently. This cannot be undone."
            confirmText="Yes, delete"
            trigger={<Button styleType="ghost" styleColor="danger" label="Delete" />}
            action={deleteAlbum}
            hiddenFormData={{ id: album.id }}
          />
        </div>
      </form>
    </DialogBox>
  );
};

export default AlbumSettingsDialog;
