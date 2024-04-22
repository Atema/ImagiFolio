import cx from "@/utils/class-names/cx";
import { FC, ReactNode } from "react";

type HoverIconProps = {
  children: ReactNode;
  white?: boolean;
};

export const HoverIcon: FC<HoverIconProps> = ({ children, white }) => (
  <div className="relative">
    <div className="peer">{children}</div>
    <div
      className={cx(
        "rounded-full absolute -inset-2 -z-10",
        "transition-colors duration-75",
        !white && "peer-hover:bg-black/10 dark:peer-hover:bg-white/10",
        white && "peer-hover:bg-white/15"
      )}
    />
  </div>
);

export default HoverIcon;
