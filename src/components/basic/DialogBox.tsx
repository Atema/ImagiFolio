"use client";

import cx from "@/utils/class-names/cx";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { FC, ReactNode } from "react";
import Button from "./Button";
import InputField from "./InputField";
import { addAlbum } from "@/actions/album";
import HoverIcon from "./HoverIcon";

type DialogBoxProps = {
  trigger: ReactNode;
  title: string;
  children: ReactNode;
};

const DialogBox: FC<DialogBoxProps> = ({ trigger, title, children }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Overlay className="bg-black bg-opacity-40 fixed inset-0 z-40" />

      <Dialog.Content
        className={cx(
          "z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "bg-white dark:bg-neutral-900 border-neutral-100 dark:border-neutral-800 shadow-md",
          "border rounded-xl min-w-80 max-w-full p-4 space-y-4"
        )}
      >
        <div className="flex">
          <Dialog.Title className="text-xl flex-grow">{title}</Dialog.Title>
          <Dialog.Close>
            <HoverIcon>
              <Cross2Icon className="size-6" />
            </HoverIcon>
          </Dialog.Close>
        </div>
        {children}
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DialogBox;
