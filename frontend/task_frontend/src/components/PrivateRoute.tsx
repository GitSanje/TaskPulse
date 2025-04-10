import useGloabalContext from "@/hooks/globalContextProvider"

import type React from "react"
import { Navigate } from "react-router-dom"


interface PrivateRouteProps {
  children: React.ReactNode
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { session } = useGloabalContext()
  
  //state={{ from: location }} replace
  
  if (!session) {
    // Redirect to login page but save the location they were trying to access
    return <Navigate to="/login"  />
  }

  return <>{children}</>

}