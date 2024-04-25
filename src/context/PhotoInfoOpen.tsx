"use client";

import { FC, ReactNode, createContext, useContext, useState } from "react";

const PhotoInfoOpenContext = createContext<boolean>(false);
const PhotoInfoSetOpenContext = createContext<(v: boolean) => void>(() => null);

type PhotoInfoOpenProviderProps = {
  /** Children elements to render inside the provider */
  children: ReactNode;
};

/**
 * Provides information about the open/close state of the photo info to the application
 * @component
 * @param props See {@link PhotoInfoOpenProviderProps}.
 */
export const PhotoInfoOpenProvider: FC<PhotoInfoOpenProviderProps> = ({
  children,
}) => {
  const [info, setInfo] = useState(false);

  return (
    <PhotoInfoOpenContext.Provider value={info}>
      <PhotoInfoSetOpenContext.Provider value={setInfo}>
        {children}
      </PhotoInfoSetOpenContext.Provider>
    </PhotoInfoOpenContext.Provider>
  );
};

/**
 * Hook to use the information from the {@link PhotoInfoOpenProvider}
 * @returns Tuple with open value and set open dispatch
 */
export const usePhotoInfoOpen = () =>
  [
    useContext(PhotoInfoOpenContext),
    useContext(PhotoInfoSetOpenContext),
  ] as const;
