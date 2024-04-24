import cx from "@/utils/class-names/cx";
import { ReactNode, forwardRef } from "react";

type HoverIconProps = {
  children: ReactNode;
  white?: boolean;
};

const HoverIcon = forwardRef<HTMLDivElement, HoverIconProps>(
  ({ children, white }, ref) => (
    <div className="relative">
      <div className="peer" ref={ref}>
        {children}
      </div>
      <div
        className={cx(
          "rounded-full absolute -inset-2 -z-10",
          "transition-colors duration-75",
          !white &&
            "peer-hover:bg-plum-4 dark:peer-hover:bg-plumdark-4 peer-active:bg-plum-5 dark:peer-active:bg-plumdark-5",
          white && "peer-hover:bg-whitea-4"
        )}
      />
    </div>
  )
);

HoverIcon.displayName = "HoverIcon";

export default HoverIcon;
