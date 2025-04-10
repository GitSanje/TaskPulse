import { getUserTasks } from "@/actions/task";
import { TaskState } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState:TaskState =  {
  tasks: [],
  loading: false,
  error: null,
}

export const fetchUserTasks = createAsyncThunk(
    "tasks/fetchUserTasks",
    async (userId: number, thunkAPI) => {
      const response = await getUserTasks(userId);
      if (response.success) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.message);
      }
    }
  );

  const taskSlice = createSlice({
    name: "tasks",
    initialState
    ,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUserTasks.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUserTasks.fulfilled, (state, action) => {
          state.loading = false;
          state.tasks = action.payload;
        })
        .addCase(fetchUserTasks.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as null ;
        });
    },
  });
  
  export default taskSlice.reducer;