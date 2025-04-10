"use client";

import { useDrag } from "react-dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Loader2, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";
import { TaskCardProps } from "@/types";

export default function TaskCard({ task, onEdit, onDelete,isDeleting  }: TaskCardProps) {
  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      default:
        return "bg-slate-100";
    }
  };

  const getDueDate = () => {
    if (!task.due_date) return null;
    const dueDate = new Date(task.due_date);
    const now = new Date();

    const isPastDue = dueDate < now && task.status !== "completed";
    return {
      formatted: formatDistanceToNow(dueDate, { addSuffix: true }),
      isPastDue,
    };
  };

  const dueDate = getDueDate();
  return (
    <Card
      ref={drag}
      className={`cursor-grab relative  ${
        isDragging ? "opacity-50" : "opacity-100"
        
      } transition-opacity`}
    >
      { isDeleting && (
        <div className="absolute inset-0 z-20 bg-white/80 flex items-center justify-center rounded-lg">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
        </div>
      )}
      <CardContent className={`p-4 space-y-2 ${isDeleting ? "opacity-50" : ""}`}>
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium text-sm uppercase">{task.title}</h4>
          <DropdownMenu>
            <DropdownMenuTrigger className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-muted">
              <MoreVertical className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onDelete}
                className="cursor-pointer text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {task.description && (
          <p className=" text-start text-muted-foreground text-sm mb-3 line-clamp-2 ">
            {task.description}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge
            variant="secondary"
            className={getPriorityColor(task.priority)}
          >
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Badge>

          {dueDate && (
            <Badge
              variant="outline"
              className={`flex items-center gap-1 ${
                dueDate.isPastDue ? "text-red-600 border-red-200" : ""
              }`}
            >
              <Calendar className="h-3 w-3" />
              <span>{dueDate.formatted}</span>
            </Badge>
          )}
        </div>

        <div className="flex items-center text-xs text-muted-foreground mt-3">
          <Clock className="h-3 w-3 mr-1" />
          <span>
            Created{" "}
            {formatDistanceToNow(new Date(task.created_at), {
              addSuffix: true,
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
