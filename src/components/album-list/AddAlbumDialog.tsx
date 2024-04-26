"use client";

import { addAlbum } from "@/actions/album";
import { PlusIcon } from "@radix-ui/react-icons";
import { FC } from "react";
import Button from "../basic/Button";
import DialogBox from "../basic/DialogBox";
import InputField from "../basic/InputField";
import HoverIcon from "../basic/HoverIcon";

/**
 * Dialog box to create a new photo album
 * 
 * @component
 */
const AddAlbumDialog: FC = () => (
  <DialogBox
    trigger={
      <HoverIcon>
        <button>
          <PlusIcon className="size-8" />
        </button>
      </HoverIcon>
    }
    title="Add album"
  >
    <form action={addAlbum} className="space-y-4">
      <InputField label="Name" name="name" required />
      <Button
        styleType="primary"
        label="Add"
        type="submit"
        className="ml-auto"
      />
    </form>
  </DialogBox>
);

export default AddAlbumDialog;
