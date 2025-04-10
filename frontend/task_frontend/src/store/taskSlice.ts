import { getUserTasks } from "@/actions/task";
import { TaskState } from "@/types";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";


// Cache time-to-live: 5 minutes
const CACHE_TTL = 50 * 60 * 1000;

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  lastFetched: null, // make sure to add it to the whitelist(taskPersistConfig) to make it persist 
  cacheTTL: CACHE_TTL,
};


export const fetchUserTasks = createAsyncThunk(
  "tasks/fetchUserTasks",
  async (userId: number, thunkAPI) => {
    const state = thunkAPI.getState() as { tasks: TaskState };

    const { lastFetched, cacheTTL, tasks } = state.tasks;
  
    // Check if we have cached data and it's still fresh
    const now = Date.now();
    if (lastFetched && now - lastFetched < cacheTTL){
      // Return a special value to skip the actual API call
      return { cached: true, data: tasks };
    }

    const response = await getUserTasks(userId);
   
    
    if (response.success) {
      return { cached: false, data: response.data };
    } else {
      return thunkAPI.rejectWithValue(response.message);
    }
  }
);

// Force refresh function that bypasses cache
export const forceRefreshTasks = createAsyncThunk(
  "tasks/forceRefreshTasks",
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
  initialState,
  reducers: {

    // Add a reducer to manually invalidate cache
    invalidateCache(state) {
      state.lastFetched = null;
    },
    // Add a reducer to update cache TTL if needed
    setCacheTTL: (state, action) => {
      state.cacheTTL = action.payload;
    },
    // update single task
    updateTaskItem: (state,  action:PayloadAction<{ id: number,key:string, value:string } >) => {
      const { id, key, value } = action.payload;
      state.tasks = state.tasks?.map((task) => 
        task.id === id ? { ...task, [key]: value } : task
      );
    },
    resetTasksState() {
      // Reset state to initialState, effectively flushing it
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTasks.pending, (state) => {
        // Only set loading if we're actually making a request
        // (not using cached data)
        if (
          !state.lastFetched ||
          Date.now() - state.lastFetched >= state.cacheTTL
        ) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchUserTasks.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false first for all cases
        // If we're using cached data, don't update anything
    
        if (action.payload.cached) {
          return;
        }
        // Otherwise update the tasks and lastFetched timestamp
        state.tasks = action.payload.data;
        state.lastFetched = Date.now();
    
      })
      .addCase(fetchUserTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as null;
      })
      // Handle force refresh
      .addCase(forceRefreshTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forceRefreshTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(forceRefreshTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {invalidateCache, resetTasksState, updateTaskItem} =taskSlice.actions
export default taskSlice.reducer;
