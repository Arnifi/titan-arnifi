import { ILegalDocument } from "@/app/api/legal-documents/legalDocument.model";
import { AppDispatch } from "../../store";
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
      async onQueryStarted(
        args,
        {
          queryFulfilled,
          dispatch,
        }: { queryFulfilled: any; dispatch: AppDispatch }
      ) {
        const { data: response } = await queryFulfilled;
        if (response?.data?.id) {
          dispatch(
            baseApi.util.updateQueryData(
              "getAllDocuments" as never,
              {} as never,
              (draft: { data: ILegalDocument[] }) => {
                draft?.data?.unshift(response.data);
              }
            )
          );
        }
      },
    }),

    updateDocument: build.mutation({
      query: ({ id, data }) => ({
        url: `/legal-documents/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(
        args,
        {
          queryFulfilled,
          dispatch,
        }: { queryFulfilled: any; dispatch: AppDispatch }
      ) {
        const { data: response } = await queryFulfilled;
        if (response.success) {
          dispatch(
            baseApi.util.updateQueryData(
              "getAllDocuments" as never,
              {} as never,
              (draft: { data: ILegalDocument[] }) => {
                const index = draft?.data?.findIndex(
                  (docuemnt: ILegalDocument) => docuemnt.id === response.data.id
                );

                if (index !== -1) {
                  const documents = draft?.data;
                  documents[index] = response.data as ILegalDocument;
                }
                return draft;
              }
            )
          );
        }
      },
    }),

    deleteDocument: build.mutation({
      query: ({ id }) => ({
        url: `/legal-documents/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(
        args,
        {
          queryFulfilled,
          dispatch,
        }: { queryFulfilled: any; dispatch: AppDispatch }
      ) {
        const { data: response } = await queryFulfilled;

        if (response.success) {
          dispatch(
            baseApi.util.updateQueryData(
              "getAllDocuments" as never,
              {} as never,
              (draft: { data: ILegalDocument[] }) => {
                const remain = draft?.data?.filter(
                  (docuemnt: ILegalDocument) => docuemnt.id !== response.data.id
                ) as ILegalDocument[];

                draft.data = remain;
                return draft;
              }
            )
          );
        }
      },
    }),

    documentStatusToggle: build.mutation({
      query: ({ data }) => ({
        url: `/legal-documents/toggle`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(
        args,
        {
          queryFulfilled,
          dispatch,
        }: { queryFulfilled: any; dispatch: AppDispatch }
      ) {
        const updatedState = dispatch(
          baseApi.util.updateQueryData(
            "getAllDocuments" as never,
            {} as never,
            (draft: { data: ILegalDocument[] }) => {
              const index = draft?.data?.findIndex(
                (docuemnt: ILegalDocument) => docuemnt.id === args.data.id
              );
              if (index !== -1) {
                const documents = draft?.data;
                documents[index] = { ...args.data, status: !args.data.status };
              }
              return draft;
            }
          )
        );
        try {
          const { data } = await queryFulfilled;
          if (!data.success) {
            updatedState.undo();
          }
        } catch (error) {
          updatedState.undo();
        }
      },
    }),
  }),
});

export const {
  useGetAllDocumentsQuery,
  useCreateNewDocumentMutation,
  useUpdateDocumentMutation,
  useDeleteDocumentMutation,
  useGetLegalDocumentQuery,
  useDocumentStatusToggleMutation,
} = legalDocumentApi;
