// Imports
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";

// Interfaces
interface AppProvidedProps {
  isAppLoading: boolean;
  setIsAppLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
interface AppProviderProps {
  children: ReactNode;
}

//
const GlobalContext = createContext<AppProvidedProps | undefined>(undefined);

//
export const AppProvider = ({ children }: AppProviderProps) => {
  // States
  const [isAppLoading, setIsAppLoading] = useState<boolean>(false);

  //
  const values = useMemo(
    () => ({
      isAppLoading,
      setIsAppLoading,
    }),
    [isAppLoading],
  );

  return (
    <GlobalContext.Provider value={values}>
      <BrowserRouter>{children}</BrowserRouter>
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
