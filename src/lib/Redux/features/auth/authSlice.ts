import { createSlice } from "@reduxjs/toolkit";
import { ILoginUser } from "./authApi";

const initialState = {
  loginUser: {} as ILoginUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginUser: (state, action) => {
      state.loginUser = action.payload as ILoginUser;
    },
  },
});

export const { setLoginUser } = authSlice.actions;
export default authSlice.reducer;
