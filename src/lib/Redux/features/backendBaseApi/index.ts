import envConfig from "@/Configs/envConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../../helpers";

const backendBaseApi = createApi({
  reducerPath: "backendBaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${envConfig.backendBaseUrl}`,
    // prepareHeaders: async (headers, { getState, endpoint }) => {
    //   const token = getAuthToken();

    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),

  endpoints: () => ({}),
  tagTypes: ["user", "company-applications"],
});

export default backendBaseApi;
