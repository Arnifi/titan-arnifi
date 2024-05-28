import {
  IVisaApplication,
  VisaStatusType,
} from "@/lib/Redux/features/visaApplication/visaApplicationSlice";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import React from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.colorConstants.darkBlue,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "12px",
    fontWeight: 600,
  },
}));

interface IProps {
  data: IVisaApplication[];
}

const VisaTabularForm: React.FC<IProps> = ({ data }) => {
  const tableHead = [
    {
      label: "Status",
      align: "left",
    },
    {
      label: "Count",
      align: "right",
    },
  ];

  const allVisaStatus = [
    VisaStatusType.OPEN,
    VisaStatusType.REJECTEDARNIFI,
    VisaStatusType.INREVIEWARNIFI,
    VisaStatusType.WAITINGGA,
    VisaStatusType.REJECTEDGA,
    VisaStatusType.REJECTEDEMPLOYEEAGREEMENT,
    VisaStatusType.REJECTEDEVISA,
    VisaStatusType.MEDICALAPPOINTMENT,
    VisaStatusType.EMIRATESIDAPPOINTMENT,
    VisaStatusType.COMPLETED,
  ];

  const statusWiseVisaApplications = allVisaStatus
    ?.map((status) => {
      const applications = data?.filter(
        (item) => item.visa_status?.currentStatus === status
      );
      return {
        leble: status,
        count: applications.length,
      };
    })
    .sort((a, b) => b.count - a.count);

  return (
    <Box>
      <TableContainer>
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              {tableHead?.map((item, i) => (
                <TableCell
                  align={
                    item?.align === "left"
                      ? "left"
                      : item?.align === "center"
                      ? "center"
                      : "right"
                  }
                  key={i}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#333",
                      textTransform: "capitalize",
                    }}
                  >
                    {item?.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {statusWiseVisaApplications?.map((item, i) => (
              <TableRow key={i}>
                <StyledTableCell align="left" scope="row">
                  {item?.leble}
                </StyledTableCell>

                <StyledTableCell align="right" scope="row">
                  {item?.count.toString().padStart(2, "0")}
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default VisaTabularForm;
