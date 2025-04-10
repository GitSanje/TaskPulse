"use client";

import { createContext, ReactNode, useContext } from "react";
import { useSession } from "./useSession";
import { UserPayload } from "@/types";

interface GlobalContextType {
  session: UserPayload | null;
}
const globalContext = createContext<GlobalContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const GlobalProvider: React.FC<Props> = (props) => {
  const { children } = props;

  const {session} = useSession();




  return (
    <globalContext.Provider value={{ session: session.data}}>
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
