import cx from "@/utils/class-names/cx";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppLayout } from "./types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ImagiFolio",
};

const RootLayout: AppLayout = ({ children }) => (
  <html lang="en">
    <body className={cx("bg-gray-app text-gray-normal", inter.className)}>
      {children}
    </body>
  </html>
);

export default RootLayout;
