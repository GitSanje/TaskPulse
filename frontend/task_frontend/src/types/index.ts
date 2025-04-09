import { signInSchema, signupSchema, taskSchema } from "@/schemas";
import { z } from "zod";

export type TaskStatus = "pending" | "in_progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";



export interface Task {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface KanbanColumnProps {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  onDrop: (taskId: number, newStatus: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

export interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

export interface TaskFormProps {
  onSubmit: (task: any) => void;
  onCancel: () => void;
  initialData?: Task | null;
}

export type SignInFormData = z.infer<typeof signInSchema>;

export type taskFormData = z.infer<typeof taskSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;


export interface UserPayload {
  userId: string;
  email: string;
  username: string;
  profile_url?: string;
}


export interface SessionState {
  user: UserPayload | null
  loading: boolean
  initialized: boolean
}
