import backendBaseApi from "../backendBaseApi";

const adminCommonUrl = "/content-manager/collection-types";

const companyStatusApi = backendBaseApi.injectEndpoints({
  endpoints: (build) => ({
    updateCompanyStatus: build.mutation({
      query: ({ id, data }: { id: number; data: any }) => ({
        url: `${adminCommonUrl}/api::company-status.company-status/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useUpdateCompanyStatusMutation } = companyStatusApi;