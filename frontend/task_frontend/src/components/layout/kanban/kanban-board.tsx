"use client"

import { useState, useEffect } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"


import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import type { Task, TaskStatus } from "@/types"
import TaskForm from "@/components/tasks/task-form"
import KanbanColumn from "./kanban-col"
import useGloabalContext from "@/hooks/globalContextProvider"

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
   const {session}= useGloabalContext();
   
      console.log('====================================');
      console.log(" dashboard session",session);
      console.log('====================================');
  // In a real app, you would fetch tasks from your API
  useEffect(() => {
    // Mock data based on the schema
    const mockTasks: Task[] = [
      {
        id: 1,
        user_id: 1,
        title: "Create wireframes for dashboard",
        description: "Design initial wireframes for the new admin dashboard",
        status: "pending",
        priority: "high",
        due_date: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 2,
        user_id: 1,
        title: "Implement authentication",
        description: "Set up JWT authentication for the API",
        status: "in_progress",
        priority: "high",
        due_date: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 3,
        user_id: 1,
        title: "Write API documentation",
        description: "Document all API endpoints using Swagger",
        status: "in_progress",
        priority: "medium",
        due_date: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days from now
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 4,
        user_id: 1,
        title: "Fix navigation bug",
        description: "Address the navigation issue on mobile devices",
        status: "completed",
        priority: "medium",
        due_date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 5,
        user_id: 1,
        title: "Review pull requests",
        description: "Review and merge pending pull requests",
        status: "pending",
        priority: "low",
        due_date: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]

    setTasks(mockTasks)
  }, [])

  const handleDrop = (taskId: number, newStatus: TaskStatus) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
  }

  const handleAddTask = (task: Omit<Task, "id" | "created_at" | "updated_at">) => {
    const newTask: Task = {
      ...task,
      id: Math.max(0, ...tasks.map((t) => t.id)) + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    setTasks([...tasks, newTask])
    setIsFormOpen(false)
  }

  const handleEditTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) =>
        task.id === updatedTask.id ? { ...updatedTask, updated_at: new Date().toISOString() } : task,
      ),
    )
    setEditingTask(null)
    setIsFormOpen(false)
  }

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const openEditForm = (task: Task) => {
    setEditingTask(task)
    setIsFormOpen(true)
  }

  const columns: TaskStatus[] = ["pending", "in_progress", "completed"]
  const columnTitles = {
    pending: "To Do",
    in_progress: "In Progress",
    completed: "Completed",
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">My Tasks</h2>
        <Button
          onClick={() => {
            setEditingTask(null)
            setIsFormOpen(true)
          }}
          className="flex items-center gap-1 bg-black text-white hover:bg-gray-800"
        >
          <PlusCircle className="h-4 w-4" />
          Add Task
        </Button>
      </div>

      {isFormOpen && (
        <TaskForm
          onSubmit={editingTask ? handleEditTask : handleAddTask}
          onCancel={() => {
            setIsFormOpen(false)
            setEditingTask(null)
          }}
          initialData={editingTask}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {columns.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            title={columnTitles[status]}
            tasks={tasks.filter((task) => task.status === status)}
            onDrop={handleDrop}
            onEdit={openEditForm}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>
    </DndProvider>
  )
}
