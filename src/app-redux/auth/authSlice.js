import { createSlice } from "@reduxjs/toolkit";
import { loginAction, logOutAction, handleloginFailed } from "./authActions";

const initialState = {
  status: "idle",
  data: {},
  authError: {},
  userResponse: {},
};

const jsonData = {
  id: 1,
  email: "mike@gmail.com",
  name: "Mike",
  designation: "Data Analyst",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIxIiwiRW1haWwsdfdf324423dfsWlsaW5hdG9yLmNvbSIsIk5hbWUiDSFDF324BBZG1pbiIsIlJvbGUiOiJTdHJhaGxlbiBBZG1pbiIsIkJ1c2luZXNzSWQiOiIxIiwiZXhwIjoxNjg5OTQ1MTk1LCJpc3MiOiIqIiwiYXVkIjoiKiJ9.b3pFO0EEZX_ZWyp_wY4De7wY5w3giSTFE6GuUlPbd0M",
  expiration: "2023-07-21T13:13:15Z",
  businessId: 1,
};

const authSlice = createSlice({
  name: "auth",
  //createSlice will infer the state type from the 'initialState'argument
  initialState,
  reducers: {
    resetErrorAction: (state) => {
      delete state.authError;
    },
    handleLogoutAction: (state, action) => {
      state.status = "idle";
      delete state.data;
      localStorage.removeItem('th-app-auth-user');
      // window.location.reload();
    }
  },

  extraReducers: (builder) => {
    builder

      .addCase(loginAction.fulfilled, (state, action) => {
        state.status = "idle";
        localStorage.setItem("th-app-auth-user", JSON.stringify(jsonData));
        state.data = jsonData;
      })
      .addCase(loginAction.rejected, handleloginFailed)

      .addCase(loginAction.pending, (state) => {
        state.status = "loading";
      })

      .addCase(logOutAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logOutAction.fulfilled, (state) => {
        state.status = "idle";
        delete state.data;
        localStorage.removeItem("th-app-auth-user");
        window.location.reload();
      })
      .addCase(logOutAction.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { resetErrorAction, handleLogoutAction } = authSlice.actions;
//other code such as selector can be implemented 'RootState' type
export default authSlice.reducer;
export const selectStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.authError;
export const selectLoginStatus = (state) => state.auth.data;

export const isLogin = (state) => {
  return Boolean(state?.auth?.data?.token);
};
