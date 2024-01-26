import { createSlice } from "@reduxjs/toolkit";
import { updateArray } from "../../components/utils/app.util";

const detectionConfig = [];

const detectionSlice = createSlice({
  name: "detection",
  //createSlice will infer the state type from the 'initialState'argument
  initialState: {
    detectionState: detectionConfig,
  },
  reducers: {
    handleDetectionUpdateClickState: (state, action) => {
      // const { angle, time, waveFrequency } = action.payload;
      const ar = [...state.detectionState];
      const test = updateArray(ar,  action.payload);
      state.detectionState = test;
    },
    handleDetectionClickState: (state, action) => {
      // state.detectionState = [...action.payload];
      state.detectionState = action.payload;
    },
    resetDetectionState: (state) => {
      state.detectionState = [];
    },
  },
});

export const {
  resetErrorAction,
  handleDetectionClickState,
  handleDetectionUpdateClickState,
  resetDetectionState,
} = detectionSlice.actions;
//other code such as selector can be implemented 'RootState' type
export default detectionSlice.reducer;
