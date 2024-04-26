import { PhotoInfoOpenProvider } from "@/context/PhotoInfoOpen";
import { AppLayout } from "../types";

/**
 * Layout for the photo-viewing group. Surrounds children elements with a
 * provider for whether the photo-info panel is open (see
 * {@link PhotoInfoOpenProvider})
 *
 * @component
 * @param props - See {@link AppLayout}
 */
const PhotoGroupLayout: AppLayout = ({ children }) => (
  <PhotoInfoOpenProvider>{children}</PhotoInfoOpenProvider>
);

export default PhotoGroupLayout;
