import { createSlice } from "@reduxjs/toolkit";

const commonConfig = null;

const commonSlice = createSlice({
  name: "common",
  //createSlice will infer the state type from the 'initialState'argument
  initialState: {
    downloadState: commonConfig
  },
  reducers: {
    handleDownloadClickState: (state, action) => {
      state.downloadState = action.payload
    }
  },
});

export const { resetErrorAction, handleDownloadClickState, handleLogoutAction } = commonSlice.actions;
//other code such as selector can be implemented 'RootState' type
export default commonSlice.reducer;
