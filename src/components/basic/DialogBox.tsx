"use client";

import cx from "@/utils/class-names/cx";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { FC, MutableRefObject, ReactNode, useEffect, useState } from "react";
import HoverIcon from "./HoverIcon";

type DialogBoxProps = {
  trigger: ReactNode;
  hoverIconTrigger?: boolean;
  title: string;
  children: ReactNode;
  closeRef?: MutableRefObject<() => void>;
};

const DialogBox: FC<DialogBoxProps> = ({
  trigger,
  hoverIconTrigger,
  title,
  children,
  closeRef,
}) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (closeRef) closeRef.current = () => setOpen(false);
  }, [closeRef, setOpen]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {hoverIconTrigger ? (
        <HoverIcon>
          <Dialog.Trigger asChild className="block">
            {trigger}
          </Dialog.Trigger>
        </HoverIcon>
      ) : (
        <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      )}

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black bg-opacity-40 fixed inset-0 z-30" />

        <Dialog.Content
          className={cx(
            "z-40 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "bg-gray-app border-gray-dim shadow-md",
            "border rounded-xl min-w-80 max-w-full p-4 space-y-4"
          )}
        >
          <div className="flex items-center">
            <Dialog.Title className="text-xl flex-grow">{title}</Dialog.Title>
            <HoverIcon>
              <Dialog.Close className="block">
                <Cross2Icon className="size-6" />
              </Dialog.Close>
            </HoverIcon>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogBox;
