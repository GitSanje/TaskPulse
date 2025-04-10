

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type taskFormData = {
  title: string;
  status: "pending" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  description?: string | undefined;
  due_date?: string | Date | undefined;
}

interface FormState {
  formData: taskFormData
  isDirty: boolean
  isEdit: boolean
}

const initialState: FormState = {
  formData: {
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    due_date: undefined,
  },
  isEdit: false,
  isDirty: false,
}

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormField: <K extends keyof taskFormData>(
      state: FormState,
      action: PayloadAction<{ field: K; value: taskFormData[K] }>
    ) => {
      state.formData[action.payload.field] = action.payload.value
      state.isDirty = true
    },
    setFormData: (
      state, 
      action: PayloadAction<{task: taskFormData, isEdit: boolean}>
    ) => {
      state.formData = action.payload.task
      state.isDirty = true
      state.isEdit = action.payload.isEdit
    },
    resetForm: () => initialState,
  },
})

export const { updateFormField, setFormData, resetForm } = formSlice.actions
export default formSlice.reducer