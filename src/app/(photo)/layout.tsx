import { PhotoInfoOpenProvider } from "@/context/PhotoInfoOpen";
import { FC, ReactNode } from "react";

type PhotoGroupLayoutProps = {
  children: ReactNode;
};

const PhotoGroupLayout: FC<PhotoGroupLayoutProps> = ({ children }) => {
  return <PhotoInfoOpenProvider>{children}</PhotoInfoOpenProvider>;
};

export default PhotoGroupLayout;
