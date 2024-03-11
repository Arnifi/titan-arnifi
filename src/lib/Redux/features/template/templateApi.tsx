import { ILegalDocument } from "@/app/api/legal-documents/legalDocument.model";
import { AppDispatch } from "../../store";
import baseApi from "../baseApi";
import { ITemplate } from "@/app/api/templates/templates.model";

export const templateApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllTemplates: build.query({
      query: () => ({
        url: "/templates",
        method: "GET",
      }),
      providesTags: ["templates"],
    }),

    getTemplate: build.query({
      query: ({ id }) => ({
        url: `/templates/${id}`,
        method: "GET",
      }),
      providesTags: ["templates"],
    }),

    createNewTemplate: build.mutation({
      query: (body) => ({
        url: "/templates",
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
        if (response?.success) {
          dispatch(
            baseApi.util.updateQueryData(
              "getLegalDocument" as never,
              { id: response?.data.document } as never,
              (draft: { data: ILegalDocument }) => {
                draft.data.template = response.data as ITemplate;
                return draft;
              }
            )
          );
        }
      },
    }),

    updateTemplate: build.mutation({
      query: ({ id, data }) => ({
        url: `/templates/${id}`,
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
              "getLegalDocument" as never,
              { id: response?.data.document } as never,
              (draft: { data: ILegalDocument }) => {
                draft.data.template = response.data as ITemplate;
                return draft;
              }
            )
          );
        }
      },
    }),

    generateTemplate: build.mutation({
      query: ({ data }) => ({
        url: `/templates/generate`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateNewTemplateMutation,
  useGetTemplateQuery,
  useGetAllTemplatesQuery,
  useUpdateTemplateMutation,
  useGenerateTemplateMutation,
} = templateApi;
