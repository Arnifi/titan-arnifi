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

    getLegalDocument: build.query({
      query: ({ id }) => ({
        url: `/legal-documents/${id}`,
        method: "GET",
      }),
      providesTags: ["documents", "steps"],
    }),

    createNewDocument: build.mutation({
      query: (body) => ({
        url: "/legal-documents",
        method: "POST",
        body,
      }),
      invalidatesTags: ["documents"],
    }),

    updateDocument: build.mutation({
      query: ({ id, data }) => ({
        url: `/legal-documents/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["documents"],
    }),

    deleteDocument: build.mutation({
      query: ({ id }) => ({
        url: `/legal-documents/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["documents"],
    }),
  }),
});

export const {
  useGetAllDocumentsQuery,
  useCreateNewDocumentMutation,
  useUpdateDocumentMutation,
  useDeleteDocumentMutation,
  useGetLegalDocumentQuery,
} = legalDocumentApi;
