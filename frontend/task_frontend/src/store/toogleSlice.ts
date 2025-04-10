import { ToggleState } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


const initialState: ToggleState = {
    toggles: {},
  };
export const toogleSlice = createSlice({
    name: 'toggle',
    initialState,
    reducers:{
        toggle(state, action: PayloadAction<string>){
            const key = action.payload;
            state.toggles[key] = !state.toggles[key];
        },
        setToggle(state, action: PayloadAction<{ key: string; value: boolean }>) {
            const { key, value } = action.payload;
            state.toggles[key] = value;
          },
        resetToggles(state) {
            state.toggles = {};
          },
    }
})


export const { toggle, resetToggles, setToggle } = toogleSlice.actions

export default toogleSlice.reducer