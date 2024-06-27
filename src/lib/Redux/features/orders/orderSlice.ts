import { createSlice } from "@reduxjs/toolkit";
import { ICompanyApplication } from "../companyApplication/companyApplicationSlice";
import { IVisaApplication } from "../visaApplication/visaApplicationSlice";

interface IUser {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IOrder {
  id: number;
  authority: {
    AuthorityName: string;
  };
  user_form?: ICompanyApplication;
  visa_applicants: IVisaApplication[];
  user: IUser;
}

const initialState = {
  orders: [] as IOrder[],
};

const userSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setInitialOrders: (state, { payload }: { payload: IOrder[] }) => {
      state.orders = payload;
    },
  },
});

export const { setInitialOrders } = userSlice.actions;
export default userSlice.reducer;
