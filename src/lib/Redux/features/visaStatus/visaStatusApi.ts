import { getAuthToken } from "../../helpers";
import backendBaseApi from "../backendBaseApi";

const adminCommonUrl = "/content-manager/collection-types";

const visaStatusApi = backendBaseApi.injectEndpoints({
  endpoints: (build) => ({
    createVisaStatus: build.mutation({
      query: (data) => ({
        url: `${adminCommonUrl}/api::visa-status.visa-status`,
        method: "POST",
        body: data,
      }),
    }),

    updateVisaStatus: build.mutation({
      query: (data: FormData) => ({
        url: `/api/update-visa-status`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },

        body: data,
      }),
    }),
  }),
});

export const { useUpdateVisaStatusMutation, useCreateVisaStatusMutation } =
  visaStatusApi;
