import { ClipboardList } from "lucide-react"
import type { TaskStatus } from "@/types"

interface EmptyTaskColumnProps {
  status: TaskStatus
}

export default function EmptyTaskColumn({ status }: EmptyTaskColumnProps) {
  const messages = {
    pending: "No tasks to do yet",
    in_progress: "No tasks in progress",
    completed: "No completed tasks",
  }

  return (
    <div className="h-32 flex flex-col items-center justify-center border border-dashed rounded-lg">
      <ClipboardList className="h-6 w-6 text-muted-foreground mb-2" />
      <p className="text-muted-foreground text-sm">{messages[status]}</p>
    </div>
  )
}
