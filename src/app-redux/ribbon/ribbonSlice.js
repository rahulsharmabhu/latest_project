import { createSlice } from "@reduxjs/toolkit";

const ribbonConfig = null;

const ribbonSlice = createSlice({
  name: "ribbon",
  //createSlice will infer the state type from the 'initialState'argument
  initialState: {
    ribbonState: ribbonConfig
  },
  reducers: {
    handleRibbonClickState: (state, action) => {
      state.ribbonState = action.payload
    }
  },
});

export const { resetErrorAction, handleRibbonClickState } = ribbonSlice.actions;
//other code such as selector can be implemented 'RootState' type
export default ribbonSlice.reducer;
