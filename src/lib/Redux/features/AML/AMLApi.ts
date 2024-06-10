import backendBaseApi from "../backendBaseApi";

const amlApi = backendBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getAMLResponse: build?.mutation({
      query: (data) => ({
        url: `/api/anti-money-laundering`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAMLResponseMutation } = amlApi;
