import { getAuthToken } from "../../helpers";
import { AppDispatch } from "../../store";
import backendBaseApi from "../backendBaseApi";
import {
  ICompanyApplication,
  setCompanyApplications,
} from "../companyApplication/companyApplicationSlice";
import {
  IVisaApplication,
  setVisaApplications,
} from "../visaApplication/visaApplicationSlice";
import { IUser, setCompanyUsers } from "./userSlice";

const adminCommonUrl = "/content-manager/collection-types";

const userApi = backendBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUserWithInfo: build.query({
      query: (params) => ({
        url: `${adminCommonUrl}/plugin::users-permissions.user`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
        params: {
          ...params,
          "populate[cart][populate][cart]": "*",
          "populate[cart][populate][visa_applicants][populate][personalDetails][populate]":
            "*",
          "populate[cart][populate][visa_applicants][populate][otherDetails][populate]":
            "*",
          "populate[cart][populate][visa_applicants][populate][addressDetails][populate]":
            "*",
          "populate[cart][populate][visa_applicants][populate][employmentDetails][populate]":
            "*",
          "populate[cart][populate][visa_applicants][populate][salaryDetails][populate]":
            "*",
          "populate[cart][populate][visa_applicants][populate][passportDetails][populate]":
            "*",
          "populate[cart][populate][visa_applicants][populate][passport][populate]":
            "*",
          "populate[cart][populate][visa_applicants][populate][photograph][populate]":
            "*",
          "populate[cart][populate][visa_applicants][populate][oldVisa][populate]":
            "*",
          "populate[cart][populate][visa_applicants][populate][emiratesID][populate]":
            "*",
          "populate[cart][populate][visa_applicants][populate][otherDocuments][populate]":
            "*",
          "populate[cart][populate][visa_applicants][populate][visa_status][populate]":
            "*",
          "populate[user_form][populate][companyDetails][populate]": "*",
          "populate[user_form][populate][shareholders][populate][shareholderDetails][populate]":
            "*",
          "populate[user_form][populate][shareholders][populate][emiratesID][populate]":
            "*",
          "populate[user_form][populate][shareholders][populate][passportFont][populate]":
            "*",
          "populate[user_form][populate][shareholders][populate][passportBack][populate]":
            "*",
          "populate[user_form][populate][activityDetails][populate]": "*",
          "populate[user_form][populate][uboDecleration][populate]": "*",
          "populate[user_form][populate][applicationStatus][populate]": "*",
          "populate[user_form][populate][applicationStatus][licenseDocuments]":
            "*",
          "populate[orders][populate]": "*",
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

          const companyApplications = [] as ICompanyApplication[];
          const visaApplications = [] as IVisaApplication[];

          results?.forEach((user: IUser) => {
            if (user?.user_form?.id) {
              companyApplications.push({
                ...user.user_form,
                linkto: user.id,
                username: user.username,
                jurisdiction: user?.orders[0]?.authority?.AuthorityName || "",
              });
            }
          });

          results?.forEach((user: IUser) => {
            user?.cart?.visa_applicants?.forEach((visaApplicant) => {
              if (visaApplicant?.id) {
                visaApplications.push({
                  ...visaApplicant,
                  linkto: user.id,
                  username: user.username,
                  companyName:
                    user?.user_form?.companyDetails?.companyNames?.option1 ||
                    "",
                  jurisdiction: user?.cart?.cart?.freeZoneName || "",
                });
              }
            });
          });

          dispatch(setCompanyUsers(results));
          dispatch(setCompanyApplications(companyApplications));
          dispatch(setVisaApplications(visaApplications));
        } catch (error) {
          console.error(error);
        }
      },

      providesTags: ["user"],
    }),
  }),
});

export const { useGetAllUserWithInfoQuery } = userApi;
