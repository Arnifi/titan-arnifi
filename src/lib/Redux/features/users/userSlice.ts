import { createSlice } from "@reduxjs/toolkit";
import { ICompanyApplication } from "../companyApplication/companyApplicationSlice";
import { IVisaApplication } from "../visaApplication/visaApplicationSlice";

export interface IUser {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  user_form?: ICompanyApplication;
  cart: {
    visa_applicants: IVisaApplication[];
    cart: {
      freeZoneName: string;
    };
  };
}

const initialState = {
  users: [] as IUser[],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCompanyUsers: (state, { payload }: { payload: IUser[] }) => {
      state.users = payload;
    },
  },
});

export const { setCompanyUsers } = userSlice.actions;
export default userSlice.reducer;
