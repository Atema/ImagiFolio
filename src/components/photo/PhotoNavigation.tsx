"use client";

import cx from "@/utils/class-names/cx";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

type ArrowProps = {
  /** Direction and side of the arrow: left ("prev") or right ("next") */
  type: "prev" | "next";

  /** URL that the arrow points to */
  href?: string | null;
};

/**
 * Arrow that shows on top of image to navigate back or forth
 * @component
 * @param props See {@link ArrowProps}.
 */
const Arrow: FC<ArrowProps> = ({ type, href }) =>
  href && (
    <Link href={href} replace>
      <div
        className={cx(
          "absolute top-0 z-10 h-screen flex items-center",
          "from-blacka-6 to-transparent",
          "opacity-0 hover:opacity-100 transition-opacity",
          type == "prev"
            ? "left-0 bg-gradient-to-r"
            : "right-0 bg-gradient-to-l",
        )}
      >
        {type === "prev" ? (
          <ChevronLeftIcon className="size-24 m-12" />
        ) : (
          <ChevronRightIcon className="size-24 m-12" />
        )}
      </div>
    </Link>
  );

type PhotoNavigationProps = {
  /** URL of the previous picture (if any) */
  prevHref?: string | null;

  /** URL of the next picture (if any) */
  nextHref?: string | null;
};

/**
 * Handles navigation between photos in the view using arrows and keyboard
 * @component
 * @param props See {@link PhotoNavigationProps}
 */
const PhotoNavigation: FC<PhotoNavigationProps> = ({ prevHref, nextHref }) => {
  const router = useRouter();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey) {
        if (e.key == "ArrowLeft" && prevHref) router.replace(prevHref);
        if (e.key == "ArrowRight" && nextHref) router.replace(nextHref);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [router, prevHref, nextHref]);

  return (
    <>
      <Arrow type="prev" href={prevHref} />
      <Arrow type="next" href={nextHref} />
    </>
  );
};

export default PhotoNavigation;
