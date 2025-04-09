import KanbanBoard from "./kanban/kanban-board"

export default function Dashboard() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-8">Task Management</h1>
      <KanbanBoard />
    </div>
  )
}

