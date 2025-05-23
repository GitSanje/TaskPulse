import { signInSchema, signupSchema, taskSchema } from "@/schemas";
import { z } from "zod";

export type TaskStatus = "pending" | "in_progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";



export interface ToggleState {
  toggles: {
    [key: string]: boolean;
  };
}

export interface Task {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface KanbanColumnProps {
  status: TaskStatus;
  title: string;
  tasks: Task[] | undefined;
  onDrop: (taskId: number, newStatus: TaskStatus, currentStatus:TaskStatus) => void;
  onEdit: (task: Task) => void;

}

export interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting?: boolean
}

export interface TaskFormProps {

  initialData?: Task | null;
}

export type SignInFormData = z.infer<typeof signInSchema>;

export type taskFormData = z.infer<typeof taskSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;


export interface UserPayload {
  userId: number | undefined;
  email: string;
  username: string;
  profile_url?: string;
}


export interface SessionState {
  user: UserPayload | null
  loading: boolean
  initialized: boolean
}


export interface TaskState {
  tasks: Task[] | undefined
  loading: boolean,
  error: string| null
  lastFetched:number | null,
  cacheTTL: number,

}