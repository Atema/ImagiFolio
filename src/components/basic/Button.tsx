import cx from "@/utils/class-names/cx";
import { ButtonHTMLAttributes } from "react";

export type ButtonProps = {
  styleType: "primary" | "secondary";
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
        "text-sm leading-6 shadow-sm",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-800",
        styleType == "primary" &&
          "text-white bg-purple-800 hover:bg-purple-900",
        styleType == "secondary" &&
          "text-neutral-600 bg-neutral-200 hover:bg-neutral-300 dark:text-neutral-400 dark:neutral-700 dark:hover:neutral-600",
        buttonProps.className
      )}
    >
      {label}
    </button>
  );
}
