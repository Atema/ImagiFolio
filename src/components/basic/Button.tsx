import cx from "@/utils/class-names/cx";
import { ButtonHTMLAttributes, forwardRef } from "react";

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

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { styleType, styleColor = "accent", label, className, ...buttonProps },
    ref
  ) => (
    <button
      {...buttonProps}
      className={cx(
        "block rounded-md px-4 py-1.5 text-sm leading-6",
        // "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-800",
        colorTable[styleType][styleColor],
        className
      )}
      ref={ref}
    >
      {label}
    </button>
  )
);

Button.displayName = "Button";

export default Button;
