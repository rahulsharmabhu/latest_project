import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProfileAction = createAsyncThunk();

export const handleApiFailed = (state, action) => {
    state.status = "failed";
    state.videoError = action.payload;
}