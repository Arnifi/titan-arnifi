import baseApi from "../baseApi";

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
    }),

    updateFormField: build.mutation({
      query: ({ id, data }) => ({
        url: `/form-fields/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    deleteFormField: build.mutation({
      query: ({ id }) => ({
        url: `/form-fields/${id}`,
        method: "DELETE",
      }),
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
