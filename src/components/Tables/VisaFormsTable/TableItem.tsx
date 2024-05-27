import {
  TableCell,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import React from "react";
import {
  IVisaApplication,
  VisaStatusType,
} from "@/lib/Redux/features/visaApplication/visaApplicationSlice";
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

const TableItem = ({ data }: { data: IVisaApplication }) => {
  const router = useRouter();

  const {
    id,
    companyName,
    personalDetails,
    visaType,
    username,
    visa_status,
    jurisdiction,
  } = data;

  const applicantName = `${personalDetails?.firstName} ${personalDetails?.middleName} ${personalDetails?.lastName}`;

  const buttonBackground =
    visa_status?.currentStatus === VisaStatusType.OPEN ||
    visa_status?.currentStatus === VisaStatusType.INREVIEWARNIFI ||
    visa_status?.currentStatus === VisaStatusType.SUBMITTED
      ? "#EBEEFB"
      : visa_status?.currentStatus === VisaStatusType.REJECTEDARNIFI ||
        visa_status?.currentStatus === VisaStatusType.REJECTEDGA ||
        visa_status?.currentStatus ===
          VisaStatusType.REJECTEDEMPLOYEEAGREEMENT ||
        visa_status?.currentStatus === VisaStatusType.REJECTEDEVISA
      ? "#FBD2D2"
      : visa_status?.currentStatus === VisaStatusType.COMPLETED
      ? "#D7ECE1"
      : visa_status?.currentStatus === VisaStatusType.MEDICALAPPOINTMENT ||
        visa_status?.currentStatus === VisaStatusType.EMIRATESIDAPPOINTMENT
      ? "#FDEBD8"
      : "#FDEBD8";

  const buttonColor =
    visa_status?.currentStatus === VisaStatusType.OPEN ||
    visa_status?.currentStatus === VisaStatusType.INREVIEWARNIFI ||
    visa_status?.currentStatus === VisaStatusType.SUBMITTED
      ? "#3955D9"
      : visa_status?.currentStatus === VisaStatusType.REJECTEDARNIFI ||
        visa_status?.currentStatus === VisaStatusType.REJECTEDGA ||
        visa_status?.currentStatus ===
          VisaStatusType.REJECTEDEMPLOYEEAGREEMENT ||
        visa_status?.currentStatus === VisaStatusType.REJECTEDEVISA
      ? "#F15656"
      : visa_status?.currentStatus === VisaStatusType.COMPLETED
      ? "#36A067"
      : visa_status?.currentStatus === VisaStatusType.MEDICALAPPOINTMENT ||
        visa_status?.currentStatus === VisaStatusType.EMIRATESIDAPPOINTMENT
      ? "#F7993B"
      : "#F7993B";

  const statusLebel =
    visa_status?.currentStatus === VisaStatusType?.OPEN
      ? "Open"
      : visa_status?.currentStatus === VisaStatusType?.SUBMITTED
      ? "Submitted"
      : visa_status?.currentStatus === VisaStatusType?.INREVIEWARNIFI
      ? "Inreview"
      : visa_status?.currentStatus === VisaStatusType?.REJECTEDARNIFI
      ? "Reject-Agent"
      : visa_status?.currentStatus === VisaStatusType?.REJECTEDGA
      ? "Reject-GA"
      : visa_status?.currentStatus === VisaStatusType?.WAITINGGA
      ? "Waiting-GA"
      : visa_status?.currentStatus === VisaStatusType?.REJECTEDEMPLOYEEAGREEMENT
      ? "Employee"
      : visa_status?.currentStatus === VisaStatusType?.REJECTEDEVISA
      ? "Evisa Issued"
      : visa_status?.currentStatus === VisaStatusType?.MEDICALAPPOINTMENT
      ? "Medical"
      : visa_status?.currentStatus === VisaStatusType?.EMIRATESIDAPPOINTMENT
      ? "Emirates id"
      : visa_status?.currentStatus === VisaStatusType?.COMPLETED
      ? "Completed"
      : "None";

  const navigationHandler = (to: string) => {
    router.push(to);
  };

  return (
    <>
      <TableRow
        sx={{
          cursor: "pointer",
        }}
        hover
        onClick={() => navigationHandler(`/visa-applications/${id}`)}
      >
        <StyledTableCell align="left">{applicantName}</StyledTableCell>
        <StyledTableCell align="left">{companyName}</StyledTableCell>
        <StyledTableCell align="left">{visaType ?? "None"}</StyledTableCell>
        <StyledTableCell align="left">{username}</StyledTableCell>
        <StyledTableCell align="left">{jurisdiction}</StyledTableCell>
        <StyledTableCell align="left">
          {visa_status?.currentStep}
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
            {statusLebel}
          </Typography>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TableItem;
