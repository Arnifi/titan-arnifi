"use client";

import theme from "@/theme";
import { store } from "@/lib/Redux/store";
import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
};

export default Providers;
