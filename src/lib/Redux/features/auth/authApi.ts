import { AppDispatch } from "../../store";
import backendBaseApi from "../backendBaseApi";
import { setLoginUser } from "./authSlice";

export interface ILoginUser {
  id: number;
  email: string;
  username: string;
  firstname: string;
  isActive: boolean;
  blocked: boolean;
}

export interface ILoginResponse {
  token: string;
  user: ILoginUser;
}

const authApi = backendBaseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: `/admin/login`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(
        args,
        {
          queryFulfilled,
          dispatch,
        }: { queryFulfilled: any; dispatch: AppDispatch }
      ) {
        const { data: response } = await queryFulfilled;
        const { token, user } = response?.data as ILoginResponse;
        document.cookie = `token=${token}; path=/`;
        dispatch(setLoginUser(user));
      },

      invalidatesTags: ["user"],
    }),

    getLoginUser: build.query({
      query: () => ({
        url: `/admin/users/me`,
        method: "GET",
        providesTags: ["user"],
      }),
    }),
  }),
});

export const { useLoginMutation, useGetLoginUserQuery } = authApi;
