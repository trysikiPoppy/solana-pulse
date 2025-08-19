"use client";

import React, { createContext, useContext } from "react";

interface RefreshContextType {
  interval: number;
}

const RefreshContext = createContext<RefreshContextType | undefined>(undefined);

export function RefreshProvider({ children }: { children: React.ReactNode }) {
  const value = React.useMemo(
    () => ({
      interval: 60000, 
    }),
    []
  );

  return (
    <RefreshContext.Provider value={value}>{children}</RefreshContext.Provider>
  );
}

export function useRefreshContext() {
  const context = useContext(RefreshContext);
  if (context === undefined) {
    throw new Error("useRefreshContext must be used within a RefreshProvider");
  }
  return context;
}
