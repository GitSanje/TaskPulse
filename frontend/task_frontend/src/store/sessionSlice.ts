import { SessionState, UserPayload } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";



const initialState : SessionState = {
    user: null,
    loading:true,
    initialized:false
}

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserPayload | null>)=>{
            state.user = action.payload
            state.loading = false
            state.initialized =  action.payload? true: false
          },
          setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
          },
          clearSession: (state) => {
            state.user = null
            state.loading = false
          },
    }
})

export const { setUser, setLoading, clearSession } = sessionSlice.actions

export default sessionSlice.reducer;