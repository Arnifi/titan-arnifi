import { IFieldsBlock } from "@/app/api/fields-blocks/fieldsBlock.model";
import { AppDispatch } from "../../store";
import baseApi from "../baseApi";
import { IFormField } from "@/app/api/form-fields/formField.model";

const formFieldApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFormFields: build.query({
      query: (params) => ({
        url: `/form-fields`,
        method: "GET",
        params,
      }),
      providesTags: ["fields"],
    }),

    getFormField: build.query({
      query: ({ id }) => ({
        url: `/form-fields/${id}`,
        method: "GET",
      }),
      providesTags: ["fields"],
    }),

    createFormField: build.mutation({
      query: (data) => ({
        url: `/form-fields`,
        method: "POST",
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
        if (response?.success) {
          dispatch(
            baseApi.util.updateQueryData(
              "getFieldsBlock" as never,
              { id: response?.data.block } as never,
              (draft: { data: IFieldsBlock }) => {
                draft?.data?.fields.push(response.data);
              }
            )
          );

          dispatch(baseApi.util.invalidateTags(["steps"]));
        }
      },
    }),

    updateFormField: build.mutation({
      query: ({ id, data }) => ({
        url: `/form-fields/${id}`,
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
        if (response?.success) {
          dispatch(
            baseApi.util.updateQueryData(
              "getFieldsBlock" as never,
              { id: response?.data.block } as never,
              (draft: { data: IFieldsBlock }) => {
                const index = draft?.data?.fields.findIndex(
                  (field: string | IFormField) => {
                    if (typeof field !== "string" && field.id) {
                      return field.id === response.data.id;
                    }
                    return false;
                  }
                );

                if (index !== -1) {
                  const fields = draft?.data?.fields;
                  if (fields) {
                    fields[index] = response.data as IFormField;
                  }
                }
                return draft;
              }
            )
          );
        }
      },
    }),

    deleteFormField: build.mutation({
      query: ({ id }) => ({
        url: `/form-fields/${id}`,
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
        if (response?.success) {
          dispatch(
            baseApi.util.updateQueryData(
              "getFieldsBlock" as never,
              { id: response?.data.block?.id } as never,
              (draft: { data: IFieldsBlock }) => {
                const remain = draft?.data?.fields?.filter(
                  (fields: string | IFormField) => {
                    if (typeof fields !== "string" && fields.id) {
                      return fields.id !== response.data.id;
                    }
                    return false;
                  }
                ) as IFormField[];

                if (remain) {
                  draft.data.fields = remain;
                }
                return draft;
              }
            )
          );
          dispatch(baseApi.util.invalidateTags(["steps"]));
        }
      },
    }),
  }),
});

export const {
  useCreateFormFieldMutation,
  useGetFormFieldsQuery,
  useGetFormFieldQuery,
  useUpdateFormFieldMutation,
  useDeleteFormFieldMutation,
} = formFieldApi;
