// Imports
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { GlobalLoader } from "../components/GlobalLoader";

// Interfaces
interface AppProvidedProps {
  isAppLoading: boolean;
  setIsAppLoading: React.Dispatch<React.SetStateAction<boolean>>;
  urlPath: any;
}
interface AppProviderProps {
  children: ReactNode;
}

//
const GlobalContext = createContext<AppProvidedProps | undefined>(undefined);

//
export const AppProvider = ({ children }: AppProviderProps) => {
  //
  const urlPath = useLocation();
  // States
  const [isAppLoading, setIsAppLoading] = useState<boolean>(false);

  //
  const values = useMemo(
    () => ({
      isAppLoading,
      setIsAppLoading,
      urlPath,
    }),
    [isAppLoading, urlPath],
  );

  return (
    <GlobalContext.Provider value={values}>
      <BrowserRouter>
        {/*  */}
        {isAppLoading && <GlobalLoader />}

        {/*  */}
        {children}
      </BrowserRouter>
    </GlobalContext.Provider>
  );
};

export const useAppProvider = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(
      "useAppProvider can only be used with the children's of AppProvider",
    );
  }
  return context;
};
