import cx from "@/utils/class-names/cx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FC } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ImagiFolio",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <html lang="en">
    <body className={cx("bg-gray-app text-gray-normal", inter.className)}>
      {children}
    </body>
  </html>
);

export default RootLayout;
