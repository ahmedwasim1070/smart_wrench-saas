//
import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <BrowserRouter>
      {/* Other providers like React Query, Redux, Context API can be nested here */}
      {children}
    </BrowserRouter>
  );
};
