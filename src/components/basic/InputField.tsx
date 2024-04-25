import cx from "@/utils/class-names/cx";
import { InputHTMLAttributes, forwardRef } from "react";

export type InputFieldProps = {
  label: string;
  stateNum?: number;
} & InputHTMLAttributes<HTMLInputElement>;

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, ...inputProps }, ref) => (
    <label className="block text-sm leading-6">
      <div className="text-gray-dim">{label}</div>
      <div className="mt-1">
        <input
          {...inputProps}
          className={cx(
            "block w-full rounded-md py-1.5 text-sm leading-6",
            "bg-gray-3 dark:bg-graydark-3",
            "text-gray-12 dark:text-graydark-12 placeholder:text-gray-10 dark:placeholder:text-graydark-10",
            "border-gray-7 dark:border-graydark-7",
            "focus:border-plum-7 dark:focus:border-plumdark-7",
            inputProps.className,
          )}
          ref={ref}
        />
      </div>
    </label>
  ),
);

InputField.displayName = "InputField";
export default InputField;
