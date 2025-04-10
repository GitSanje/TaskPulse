import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { UserPayload } from "@/types"

interface SessionState {
  user: UserPayload | null
  loading: boolean
  initialized: boolean
}

const initialState: SessionState = {
  user: {
   
      userId: undefined,
      email: "",
      username: "",
      profile_url: "",
    
  },
  loading: true,
  initialized: false,
}

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ userData: UserPayload | null }>) => {
      state.user = action.payload.userData 
      state.loading = false
      state.initialized = action.payload.userData ? true : false
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    clearSession: (state) => {
      state.user = null
      state.loading = false
    },
  },
})

export const { setUser, setLoading, clearSession } = sessionSlice.actions

export default sessionSlice.reducer
