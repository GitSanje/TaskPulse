import { Link } from "react-router-dom"


export default function Footer() {
  return (
    <footer className="w-full border-t bg-white">
      <div className="container grid gap-8 px-4 py-10 md:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <ListTodoIcon className="h-6 w-6" />
            <span className="text-lg font-bold">TaskFlow</span>
          </Link>
          <p className="text-sm text-gray-500">Simplify your workflow with our intuitive task management system.</p>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Product</h3>
          <nav className="flex flex-col gap-2">
            <Link to="/features" className="text-sm hover:underline">
              Features
            </Link>
            <Link to="/pricing" className="text-sm hover:underline">
              Pricing
            </Link>
            <Link to="/integrations" className="text-sm hover:underline">
              Integrations
            </Link>
            <Link to="/changelog" className="text-sm hover:underline">
              Changelog
            </Link>
          </nav>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Company</h3>
          <nav className="flex flex-col gap-2">
            <Link to="/about" className="text-sm hover:underline">
              About
            </Link>
            <Link to="/blog" className="text-sm hover:underline">
              Blog
            </Link>
            <Link to="/careers" className="text-sm hover:underline">
              Careers
            </Link>
            <Link to="/contact" className="text-sm hover:underline">
              Contact
            </Link>
          </nav>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Legal</h3>
          <nav className="flex flex-col gap-2">
            <Link to="/terms" className="text-sm hover:underline">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-sm hover:underline">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-sm hover:underline">
              Cookie Policy
            </Link>
          </nav>
        </div>
      </div>
      <div className="border-t">
        <div className="container flex flex-col gap-4 py-6 px-4 md:px-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-gray-500">© 2025 TaskFlow. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="#" className="text-gray-500 hover:text-gray-900">
              <TwitterIcon className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link to="#" className="text-gray-500 hover:text-gray-900">
              <FacebookIcon className="h-4 w-4" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link to="#" className="text-gray-500 hover:text-gray-900">
              <InstagramIcon className="h-4 w-4" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link to="#" className="text-gray-500 hover:text-gray-900">
              <GithubIcon className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
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

function TwitterIcon(props) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

function FacebookIcon(props) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function InstagramIcon(props) {
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
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function GithubIcon(props) {
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
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}
