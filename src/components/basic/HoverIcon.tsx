import cx from "@/utils/class-names/cx";
import { Slot } from "@radix-ui/react-slot";
import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

type HoverIconProps = {
  /** Components to render inside (the icon / icon button) */
  children: ReactNode;

  /** Whether to use a white background instead of adaptive colour */
  white?: boolean;

  /** Disables effects (and is passed on to the button below) */
  disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * A wrapping component for icons to show a background while hovering
 *
 * @component
 * @param props - See {@link HoverIconProps}. Reference and additional
 * properties will be passed to the children element
 */
const HoverIcon = forwardRef<HTMLDivElement, HoverIconProps>(
  ({ children, white, disabled, ...buttonProps }, ref) => (
    <div className="relative">
      <div className="peer">
        <Slot
          ref={ref}
          {...{ ...buttonProps, disabled }}
          className={cx("block", buttonProps.className)}
        >
          {children}
        </Slot>
      </div>
      <div
        className={cx(
          "rounded-full absolute -inset-2 -z-10",
          "transition-colors duration-75",
          !white &&
            !disabled &&
            "peer-hover:bg-plum-4 dark:peer-hover:bg-plumdark-4 peer-active:bg-plum-5 dark:peer-active:bg-plumdark-5",
          white && !disabled && "peer-hover:bg-whitea-4",
        )}
      />
    </div>
  ),
);

HoverIcon.displayName = "HoverIcon";
export default HoverIcon;
