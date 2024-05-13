"use client";

import { addAlbum } from "@/actions/album";
import { PlusIcon } from "@radix-ui/react-icons";
import { FC, useRef } from "react";
import Button from "../basic/Button";
import DialogBox from "../basic/DialogBox";
import InputField from "../basic/InputField";
import HoverIcon from "../basic/HoverIcon";
import { useAction } from "@/utils/actions/use-action";

/**
 * Dialog box to create a new photo album
 *
 * @component
 */
const AddAlbumDialog: FC = () => {
  const closeRef = useRef(() => {});
  const { action, error, pending } = useAction(addAlbum, () =>
    closeRef.current(),
  );

  return (
    <DialogBox
      trigger={
        <HoverIcon>
          <button>
            <PlusIcon className="size-8" />
          </button>
        </HoverIcon>
      }
      title="Add album"
      closeRef={closeRef}
    >
      <form action={action} className="space-y-4">
        <InputField label="Name" name="name" required />
        {error && <p className="text-sm leading-6 text-red-dim">{error}</p>}
        <Button
          styleType="primary"
          label="Add"
          type="submit"
          className="ml-auto"
          disabled={pending}
        />
      </form>
    </DialogBox>
  );
};

export default AddAlbumDialog;
