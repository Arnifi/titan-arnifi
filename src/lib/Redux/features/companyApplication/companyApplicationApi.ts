import backendBaseApi from "../backendBaseApi";

const companyApplicationApi = backendBaseApi.injectEndpoints({
  endpoints: (build) => ({
    updateCompanyStatus: build?.mutation({
      query: (data) => ({
        url: `/api/update-company-application-status`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useUpdateCompanyStatusMutation } = companyApplicationApi;
