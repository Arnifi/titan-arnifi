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
import { IOrder, setInitialOrders } from "./orderSlice";

const ordersApi = backendBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllOrders: build.query({
      query: () => ({
        url: `/api/fetch-orders`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
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
          const { data } = await queryFulfilled;

          const companyApplications = [] as ICompanyApplication[];
          const visaApplications = [] as IVisaApplication[];

          data?.forEach((order: IOrder) => {
            if (order?.user_form?.id) {
              companyApplications?.push({
                ...order?.user_form,
                linkto: order?.user?.id,
                username: order?.user?.username,
                jurisdiction: order?.authority?.AuthorityName || "",
              });
            }

            if (order?.visa_applicants?.length > 0) {
              order?.visa_applicants?.forEach((visaApplicant) => {
                if (visaApplicant?.id) {
                  visaApplications?.push({
                    ...visaApplicant,
                    linkto: order?.user?.id,
                    username: order?.user?.username,
                    companyName:
                      order?.user_form?.companyDetails?.companyNames?.option1 ||
                      "",
                    jurisdiction: order?.authority?.AuthorityName || "",
                  });
                }
              });
            }
          });

          dispatch(setInitialOrders(data));
          dispatch(setCompanyApplications(companyApplications));
          dispatch(setVisaApplications(visaApplications));
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useGetAllOrdersQuery } = ordersApi;
