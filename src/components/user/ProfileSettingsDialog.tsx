"use client";

import { User } from "@/db/prisma/generated";
import { ButtonHTMLAttributes, forwardRef, useRef } from "react";
import Button from "../basic/Button";
import DialogBox from "../basic/DialogBox";
import InputField from "../basic/InputField";
import { changeUserProfile } from "@/actions/user";
import { useAction } from "@/utils/actions/action-state";

type ProfileSettingsDialogProps = {
  // The user to display and change the settings of
  user: Omit<User, "password">;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Dialog to change the profile settings of a user
 *
 * @component
 * @param props - See {@link ProfileSettingsDialogProps}. Additional props & ref
 * are forwarded to the underlying trigger button
 */
const ProfileSettingsDialog = forwardRef<
  HTMLButtonElement,
  ProfileSettingsDialogProps
>(({ user, ...buttonProps }, ref) => {
  const closeRef = useRef(() => {});
  const { action, error, pending, reset } = useAction(changeUserProfile, () =>
    closeRef.current(),
  );

  return (
    <DialogBox
      trigger={
        <button {...buttonProps} ref={ref}>
          Profile settings
        </button>
      }
      title="Profile settings"
      closeRef={closeRef}
      onclose={reset}
    >
      <form action={action} className="space-y-4">
        <input type="hidden" name="id" value={user.id} />
        <InputField
          label="Name"
          name="displayName"
          required
          defaultValue={user.displayName}
        />
        <InputField
          label="Email"
          name="email"
          required
          defaultValue={user.email}
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

ProfileSettingsDialog.displayName = "ProfileSettingsDialog";

export default ProfileSettingsDialog;
