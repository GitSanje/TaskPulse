import { deleteTask } from "@/actions/task";
import TaskCard from "@/components/tasks/task-card";
import { useSession } from "@/hooks/useSession";
import { useAppDispatch } from "@/store/hooks";
import { fetchUserTasks, invalidateCache } from "@/store/taskSlice";
import { KanbanColumnProps, TaskStatus } from "@/types";
import { useState, useTransition } from "react";
import { useDrop } from "react-dnd";
import { toast } from "sonner";

export default function KanbanColumn({
  status,
  title,
  tasks,
  onDrop,
  onEdit,
}: KanbanColumnProps) {
  const [isPending, startTransition] = useTransition();
  const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const { user } = useSession();
  const handleDeleteTask = async (taskId: number) => {
    setDeletingTaskId(taskId); // show spinner for this card

    startTransition(async () => {
      try {
        const result = await deleteTask(taskId);
        if (result?.success) {
          toast.success(result.message);
          setTimeout(() => {
            dispatch(invalidateCache());
            dispatch(fetchUserTasks(user?.data.userId));
          }, 1000);
        } else {
          toast.error(result?.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error deleting task");
      } finally {
        setDeletingTaskId(null); // reset spinner
      }
    });
  };

  //When you call useDrop, it registers your component as a drop target with the Dnd backend
  const [{ isOver }, drop] = useDrop({
    //What types of draggable items this target can accept.
    accept: "task",
    //Callback when an item is dropped.
    drop: (item: { id: number, status: TaskStatus }) => {
      onDrop(item.id, status, item.status);
    },
    //collect is a function used with monitors to expose drag state (like isOver, canDrop)
    // to track the drag and drop state
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const getColumnColor = () => {
    switch (status) {
      case "pending":
        return "bg-slate-50";
      case "in_progress":
        return "bg-blue-50";
      case "completed":
        return "bg-green-50";
      default:
        return "bg-slate-50";
    }
  };

  return (
    <div
      ref={drop}
      className={`rounded-lg p-4 ${getColumnColor()} ${
        isOver ? "ring-2 ring-primary ring-opacity-50" : ""
      } transition-all`}
    >
      <h3 className="font-medium text-lg mb-4">
        {title}{" "}
        <span className="text-muted-foreground ml-1 text-sm">
          ({tasks?.length})
        </span>
      </h3>

      <div className="space-y-3 min-h-[200px]">
        {tasks?.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            isDeleting={deletingTaskId === task.id && isPending}
            onEdit={() => onEdit(task)}
            onDelete={() => handleDeleteTask(task.id)}
          />
        ))}

        {tasks?.length === 0 && (
          <div className="h-24 flex items-center justify-center border border-dashed rounded-lg">
            <p className="text-muted-foreground text-sm">No tasks</p>
          </div>
        )}
      </div>
    </div>
  );
}
