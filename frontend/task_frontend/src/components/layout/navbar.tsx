"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { Link } from "react-router-dom"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="w-full border-b bg-white">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <ListTodoIcon className="h-6 w-6" />
          <span className="text-lg font-bold">TaskFlow</span>
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
          <Button asChild variant="outline" className="hidden md:flex">
            <Link to="/login">Log In</Link>
          </Button>
          <Button asChild className="hidden md:flex bg-black text-white hover:bg-gray-800">
            <Link to="/signup">Sign Up</Link>
          </Button>
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
          </nav>
        </div>
      )}
    </header>
  )
}

function ListTodoIcon(props) {
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
