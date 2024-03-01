"use client";

import envConfig from "@/Configs/envConfig";
import { configureStore } from "@reduxjs/toolkit";
import baseApi from "../features/baseApi";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import snackbarReducer from "../features/snackbar/snackbarSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    snackbar: snackbarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),

  devTools: envConfig.environment !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
