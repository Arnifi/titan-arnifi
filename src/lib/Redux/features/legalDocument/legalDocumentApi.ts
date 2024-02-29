import baseApi from "../baseApi";

export const legalDocumentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllDocuments: build.query({
      query: (params) => ({
        url: "/legal-documents",
        method: "GET",
        params,
      }),
      providesTags: ["documents"],
    }),
  }),
});

export const { useGetAllDocumentsQuery } = legalDocumentApi;
