import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCommonAction = createAsyncThunk(

);

export const handleApiFailed = (state, action) => {
  state.status = "failed";
  state.commonError = action.payload;
};
