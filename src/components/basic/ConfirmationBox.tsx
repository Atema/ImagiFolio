"use client";

import { SuccessErrorFormAction } from "@/actions/types";
import cx from "@/utils/class-names/cx";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Button from "./Button";
import HoverIcon from "./HoverIcon";

type ConfirmationBoxProps = {
  trigger: ReactNode;
  hoverIconTrigger?: boolean;
  title: string;
  description: string;
  confirmText: string;
  action: SuccessErrorFormAction;
  hiddenFormData?: { [key: string]: string };
};

const ConfirmationBox: FC<ConfirmationBoxProps> = ({
  trigger,
  hoverIconTrigger,
  title,
  description,
  confirmText,
  action,
  hiddenFormData = {},
}) => {
  const [open, setOpen] = useState(false);
  const [formState, formAction] = useFormState(action, {});

  const { pending } = useFormStatus();

  useEffect(() => {
    if (formState.success) setOpen(false);
  }, [formState]);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      {hoverIconTrigger ? (
        <HoverIcon>
          <AlertDialog.Trigger asChild className="block">
            {trigger}
          </AlertDialog.Trigger>
        </HoverIcon>
      ) : (
        <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>
      )}

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black bg-opacity-40 fixed inset-0 z-40" />
        <AlertDialog.Content
          className={cx(
            "z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "bg-white dark:bg-neutral-900 border-neutral-100 dark:border-neutral-800 shadow-md",
            "border rounded-xl min-w-80 max-w-full p-4 space-y-4"
          )}
        >
          <AlertDialog.Title className="text-xl">{title}</AlertDialog.Title>
          <AlertDialog.Description className="text-sm">
            {description}
          </AlertDialog.Description>

          {formState.error && (
            <div className="text-sm text-red-700 dark:text-red-300">
              {formState.error}
            </div>
          )}

          <div className="flex space-x-2 justify-between">
            <Button
              styleType="secondary"
              label="Cancel"
              onClick={() => setOpen(false)}
              disabled={pending}
            />

            <form action={formAction}>
              {Object.entries(hiddenFormData).map(([name, value]) => (
                <input type="hidden" key={name} name={name} value={value} />
              ))}
              <Button
                styleType="primary"
                label={confirmText}
                type="submit"
                disabled={pending}
              />
            </form>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default ConfirmationBox;
