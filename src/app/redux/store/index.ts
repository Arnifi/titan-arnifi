import envConfig from "@/Configs/envConfig";
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../features/baseApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),

  devTools: envConfig.environment !== "production",
});
