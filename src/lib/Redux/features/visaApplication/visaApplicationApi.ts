import { getAuthToken } from "../../helpers";
import backendBaseApi from "../backendBaseApi";

const visaApplicationApi = backendBaseApi.injectEndpoints({
  endpoints: (build) => ({
    updateVisaApplicationData: build.mutation({
      query: (data: FormData) => ({
        url: `/api/update-visa-applicant`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },

        body: data,
      }),
    }),
  }),
});

export const { useUpdateVisaApplicationDataMutation } = visaApplicationApi;
