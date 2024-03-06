import { IFieldsBlock } from "@/app/api/fields-blocks/fieldsBlock.model";
import { AppDispatch } from "../../store";
import baseApi from "../baseApi";
import { IFormStep } from "@/app/api/form-steps/formStep.model";

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
              "getFormStep" as never,
              { id: response?.data.step } as never,
              (draft: { data: IFormStep }) => {
                draft?.data?.blocks.push(response.data);
              }
            )
          );
          dispatch(baseApi.util.invalidateTags(["documents"]));
        }
      },
    }),

    updateFieldsBlock: build.mutation({
      query: ({ id, data }) => ({
        url: `/fields-blocks/${id}`,
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
              "getFormStep" as never,
              { id: response?.data.step } as never,
              (draft: { data: IFormStep }) => {
                const index = draft?.data?.blocks.findIndex(
                  (block: string | IFieldsBlock) => {
                    if (typeof block !== "string" && block.id) {
                      return block.id === response.data.id;
                    }
                    return false;
                  }
                );

                if (index !== -1) {
                  const blocks = draft?.data?.blocks;
                  if (blocks) {
                    blocks[index] = response.data as IFieldsBlock;
                  }
                }
                return draft;
              }
            )
          );
          dispatch(baseApi.util.invalidateTags(["documents"]));
        }
      },
    }),

    deleteFieldsBlock: build.mutation({
      query: ({ id }) => ({
        url: `/fields-blocks/${id}`,
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
              "getFormStep" as never,
              { id: response?.data.step?.id } as never,
              (draft: { data: IFormStep }) => {
                const remain = draft?.data?.blocks?.filter(
                  (block: string | IFieldsBlock) => {
                    if (typeof block !== "string" && block.id) {
                      return block.id !== response.data.id;
                    }
                    return false;
                  }
                ) as IFieldsBlock[];

                if (remain) {
                  draft.data.blocks = remain;
                }

                return draft;
              }
            )
          );
          dispatch(baseApi.util.invalidateTags(["documents"]));
        }
      },
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
