import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { taskFormData } from "@/types"

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
      updateFormField: (state, action: PayloadAction<{ field: keyof taskFormData; value: any }>) => {
        state.formData[action.payload.field] = action.payload.value
        state.isDirty = true
      },
      setFormData: (state, action: PayloadAction<{task: taskFormData, isEdit:boolean}>) => {

        state.formData = action.payload.task
        state.isDirty = true
        state.isEdit = action.payload.isEdit
      },
      resetForm: () => initialState,
    },
  })
  



export const { updateFormField, setFormData, resetForm } = formSlice.actions

export default formSlice.reducer
