"use client";

import { User } from "@/db/prisma/generated";
import { ButtonHTMLAttributes, forwardRef, useRef } from "react";
import DialogBox from "../basic/DialogBox";
import InputField from "../basic/InputField";
import Button from "../basic/Button";
import { useAction } from "@/utils/actions/action-state";
import { changePassword } from "@/actions/user";

type PasswordChangeDialogProps = {
  // The user to display and change the password of
  user: Omit<User, "password">;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Dialog to change the password of a user
 *
 * @component
 * @param props - See {@link PasswordChangeDialogProps}. Additional props & ref
 * are forwarded to the underlying trigger button
 */
const PasswordChangeDialog = forwardRef<
  HTMLButtonElement,
  PasswordChangeDialogProps
>(({ user, ...buttonProps }, ref) => {
  const closeRef = useRef(() => {});
  const { action, error, pending, reset } = useAction(changePassword, () =>
    closeRef.current(),
  );

  return (
    <DialogBox
      trigger={
        <button {...buttonProps} ref={ref}>
          Change password
        </button>
      }
      title="Change password"
      closeRef={closeRef}
      onclose={reset}
    >
      <form action={action} className="space-y-4">
        <input type="hidden" name="id" value={user.id} />
        <InputField
          label="Current password"
          name="passCurr"
          type="password"
          required
        />
        <InputField
          label="New password"
          name="passNew"
          type="password"
          required
        />
        <InputField
          label="New password (confirmation)"
          name="passNew2"
          type="password"
          required
        />
        {error && <p className="text-sm leading-6 text-red-dim">{error}</p>}
        <div className="flex flex-row-reverse space-x-2 space-x-reverse">
          <Button
            styleType="primary"
            label="Save"
            type="submit"
            disabled={pending}
          />
        </div>
      </form>
    </DialogBox>
  );
});

PasswordChangeDialog.displayName = "PasswordChangeDialog";

export default PasswordChangeDialog;
