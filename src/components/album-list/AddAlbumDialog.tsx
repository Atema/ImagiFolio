"use client";

import { addAlbum } from "@/actions/album";
import { PlusIcon } from "@radix-ui/react-icons";
import { FC, useRef } from "react";
import Button from "../basic/Button";
import DialogBox from "../basic/DialogBox";
import InputField from "../basic/InputField";

type AddAlbumDialogProps = {};

const AddAlbumDialog: FC<AddAlbumDialogProps> = () => {
  return (
    <DialogBox
      trigger={
        <button>
          <PlusIcon className="size-8" />
        </button>
      }
      hoverIconTrigger
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
};

export default AddAlbumDialog;
