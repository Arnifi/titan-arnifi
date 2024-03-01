import { ILegalDocument } from "@/app/api/legal-documents/legalDocument.model";
import baseApi from "../baseApi";
import { AppDispatch } from "../../store";
import { IFormStep } from "@/app/api/form-steps/formStep.model";

export const formStepApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDocumentFormSteps: build.query({
      query: (params) => ({
        url: "/form-steps",
        method: "GET",
        params,
      }),
      providesTags: ["steps"],
    }),

    createNewFormStep: build.mutation({
      query: (body) => ({
        url: "/form-steps",
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
        if (response?.data?.legalDocument) {
          dispatch(
            baseApi.util.updateQueryData(
              "getLegalDocument" as never,
              { id: response?.data.legalDocument } as never,
              (draft: { data: ILegalDocument }) => {
                draft?.data?.steps.push(response.data);
              }
            )
          );
        }
      },
    }),

    updateFormStep: build.mutation({
      query: ({ id, data }) => ({
        url: `/form-steps/${id}`,
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
              { id: response?.data.legalDocument } as never,
              (draft: { data: ILegalDocument }) => {
                const index = draft?.data?.steps.findIndex(
                  (step: string | IFormStep) => {
                    if (typeof step !== "string" && step.id) {
                      return step.id === response.data.id;
                    }
                    return false;
                  }
                );

                if (index !== -1) {
                  const steps = draft?.data?.steps;
                  if (steps) {
                    steps[index] = response.data as IFormStep;
                  }
                }
                return draft;
              }
            )
          );
        }
      },
    }),

    deleteFormStep: build.mutation({
      query: ({ id }) => ({
        url: `/form-steps/${id}`,
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
              "getLegalDocument" as never,
              { id: response?.data.legalDocument?.id } as never,
              (draft: { data: ILegalDocument }) => {
                const remain = draft?.data?.steps.filter(
                  (step: string | IFormStep) => {
                    if (typeof step !== "string" && step.id) {
                      return step.id !== response.data.id;
                    }
                  }
                ) as IFormStep[];

                draft.data.steps = remain;
                return draft;
              }
            )
          );
        }
      },
    }),
  }),
});

export const {
  useGetDocumentFormStepsQuery,
  useCreateNewFormStepMutation,
  useUpdateFormStepMutation,
  useDeleteFormStepMutation,
} = formStepApi;
