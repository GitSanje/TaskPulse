import { useAppSelector } from "@/store/hooks"
import type React from "react"
import { Navigate, useLocation } from "react-router-dom"


interface PrivateRouteProps {
  children: React.ReactNode
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const user = useAppSelector((state) => state.session.user)
//   const location = useLocation()

  //state={{ from: location }} replace
  
  if (!user) {
    // Redirect to login page but save the location they were trying to access
    return <Navigate to="/login"  />
  }

  return <>{children}</>

}