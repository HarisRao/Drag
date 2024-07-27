import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLogin: false,
  accessToken: "",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    saveLoginData: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.token;
      state.isLogin = true;
    },
    logoutData: (state) => {
      state.user = null;
      state.isLogin = false;
      state.accessToken = "";
    },
  },
});

export const { saveLoginData, logoutData } = authSlice.actions;
export default authSlice.reducer;
