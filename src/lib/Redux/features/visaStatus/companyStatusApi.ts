import backendBaseApi from "../backendBaseApi";

const adminCommonUrl = "/content-manager/collection-types";

const visaStatusApi = backendBaseApi.injectEndpoints({
  endpoints: (build) => ({
    updateVisaStatus: build.mutation({
      query: ({ id, data }: { id: number; data: any }) => ({
        url: `${adminCommonUrl}/api::visa-status.visa-status/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useUpdateVisaStatusMutation } = visaStatusApi;
