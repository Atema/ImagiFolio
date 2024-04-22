import cx from "@/utils/class-names/cx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ImagiFolio",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={cx(
          "bg-white dark:bg-neutral-900 text-neutral-950 dark:text-neutral-50",
          inter.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
