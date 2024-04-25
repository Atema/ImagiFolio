import cx from "@/utils/class-names/cx";
import { ButtonHTMLAttributes, forwardRef } from "react";

export type ButtonProps = {
  /** General style of the button */
  styleType: "primary" | "ghost";

  /** Colour of the button (default accent colour or other) */
  styleColor?: "accent" | "danger";

  /** Text to show in the button */
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

/**
 * A styled button
 * @component
 * @param props See {@link Buttonprops}.
 * Reference and additional properties will be passed to the internal button element
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { styleType, styleColor = "accent", label, className, ...buttonProps },
    ref,
  ) => (
    <button
      {...buttonProps}
      className={cx(
        "block rounded-md px-4 py-1.5 text-sm leading-6",
        // "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-800",
        colorTable[styleType][styleColor],
        className,
      )}
      ref={ref}
    >
      {label}
    </button>
  ),
);

Button.displayName = "Button";
export default Button;
