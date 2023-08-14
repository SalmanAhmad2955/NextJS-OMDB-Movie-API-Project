"use client";
import { ThemeProvider } from "next-themes";
import React, { ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  );
};

export default Provider;
