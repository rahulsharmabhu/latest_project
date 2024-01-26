import { createAsyncThunk } from "@reduxjs/toolkit";

export const getThemeAction = createAsyncThunk(

);

export const handleApiFailed = (state, action) => {
  state.status = "failed";
  state.themeError = action.payload;
};
