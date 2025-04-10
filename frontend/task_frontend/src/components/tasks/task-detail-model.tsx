"use client"

import { format } from "date-fns"
import { Calendar, Clock, Edit, Trash2 } from "lucide-react"
import type { Task } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { formatDistanceToNow } from "date-fns"

interface TaskDetailModalProps {
  task: Task
  isOpen: boolean
  onClose: () => void
  onEdit: () => void
  onDelete: () => void
}

export default function TaskDetailModal({ task, isOpen, onClose, onEdit, onDelete }: TaskDetailModalProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-slate-100"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-slate-100 text-slate-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-slate-100"
    }
  }

  const getDueDate = () => {
    if (!task.due_date) return null
    const dueDate = new Date(task.due_date)
    const now = new Date()
    const isPastDue = dueDate < now && task.status !== "completed"

    return {
      formatted: format(dueDate, "PPP"),
      relative: formatDistanceToNow(dueDate, { addSuffix: true }),
      isPastDue,
    }
  }

  const dueDate = getDueDate()

  return (
    <Dialog open={isOpen} onOpenChange={(open:any) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{task.title}</DialogTitle>
          <DialogDescription className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary" className={getStatusColor(task.status)}>
              {task.status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </Badge>
            <Badge variant="secondary" className={getPriorityColor(task.priority)}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </Badge>
            {dueDate && (
              <Badge
                variant="outline"
                className={`flex items-center gap-1 ${dueDate.isPastDue ? "text-red-600 border-red-200" : ""}`}
              >
                <Calendar className="h-3 w-3" />
                <span>{dueDate.relative}</span>
              </Badge>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {task.description ? (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Description</h4>
              <div className="rounded-md bg-slate-50 p-3 text-sm">{task.description}</div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground italic">No description provided</div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Created</h4>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>{format(new Date(task.created_at!), "PPP")}</span>
              </div>
            </div>

            {task.updated_at && task.updated_at !== task.created_at && (
              <div>
                <h4 className="text-sm font-medium mb-1">Last Updated</h4>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>{format(new Date(task.updated_at), "PPP")}</span>
                </div>
              </div>
            )}

            {dueDate && (
              <div>
                <h4 className="text-sm font-medium mb-1">Due Date</h4>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  <span>{dueDate.formatted}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onEdit} className="gap-1">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={onDelete} className="gap-1">
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
