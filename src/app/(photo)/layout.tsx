import { PhotoInfoOpenProvider } from "@/context/PhotoInfoOpen";
import { FC, ReactNode } from "react";

type PhotoGroupLayoutProps = {
  children: ReactNode;
};

const PhotoGroupLayout: FC<PhotoGroupLayoutProps> = ({ children }) => (
  <PhotoInfoOpenProvider>{children}</PhotoInfoOpenProvider>
);

export default PhotoGroupLayout;
