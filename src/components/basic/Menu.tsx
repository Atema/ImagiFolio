"use client";

import cx from "@/utils/class-names/cx";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  ButtonHTMLAttributes,
  FC,
  ReactNode,
  forwardRef,
  useState,
} from "react";

export type MenuProps = {
  /** Element to use as the trigger to open the dialog */
  trigger: ReactNode;

  /**
   * Children elements to render as menu items. Should use {@link MenuItem} for
   * items and {@link MenuSeparator} to render a separator.
   */
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * A styled dropdown menu
 *
 * @component
 * @param props - See {@link MenuProps}. Reference and additional properties
 * will be passed to the trigger element
 */
const Menu = forwardRef<HTMLButtonElement, MenuProps>(
  ({ trigger, children, ...buttonProps }, ref) => {
    const [open, setOpen] = useState(false);

    return (
      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger asChild ref={ref} {...buttonProps}>
          {trigger}
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={5}
            className={cx(
              "min-w-40 border rounded-md mx-2 py-2 text-sm z-20",
              "bg-gray-app border-gray-dim shadow-md",
            )}
          >
            <DropdownMenu.Arrow className="fill-gray-6 dark:fill-graydark-6" />
            {children}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  },
);

Menu.displayName = "Menu";
export default Menu;

/**
 * A styled separator to show in the {@link Menu}
 *
 * @component
 */
export const MenuSeparator: FC = () => (
  <DropdownMenu.Separator className="border-b my-2 border-gray-4 dark:border-graydark-4" />
);

export type MenuItemProps = {
  /** Disables closing the menu when the item is selected */
  noCloseOnSelect?: boolean;

  /** Children element to render in the menu item */
  children: ReactNode;
};

/**
 * A styled menu item to show in the {@link Menu}
 *
 * @component
 * @param props - See {@link MenuItemProps}
 */
export const MenuItem: FC<MenuItemProps> = ({ children, noCloseOnSelect }) => (
  <DropdownMenu.Item
    asChild
    className={cx(
      "block w-full text-start px-4 py-2 focus:outline-0",
      "hover:bg-plum-3 dark:hover:bg-plumdark-3 focus:bg-plum-3 dark:focus:bg-plumdark-3",
    )}
    onSelect={noCloseOnSelect ? (e) => e.preventDefault() : undefined}
  >
    {children}
  </DropdownMenu.Item>
);
