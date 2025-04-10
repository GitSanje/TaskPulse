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

  const {user} = useSession();
  const session = user || null;


    const handleEditTask = (updatedTask: Task) => {
      // setTasks(
      //   tasks.map((task) =>
      //     task.id === updatedTask.id ? { ...updatedTask, updated_at: new Date().toISOString() } : task,
      //   ),
      //)
    
      dispatch(toggle("taskform"));
    };
  

  return (
    <globalContext.Provider value={{ session: session }}>
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
