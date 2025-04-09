import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { taskFormData } from "@/types"

interface FormState {
  formData: taskFormData
  isDirty: boolean
}

const initialState: FormState = {
  formData: {
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    due_date: undefined,
  },
  isDirty: false,
}
export const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
      updateFormField: (state, action: PayloadAction<{ field: keyof taskFormData; value: any }>) => {
        state.formData[action.payload.field] = action.payload.value
        state.isDirty = true
      },
      setFormData: (state, action: PayloadAction<taskFormData>) => {
        state.formData = action.payload
        state.isDirty = true
      },
      resetForm: () => initialState,
    },
  })
  



export const { updateFormField, setFormData, resetForm } = formSlice.actions

export default formSlice.reducer
