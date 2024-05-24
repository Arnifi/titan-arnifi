import {
  TableCell,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import React from "react";
import {
  CompanyStatusType,
  ICompanyApplication,
} from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
import { useRouter } from "next/navigation";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.colorConstants.darkBlue,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "12px",
    fontWeight: 600,
  },
}));

const TableItem = ({ data }: { data: ICompanyApplication }) => {
  const {
    id,
    companyDetails: { companyNames, licenseType },
    linkto,
    username,
    company_status,
  } = data;

  const router = useRouter();

  const buttonBackground =
    company_status?.currentStatus === CompanyStatusType?.OPEN ||
    company_status?.currentStatus === CompanyStatusType?.INREVIEWARNIFI ||
    company_status?.currentStatus === CompanyStatusType?.SUBMITTED
      ? "#EBEEFB"
      : company_status?.currentStatus === CompanyStatusType?.REJECTEDARNIFI ||
        company_status?.currentStatus === CompanyStatusType?.REJECTEDGA
      ? "#FBD2D2"
      : company_status?.currentStatus === CompanyStatusType?.COMPLETED
      ? "#FBD2D2"
      : "#FDEBD8";

  const buttonColor =
    company_status?.currentStatus === CompanyStatusType?.OPEN ||
    company_status?.currentStatus === CompanyStatusType?.INREVIEWARNIFI ||
    company_status?.currentStatus === CompanyStatusType?.SUBMITTED
      ? "#3955D9"
      : company_status?.currentStatus === CompanyStatusType?.REJECTEDARNIFI ||
        company_status?.currentStatus === CompanyStatusType?.REJECTEDGA
      ? "#F15656"
      : company_status?.currentStatus === CompanyStatusType?.COMPLETED
      ? "#36A067"
      : "#F7993B";

  const navigationHandler = (to: string) => {
    router.push(to);
  };

  return (
    <>
      <TableRow
        hover
        onClick={() => navigationHandler(`/company-applications/${id}`)}
        sx={{ cursor: "pointer" }}
      >
        <StyledTableCell align="left">{`${companyNames?.option1} ${companyNames?.option2} ${companyNames?.option3}`}</StyledTableCell>
        <StyledTableCell align="left">{licenseType}</StyledTableCell>
        <StyledTableCell align="left">{username}</StyledTableCell>
        <StyledTableCell align="left">{"jurisdiction"}</StyledTableCell>
        <StyledTableCell align="left">
          {company_status?.currentStep ?? "None"}
        </StyledTableCell>
        <TableCell align="left">
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              padding: "5px",
              borderRadius: "5px",
              width: "150px",
              bgcolor: buttonBackground,
              color: buttonColor,
            }}
          >
            {company_status?.currentStatus === CompanyStatusType?.WAITINGGA
              ? "Waiting on GA"
              : company_status?.currentStatus ?? "None"}
          </Typography>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TableItem;
