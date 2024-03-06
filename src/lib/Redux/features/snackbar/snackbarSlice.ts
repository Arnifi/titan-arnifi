import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  isOpen: boolean;
  message: string;
  type: "success" | "error";
  duration: number;
} = {
  isOpen: false,
  message: "",
  type: "success",
  duration: 5000,
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackbar: (state, action) => {
      state.isOpen = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    closeSnackbar: (state) => {
      state.isOpen = false;
      state.message = "";
      state.type = "success";
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
