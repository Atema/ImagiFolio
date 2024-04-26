"use client";

import {
  SuccessErrorFormAction,
  useAction,
} from "@/utils/actions/action-state";
import cx from "@/utils/class-names/cx";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { ButtonHTMLAttributes, ReactNode, forwardRef, useState } from "react";
import Button from "./Button";

type ConfirmationBoxProps = {
  /** Element to use as the trigger to open the confirmation box */
  trigger: ReactNode;

  /** Title of the confirmation box */
  title: string;

  /** Description to show in the confirmation box */
  description: string;

  /** Text to display on the confirmation button */
  confirmText: string;

  /** Server action to execute when clicking the confirmation button */
  action: SuccessErrorFormAction;

  /** Additional data to add to the form as hidden input elements */
  hiddenFormData?: { [key: string]: string };
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * A styled confirmation dialog to show before dangerous actions
 *
 * @component
 * @param props - See {@link ConfirmationBoxProps}. Reference and additional
 * properties will be passed to the trigger element
 */
const ConfirmationBox = forwardRef<HTMLButtonElement, ConfirmationBoxProps>(
  (
    {
      trigger,
      title,
      description,
      confirmText,
      action: propAction,
      hiddenFormData = {},
      ...buttonProps
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const { action, pending, error } = useAction(propAction, () =>
      setOpen(false),
    );

    return (
      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Trigger asChild ref={ref} {...buttonProps}>
          {trigger}
        </AlertDialog.Trigger>

        <AlertDialog.Portal>
          <AlertDialog.Overlay className="bg-black bg-opacity-40 fixed inset-0 z-40" />
          <AlertDialog.Content
            className={cx(
              "z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "bg-gray-app border-gray-dim shadow-md",
              "border rounded-xl min-w-80 max-w-full p-4 space-y-4",
            )}
          >
            <AlertDialog.Title className="text-xl">{title}</AlertDialog.Title>
            <AlertDialog.Description className="text-sm">
              {description}
            </AlertDialog.Description>

            {error && <div className="text-sm text-red-dim">{error}</div>}

            <div className="flex space-x-2 justify-between">
              <Button
                styleType="ghost"
                label="Cancel"
                onClick={() => setOpen(false)}
                disabled={pending}
              />

              <form action={action}>
                {Object.entries(hiddenFormData).map(([name, value]) => (
                  <input type="hidden" key={name} name={name} value={value} />
                ))}
                <Button
                  styleType="primary"
                  styleColor="danger"
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
  },
);

ConfirmationBox.displayName = "ConfirmationBox";
export default ConfirmationBox;
