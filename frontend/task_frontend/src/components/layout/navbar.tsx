"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu, User, X } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setUser } from "@/store/sessionSlice"
import { toast } from "sonner"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const user = useAppSelector((state) => state.session.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      // Call your logout API endpoint
      const res = await fetch("http://localhost:3500/api/users/logout", {
        method: "POST",
        credentials: "include",
      })

      if (res.ok) {
    
        setTimeout(() => {
              // Clear the user from Redux
        dispatch(setUser(null))
          toast.success("logging out")
          navigate("/")
        },2000)
     
      }
    } catch (err) {
      console.error("Logout failed", err)
    }
  }

  return (
    <header className="w-full border-b bg-white">
      <div className=" flex h-16 items-center px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 text-indigo-700">
          <ListTodoIcon className="h-6 w-6" />
          <span className="text-lg font-bold ">TaskPulse</span>
        </Link>
        <nav className="ml-auto hidden gap-6 md:flex">
          <Link to="/features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link to="/pricing" className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </Link>
          <Link to="/about" className="text-sm font-medium hover:underline underline-offset-4">
            About
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>
        <div className="ml-auto md:ml-4 flex gap-2">
          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{user.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>Dashboard</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings")}>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Button asChild variant="outline" className="hidden md:flex">
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild className="hidden md:flex bg-black text-white hover:bg-gray-800">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col gap-4 p-4">
            <Link
              to="/features"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            {user ? (
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{user.username}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Link to="/dashboard" className="text-sm hover:underline" onClick={() => setIsMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <Link to="/profile" className="text-sm hover:underline" onClick={() => setIsMenuOpen(false)}>
                    Profile
                  </Link>
                  <Link to="/settings" className="text-sm hover:underline" onClick={() => setIsMenuOpen(false)}>
                    Settings
                  </Link>
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 mt-2">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    Log In
                  </Link>
                </Button>
                <Button asChild className="w-full bg-black text-white hover:bg-gray-800">
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

function ListTodoIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <path d="M3 6h.01" />
      <path d="M3 12h.01" />
      <path d="M3 18h.01" />
    </svg>
  )
}
