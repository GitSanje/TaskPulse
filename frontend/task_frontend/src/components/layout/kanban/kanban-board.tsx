"use client";

import { useState, useEffect, useTransition } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import type { Task, TaskStatus } from "@/types";
import TaskForm from "@/components/tasks/task-form";
import KanbanColumn from "./kanban-col";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggle } from "@/store/toogleSlice";
import { fetchUserTasks, updateTaskItem } from "@/store/taskSlice";
import KanbanBoardSkeleton from "./kanban-skeleton";
import LoadingSpinner from "@/components/ui/loading-spinner";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { toast } from "sonner";
import { useSession } from "@/hooks/useSession";
import { editTask } from "@/actions/task";

export default function KanbanBoard() {
  const dispatch = useAppDispatch();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { user } = useSession();
  useAxiosPrivate();
  const toogleObj = useAppSelector((state) => state.toogle.toggles);
  const isFormOpen = toogleObj["taskform"] ?? false;

  const tasks = useAppSelector((state) => state.tasks.tasks);
  const loading = useAppSelector((state) => state.tasks.loading);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (user?.data) {
       dispatch(fetchUserTasks(user?.data.userId));
    
    }
  }, [user, dispatch]);

  const handleDrop = (taskId: number, newStatus: TaskStatus, currentStatus: TaskStatus) => {

    if(newStatus === currentStatus){
      return;
    }


    
    startTransition(async () => {
      // Update the database first
      const taskObj = {
        status: newStatus,
      };
   
      dispatch(updateTaskItem({ id: taskId, key: "status", value: newStatus }));
      toast.success(`Moved to the ${newStatus}`);
      // Call editTask to update the task in the database
      const updatedTask = await editTask(taskObj, taskId);
     
  
      if (updatedTask.success) {
        // Once the database update is successful, dispatch the update action
      
        // Show success toast

      } else {
        // Handle any potential errors or failed updates
        toast.error("Failed to update task status");
      }
    });
  };



  
  const openEditForm = (task: Task) => {
    setEditingTask(task);
    dispatch(toggle("taskform"));
  };

  const columns: TaskStatus[] = ["pending", "in_progress", "completed"];
  const columnTitles = {
    pending: "To Do",
    in_progress: "In Progress",
    completed: "Completed",
  };

  // Show skeleton loader when loading
  if (loading) {
    return (
      <div className="relative">
        <div className="opacity-60">
          <KanbanBoardSkeleton />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/80 rounded-lg p-6 shadow-lg flex flex-col items-center">
            <LoadingSpinner size={8} className="text-primary" />
            <p className="mt-2 text-sm font-medium text-gray-700">
              Loading your tasks...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">My Tasks</h2>
        <Button
          onClick={() => {
            setEditingTask(null);
            dispatch(toggle("taskform"));
          }}
          className="flex items-center gap-1 bg-black text-white hover:bg-gray-800"
        >
          <PlusCircle className="h-4 w-4" />
          Add Task
        </Button>
      </div>

      {isFormOpen && (
        <TaskForm
          onCancel={() => {
            dispatch(toggle("taskform"));
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
            tasks={tasks?.filter((task) => task.status === status) || []}
            onDrop={handleDrop}
            onEdit={openEditForm}
          
          />
        ))}
      </div>
    </DndProvider>
  );
}
