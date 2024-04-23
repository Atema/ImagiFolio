import cx from "@/utils/class-names/cx";
import { InputHTMLAttributes } from "react";

export type InputFieldProps = {
  label: string;
  stateNum?: number;
} & InputHTMLAttributes<HTMLInputElement>;

export default function InputField({ label, ...inputProps }: InputFieldProps) {
  return (
    <label className="block text-sm leading-6">
      <div className="text-neutral-700 dark:text-neutral-300">{label}</div>
      <div className="mt-1">
        <input
          {...inputProps}
          className={cx(
            "block w-full rounded-md py-1.5",
            "text-sm leading-6",
            "bg-neutral-100 dark:bg-neutral-800 shadow-sm",
            "placeholder:text-neutral-600 placeholder:dark:text-neutral-500",
            "border-0 ring-1 ring-inset ring-neutral-300 dark:ring-neutral-600",
            "focus:ring-2 focus:ring-inset focus:ring-purple-800",
            inputProps.className
          )}
        />
      </div>
    </label>
  );
}
