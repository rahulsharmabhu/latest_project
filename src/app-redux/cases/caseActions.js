import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCaseAction = createAsyncThunk(

);

export const handleApiFailed = (state, action) => {
  state.status = "failed";
  state.caseError = action.payload;
};
