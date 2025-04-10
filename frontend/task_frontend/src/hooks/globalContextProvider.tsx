"use client";

import { createContext, ReactNode, useContext } from "react";

import { UserPayload } from "@/types";
import { useAppSelector } from "@/store/hooks";

interface GlobalContextType {
  session: UserPayload | null;
}
const globalContext = createContext<GlobalContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const GlobalProvider: React.FC<Props> = (props) => {
  const { children } = props;

 const { user } = useAppSelector(
    (state) => state.session
  );




  return (
    <globalContext.Provider value={{ session: user && user.data || null }}>
      {children}
    </globalContext.Provider>
  );
};

export default function useGloabalContext() {
  const context = useContext(globalContext);
  if (!context) {
    throw new Error("useGloabalContext must be used within a GlobalProvider");
  }
  return context;
}
