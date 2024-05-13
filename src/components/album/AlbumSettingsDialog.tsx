"use client";

import { deleteAlbum, updateAlbum } from "@/actions/album";
import { Album } from "@/db/prisma/generated";
import { useAction } from "@/utils/actions/use-action";
import { GearIcon } from "@radix-ui/react-icons";
import { FC, useRef } from "react";
import Button from "../basic/Button";
import ConfirmationBox from "../basic/ConfirmationBox";
import DialogBox from "../basic/DialogBox";
import HoverIcon from "../basic/HoverIcon";
import InputField from "../basic/InputField";

type AlbumSettingsDialogProps = {
  /** The album to change the settings of */
  album: Album;
};

/**
 * Dialog to change the settings (name) of a photo album
 *
 * @component
 * @param props - See {@link AlbumSettingsDialogProps}
 */
const AlbumSettingsDialog: FC<AlbumSettingsDialogProps> = ({ album }) => {
  const closeRef = useRef(() => {});
  const { action, error, pending } = useAction(updateAlbum, () =>
    closeRef.current(),
  );

  return (
    <DialogBox
      trigger={
        <HoverIcon>
          <button>
            <GearIcon className="size-8" />
          </button>
        </HoverIcon>
      }
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
        {error && <p className="text-sm leading-6 text-red-dim">{error}</p>}
        <div className="flex flex-row-reverse space-x-2 space-x-reverse">
          <Button
            styleType="primary"
            label="Save"
            type="submit"
            disabled={pending}
          />
          <ConfirmationBox
            title="Are you sure?"
            description="The album and all of its photos will be deleted permanently. This cannot be undone."
            confirmText="Yes, delete"
            trigger={
              <Button styleType="ghost" styleColor="danger" label="Delete" />
            }
            action={deleteAlbum}
            hiddenFormData={{ id: album.id }}
          />
        </div>
      </form>
    </DialogBox>
  );
};

export default AlbumSettingsDialog;
