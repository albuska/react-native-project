import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    login: null,
  },
  reducers: {
    updateUserProfile: (state, { payload }) =>
      // ({
      //   ...state,
      //   userId: payload.userId,
      //   // login: payload.login
      // }),
      (state.userId = payload.userId),
  },
});

export default authSlice;
