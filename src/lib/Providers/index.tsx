"use client";

import theme from "@/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../Redux/store";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
};

export default Providers;
