import envConfig from "@/Configs/envConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendBaseApi = createApi({
  reducerPath: "backendBaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${envConfig.backendBaseUrl}`,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      const cookies = document.cookie
        .split("; ")
        .reduce<Record<string, string>>((acc, cookie) => {
          const [name, value] = cookie.split("=");
          acc[name] = value;
          return acc;
        }, {});
      const token = cookies["token"];

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["user", "company-applications"],
});

export default backendBaseApi;
