import cx from "@/utils/class-names/cx";
import { ButtonHTMLAttributes } from "react";

export type ButtonProps = {
  styleType: "primary";
  label: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  styleType,
  label,
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      {...buttonProps}
      className={cx(
        "block rounded-md px-4 py-1.5",
        "text-sm leading-6 text-white",
        "bg-purple-800 hover:bg-purple-900 shadow-sm",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-800",
        buttonProps.className
      )}
    >
      {label}
    </button>
  );
}
