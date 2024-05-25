import { AppDispatch } from "../../store";
import backendBaseApi from "../backendBaseApi";

const adminCommonUrl = "/content-manager/collection-types";

const companyStatusApi = backendBaseApi.injectEndpoints({
  endpoints: (build) => ({
    // getAllCompanyApplications: build.query({
    //   query: (params) => ({
    //     url: `${adminCommonUrl}/api::user-form.user-form`,
    //     method: "GET",
    //     params: {
    //       ...params,
    //       "populate[companyDetails][populate]": "*",
    //       // populate: "*",
    //       pageSize: 1000,
    //     },
    //   }),
    //   async onQueryStarted(
    //     _,
    //     {
    //       queryFulfilled,
    //       dispatch,
    //     }: { queryFulfilled: any; dispatch: AppDispatch }
    //   ) {
    //     try {
    //       const {
    //         data: { results },
    //       } = await queryFulfilled;
    //       if (results?.length) {
    //         dispatch(setCompanyApplications(results));
    //       }
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   },
    //   providesTags: ["company-applications"],
    // }),

    // https://better-cuddle-bc12398ec7.strapiapp.com/content-manager/collection-types/api::company-status.company-status/2

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
