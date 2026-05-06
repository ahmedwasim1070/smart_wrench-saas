// Imports
import { ReactNode } from "react";

// Interfaces
interface ThemeProviderProps {
  children: ReactNode;
}

//
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return <div className="min-w-full min-h-full">{children}</div>;
};
