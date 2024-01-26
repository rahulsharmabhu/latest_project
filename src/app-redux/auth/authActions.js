import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../../components/api/apiClient";

export const loginAction = createAsyncThunk(
  "auth/loginAction",
  async (state, { rejectWithValue }) => {
    //   try {
    //     const res = await sendRequest("POST", `/Auth/login`, state);
    //     return res;
    //   } catch (err) {
    //     return rejectWithValue(err.response.data);
    //   }
    return null;
  }
);

export const handleloginFailed = (state, action) => {
  state.status = "failed";
  state.authError = action.payload;
};

export const logOutAction = createAsyncThunk("auth/logOutAction", async () => {
  // const res = await sendRequest("POST", "/accounts/logout", {
  //   headers: {
  //     "Authorization": "application/json",
  //   }
  // });
  return null;
});
