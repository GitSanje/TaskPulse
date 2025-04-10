
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, DropletsIcon as DragDropIcon, ListTodo, MoveHorizontal } from "lucide-react"

import { Link } from "react-router-dom"



export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">


      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Manage Your Tasks with Ease
                </h1>
                <p className="text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our intuitive kanban board helps you organize, prioritize, and track your tasks efficiently. Boost
                  your productivity with our drag-and-drop interface.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild className="bg-white text-black hover:bg-gray-200">
                    <Link to="/dashboard">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                    <Link to="/demo">View Demo</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto lg:ml-auto">
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img
                    alt="Task Management Dashboard"
                    className="aspect-video object-cover w-full"
                    height="310"
                    src="/placeholder.svg?height=620&width=1100"
                    width="550"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Everything You Need</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our task management system provides all the tools you need to stay organized and productive.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-gray-100 p-3">
                  <ListTodo className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Kanban Board</h3>
                <p className="text-center text-gray-500">
                  Visualize your workflow with customizable columns for different task statuses.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-gray-100 p-3">
                  <DragDropIcon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Drag & Drop</h3>
                <p className="text-center text-gray-500">
                  Easily move tasks between columns with our intuitive drag and drop interface.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-gray-100 p-3">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Task Priorities</h3>
                <p className="text-center text-gray-500">
                  Set priorities for your tasks to focus on what matters most.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-gray-100 p-3">
                  <MoveHorizontal className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Progress Tracking</h3>
                <p className="text-center text-gray-500">
                  Monitor your progress and see how tasks move through your workflow.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Get Started?</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of users who are already managing their tasks more efficiently.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild className="bg-black text-white hover:bg-gray-800">
                  <Link to="/signup">
                    Sign Up for Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/login">Log In</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>


    </div>
  )
}
