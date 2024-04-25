"use client";

import cx from "@/utils/class-names/cx";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  ButtonHTMLAttributes,
  Children,
  ReactNode,
  forwardRef,
  useState,
} from "react";
import HoverIcon from "./HoverIcon";

export type MenuProps = {
  /** Element to use as the trigger to open the dialog */
  trigger: ReactNode;

  /** Children elements to render as menu items; "---" will render a separator */
  children: ReactNode;

  /** Whether to wrap the trigger element in a (white?) {@link HoverIcon} */
  hoverIconTrigger?: boolean | "white";
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * A styled dropdown menu
 * @component
 * @param props See {@link MenuProps}.
 * Reference and additional properties will be passed to the trigger element
 */
const Menu = forwardRef<HTMLButtonElement, MenuProps>(
  ({ trigger, children, hoverIconTrigger, ...buttonProps }, ref) => {
    const [open, setOpen] = useState(false);

    return (
      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        {hoverIconTrigger ? (
          <HoverIcon white={hoverIconTrigger == "white"}>
            <DropdownMenu.Trigger
              asChild
              ref={ref}
              className="block"
              {...buttonProps}
            >
              {trigger}
            </DropdownMenu.Trigger>
          </HoverIcon>
        ) : (
          <DropdownMenu.Trigger asChild ref={ref} {...buttonProps}>
            {trigger}
          </DropdownMenu.Trigger>
        )}

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={5}
            className={cx(
              "min-w-40 border rounded-md mx-2 py-2 text-sm z-20",
              "bg-gray-app border-gray-dim shadow-md",
            )}
          >
            <DropdownMenu.Arrow className="fill-gray-6 dark:fill-graydark-6" />
            {Children.map(children, (child) => {
              return child == "---" ? (
                <DropdownMenu.Separator className="border-b my-2 border-gray-dim" />
              ) : (
                <DropdownMenu.Item
                  asChild
                  className={cx(
                    "block w-full text-start px-4 py-2 focus:outline-0",
                    "hover:bg-plum-3 dark:hover:bg-plumdark-3 focus:bg-plum-3 dark:focus:bg-plumdark-3",
                  )}
                  onSelect={(e) => e.preventDefault()}
                >
                  {child}
                </DropdownMenu.Item>
              );
            })}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  },
);

Menu.displayName = "Menu";
export default Menu;
