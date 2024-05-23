import { AppDispatch } from "../../store";
import backendBaseApi from "../backendBaseApi";
import { setCompanyApplications } from "./companyApplicationSlice";

const adminCommonUrl = "/content-manager/collection-types";

const companyApplicationApi = backendBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCompanyApplications: build.query({
      query: (params) => ({
        url: `${adminCommonUrl}/api::user-form.user-form`,
        method: "GET",
        params: {
          ...params,
          "populate[companyDetails][populate]": "*",
          // populate: "*",
          pageSize: 1000,
        },
      }),

      async onQueryStarted(
        _,
        {
          queryFulfilled,
          dispatch,
        }: { queryFulfilled: any; dispatch: AppDispatch }
      ) {
        try {
          const {
            data: { results },
          } = await queryFulfilled;

          if (results?.length) {
            dispatch(setCompanyApplications(results));
          }
        } catch (error) {
          console.error(error);
        }
      },

      providesTags: ["company-applications"],
    }),
  }),
});

export const { useGetAllCompanyApplicationsQuery } = companyApplicationApi;
