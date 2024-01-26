import { createAsyncThunk } from "@reduxjs/toolkit";

export const handleApiFailed = (state, action) => {
  state.status = "failed";
  state.newTabError = action.payload;
};
