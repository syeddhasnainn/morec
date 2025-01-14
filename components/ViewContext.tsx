"use client";

import React, { createContext, useState, useContext } from "react";
interface ViewContextType {
  isListView: boolean;
  setIsListView: (value: boolean) => void;
}

const ViewContext = createContext<ViewContextType | null>(null);

export const ViewProvider = ({ children }: { children: React.ReactNode }) => {
  const [isListView, setIsListView] = useState(false);

  return (
    <ViewContext.Provider value={{ isListView, setIsListView }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useViewContext = () => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error("useViewContext must be used within a ViewProvider");
  }
  return context;
};
