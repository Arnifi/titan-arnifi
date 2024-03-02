import baseApi from "../baseApi";

const fieldsBlockApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFieldsBlocks: build.query({
      query: (params) => ({
        url: "/fields-blocks",
        method: "GET",
        params,
      }),
    }),

    getFieldsBlock: build.query({
      query: ({ id }) => ({
        url: `/fields-blocks/${id}`,
        method: "GET",
      }),
    }),

    createFieldsBlock: build.mutation({
      query: (body) => ({
        url: "/fields-blocks",
        method: "POST",
        body,
      }),
    }),

    updateFieldsBlock: build.mutation({
      query: ({ id, data }) => ({
        url: `/fields-blocks/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    deleteFieldsBlock: build.mutation({
      query: ({ id }) => ({
        url: `/fields-blocks/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateFieldsBlockMutation,
  useUpdateFieldsBlockMutation,
  useDeleteFieldsBlockMutation,
  useGetFieldsBlockQuery,
  useGetFieldsBlocksQuery,
} = fieldsBlockApi;
