import { createSlice } from "@reduxjs/toolkit";

const newTabConfig = null;

const newTabSlice = createSlice({
  name: "tab",
  //createSlice will infer the state type from the 'initialState'argument
  initialState: {
    newTabState: newTabConfig
  },
  reducers: {
    handleNewTabClickState: (state, action) => {
      state.newTabState = action.payload
    }
  },
});

export const { resetErrorAction, handleNewTabClickState } = newTabSlice.actions;
//other code such as selector can be implemented 'RootState' type
export default newTabSlice.reducer;
