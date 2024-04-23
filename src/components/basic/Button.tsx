import cx from "@/utils/class-names/cx";
import { ButtonHTMLAttributes } from "react";

export type ButtonProps = {
  styleType: "primary" | "ghost";
  styleColor?: "accent" | "danger";
  label: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const colorTable = {
  primary: {
    accent: "bg-plum-solid",
    danger: "bg-red-solid",
  },
  ghost: {
    accent: "text-plum-solid bg-plum-ghost",
    danger: "text-red-solid bg-red-ghost",
  },
} as const;

export default function Button({
  styleType,
  styleColor = "accent",
  label,
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      {...buttonProps}
      className={cx(
        "block rounded-md px-4 py-1.5 text-sm leading-6",
        // "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-800",
        colorTable[styleType][styleColor],
        buttonProps.className
      )}
    >
      {label}
    </button>
  );
}

// TODO: Styletype secondary
