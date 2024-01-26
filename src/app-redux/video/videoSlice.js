import { createSlice } from "@reduxjs/toolkit";

const videoConfig = null;

const videoSlice = createSlice({
  name: "video",
  //createSlice will infer the state type from the 'initialState'argument
  initialState: {
    videoState: videoConfig
  },
  reducers: {
    handleVideoClickState: (state, action) => {
      state.videoState = action.payload
    }
  },
});

export const { resetErrorAction, handleVideoClickState } = videoSlice.actions;
//other code such as selector can be implemented 'RootState' type
export default videoSlice.reducer;
