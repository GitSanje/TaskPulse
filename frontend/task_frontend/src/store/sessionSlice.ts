import { createSlice } from "@reduxjs/toolkit"

interface SessionState {
  user: any | null
  loading: boolean
  initialized: boolean
}

const initialState:SessionState = {
  user: null,
  loading: true,
  initialized: false,
}

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload 
      state.loading = false
      state.initialized = true
    },
    setLoading: (state, action) => {
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
