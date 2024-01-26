import { createAsyncThunk } from "@reduxjs/toolkit";

export const getDetectionAction = createAsyncThunk(

);

export const handleApiFailed = (state, action) => {
  state.status = "failed";
  state.detectionError = action.payload;
};
