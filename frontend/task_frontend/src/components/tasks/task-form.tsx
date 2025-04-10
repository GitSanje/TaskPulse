"use client";

import type React from "react";

// ───── React & State ─────
import { useTransition } from "react";

// ───── Form Handling ─────
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ───── Redux ─────
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetForm, updateFormField } from "@/store/formSlice";

// ───── Shadcn UI Components ─────
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";

// ───── Icons ─────
import { CalendarIcon, Loader, X } from "lucide-react";

// ───── Utils & Helpers ─────
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// ───── Types & Schemas ─────
import { taskSchema } from "@/schemas";
import type { taskFormData, TaskFormProps } from "@/types";
import useGloabalContext from "@/hooks/globalContextProvider";
import { addTask } from "@/actions/task";
import { toast } from "sonner";
import { data } from "react-router-dom";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { fetchUserTasks, invalidateCache } from "@/store/taskSlice";
import { useSession } from "@/hooks/useSession";

export default function TaskForm({ onCancel, initialData }: TaskFormProps) {
  const { user } = useSession();
  useAxiosPrivate(); // Initialize axios private instance
  const [isPending, startTransition] = useTransition();
  const dispatch = useAppDispatch();
  const persistedFormData = useAppSelector((state) => state.form.formData);
  const isDirty = useAppSelector((state) => state.form.isDirty);

  // Determine which data to use as default values
  const defaultValues =
    isDirty && !initialData
      ? {
          ...persistedFormData,
          user_id: user?.data.userId,
          due_date: new Date(persistedFormData.due_date!),
        }
      : {
          user_id: user?.data.userId,
          title: initialData?.title || "",
          description: initialData?.description || "",
          status: initialData?.status || "pending",
          priority: initialData?.priority || "medium",
          due_date: initialData?.due_date
            ? new Date(initialData.due_date)
            : undefined,
        };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<taskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues,
  });

  // Instead of watching all form values, we'll update Redux on individual field changes
  const registerWithPersist = (name: keyof taskFormData) => {
    return {
      ...register(name),
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        if (!initialData) {
          dispatch(updateFormField({ field: name, value: e.target.value }));
        }
      },
    };
  };

  const onFormSubmit = (data: taskFormData) => {
    startTransition(async () => {
      try {
        const finalData = { ...data, user_id: user?.data.userId as number };
        // Call addtask server function
        const result = await addTask(finalData);
        if (result?.success) {
          // If successful
          toast.success(result.message);
          setTimeout(() => {
            // Reset the form in Redux after successful submission
            dispatch(resetForm());
            dispatch(invalidateCache())
            dispatch(fetchUserTasks(user?.data.userId));
            handleCancel();
          }, 2000);
        } else {
          toast.error(result?.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error creating account");
      }
    });
  };

  // uncomment and put (onError) on handleSubmit to inspect the errors
  // const onError: SubmitErrorHandler<taskFormData> = (errors) => console.log(errors)

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>{initialData ? "Edit Task" : "Create New Task"}</CardTitle>
          <Button variant="ghost" size="icon" onClick={handleCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2 justify-start">
            <Label htmlFor="title" className="text-sm font-medium">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Task title"
              {...registerWithPersist("title")}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Task description"
              {...registerWithPersist("description")}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium">
                Status
              </Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      if (!initialData) {
                        dispatch(updateFormField({ field: "status", value }));
                      }
                    }}
                  >
                    <SelectTrigger id="status" className="w-full">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">To Do</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2 ">
              <Label htmlFor="priority" className="text-sm font-medium">
                Priority
              </Label>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      if (!initialData) {
                        dispatch(updateFormField({ field: "priority", value }));
                      }
                    }}
                  >
                    <SelectTrigger id="priority" className="w-full">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate" className="text-sm font-medium">
                Due Date
              </Label>
              <Controller
                name="due_date"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="dueDate"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? format(field.value, "PPP")
                          : "Pick a due date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          if (!initialData) {
                            dispatch(
                              updateFormField({
                                field: "due_date",
                                value: new Date(date!),
                              })
                            );
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-black text-white hover:bg-gray-800 "
            disabled={!user?.data.userId || isPending}
          >
            {isPending ? (
              <Loader
                className="h-10 w-10 animate-spin text-gray-200"
                size="48px"
                strokeWidth={4}
              />
            ) : initialData ? (
              "Update Task"
            ) : (
              "Create Task"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
