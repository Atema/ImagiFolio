import { PhotoInfoOpenProvider } from "@/context/PhotoInfoOpen";
import { AppLayout } from "../types";

const PhotoGroupLayout: AppLayout = ({ children }) => (
  <PhotoInfoOpenProvider>{children}</PhotoInfoOpenProvider>
);

export default PhotoGroupLayout;
