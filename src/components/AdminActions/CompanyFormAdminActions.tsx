import {
  ICompanyApplication,
  ICompanyStatus,
} from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
import { Paper } from "@mui/material";
import React from "react";
import StatusNotFound from "./Actions/StatusNotFound";
import { useCreateCompanyStatusMutation } from "@/lib/Redux/features/companyStatus/companyStatusApi";

interface IProps {
  data: ICompanyApplication;
}

const CompanyFormAdminActions: React.FC<IProps> = ({ data }) => {
  const [createCompanyStatus, { isLoading }] = useCreateCompanyStatusMutation();
  console.log(data);

  const statusCreateHandelar = (data: any) => {
    console.log(data);
  };

  const isStatusNotCreated =
    (data?.status === "done" || data?.status === "inprogress") &&
    data?.company_status === null;

  return (
    <Paper variant="outlined" sx={{ padding: "20px", height: "70vh" }}>
      {isStatusNotCreated ? (
        <StatusNotFound
          formStatus={data?.status as string}
          createHandler={statusCreateHandelar}
        />
      ) : null}
    </Paper>
  );
};

export default CompanyFormAdminActions;
