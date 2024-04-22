"use client";

import { FC, ReactNode, createContext, useContext, useState } from "react";

const PhotoInfoOpenContext = createContext<boolean>(false);
const PhotoInfoSetOpenContext = createContext<(v: boolean) => void>(() => null);

type PhotoInfoOpenProviderProps = {
  children: ReactNode;
};

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

export const usePhotoInfoOpen = () =>
  [
    useContext(PhotoInfoOpenContext),
    useContext(PhotoInfoSetOpenContext),
  ] as const;
