import TaskCard from "@/components/tasks/task-card";
import { KanbanColumnProps } from "@/types";
import { useDrop } from "react-dnd";

export default function KanbanColumn({
  status,
  title,
  tasks,
  onDrop,
  onEdit,
  onDelete,
}: KanbanColumnProps) {
  //When you call useDrop, it registers your component as a drop target with the Dnd backend
  const [{ isOver }, drop] = useDrop({
    //What types of draggable items this target can accept.
    accept: "task",
    //Callback when an item is dropped.
    drop: (item: { id: number }) => {
      onDrop(item.id, status);
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
          ({tasks.length})
        </span>
      </h3>

      <div className="space-y-3 min-h-[200px]">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task.id)}
          />
        ))}

        {tasks.length === 0 && (
          <div className="h-24 flex items-center justify-center border border-dashed rounded-lg">
            <p className="text-muted-foreground text-sm">No tasks</p>
          </div>
        )}
      </div>
    </div>
  );
}
