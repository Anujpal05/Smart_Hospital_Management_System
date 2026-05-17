import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  isLogin: localStorage.getItem("user") !== null ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
      localStorage.clear();
      toast.success("Logout successfully!");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
