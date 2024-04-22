"use client";

import cx from "@/utils/class-names/cx";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React, { Children, ReactNode } from "react";

export type MenuProps = {
  trigger: ReactNode;
  children: ReactNode;
};

const Menu: React.FC<MenuProps> = ({ trigger, children }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>

      <DropdownMenu.Content
        arrowPadding={5}
        sideOffset={5}
        className={cx(
          "min-w-40 border rounded-md mx-2 py-2 text-sm z-50",
          "bg-white dark:bg-neutral-900 border-neutral-100 dark:border-neutral-800 shadow-md"
        )}
      >
        <DropdownMenu.Arrow className="fill-neutral-100 dark:fill-neutral-800" />
        {Children.map(children, (child) =>
          {
            return child == "---" ? (
              <DropdownMenu.Separator className="border-b my-2 border-neutral-100 dark:border-neutral-800" />
            ) : (
              <DropdownMenu.Item
                asChild
                className={cx(
                  "block w-full text-start px-4 py-2 focus:outline-0",
                  "hover:bg-neutral-100 hover:dark:bg-neutral-800 focus:bg-neutral-100 focus:dark:bg-neutral-800"
                )}
              >
                {child}
              </DropdownMenu.Item>
            );
          }
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Menu;
