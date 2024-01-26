import { createSlice } from "@reduxjs/toolkit";

const angleConfig = null;

const angleSlice = createSlice({
  name: "angle",
  //createSlice will infer the state type from the 'initialState'argument
  initialState: {
    angleState: angleConfig
  },
  reducers: {
    handleAngleClickState: (state, action) => {
      state.angleState = action.payload
      // state.angleState = {
      //   ...state.angleState,
      //   ...action.payload,
      // };
    }
  },
});

export const { resetErrorAction, handleAngleClickState } = angleSlice.actions;
//other code such as selector can be implemented 'RootState' type
export default angleSlice.reducer;
