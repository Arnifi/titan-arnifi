import baseApi from "../../../../lib/Redux/features/baseApi";

export const attractionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getLegalDocuments: build.query({
      query: () => ({
        url: "/legals",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetLegalDocumentsQuery } = attractionApi;
