"use client";
import { closeSnackbar } from "@/lib/Redux/features/snackbar/snackbarSlice";
import { useAppDispatch, useAppSelector } from "@/lib/Redux/store";
import { Alert, Snackbar } from "@mui/material";
import React from "react";

const GlobalSnackbar = () => {
  const dispatch = useAppDispatch();
  const { isOpen, message, type, duration } = useAppSelector(
    (state) => state.snackbar
  );

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={duration}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={() => dispatch(closeSnackbar())}
    >
      <Alert
        onClose={() => dispatch(closeSnackbar())}
        severity={type}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
