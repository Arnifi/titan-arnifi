"use client";

import ApplicationsDetailsCard from "@/components/ApplicationsDetailsCard";
import VisaFormActions from "@/components/VisaFormActions";
import VisaFormReviewCard from "@/components/VisaFormReviewCard";
import { IVisaApplication } from "@/lib/Redux/features/visaApplication/visaApplicationSlice";
import { useAppSelector } from "@/lib/Redux/store";
import theme from "@/theme";
import { FileDownload, Visibility } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
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

const VisaApplicationDetails = ({ params }: { params: { id: string } }) => {
  const selectedApplication = useAppSelector((state) => {
    return state.visaApplications?.applications?.find(
      (item) => item?.id === Number(params.id)
    );
  });

  const inputDocuments = [
    {
      name: "Passport Front",
      file: null,
      formet: "jpg",
    },
    {
      name: "Passport Back",
      file: null,
      formet: "jpg",
    },
    {
      name: "Photograph",
      file: null,
      formet: "jpg",
    },
    {
      name: "Emirates ID",
      file: null,
      formet: "pdf",
    },
  ];

  const outDocuments = [
    {
      name: "Payment Slip",
      file: null,
      formet: "jpg",
    },
    {
      name: "License Copy",
      file: null,
      formet: "pdf",
    },
    {
      name: "Visa Copy",
      file: null,
      formet: "pdf",
    },
  ];

  const applicationData = [
    {
      label: "Company Name",
      value: selectedApplication?.companyName as string,
      weight: 4,
    },
    {
      label: "Linked To",
      value: selectedApplication?.username as string,
      weight: 4,
    },
    {
      label: "Jurisdiction",
      value: selectedApplication?.jurisdiction as string,
      weight: 4,
    },
    {
      label: "Current Step",
      value: selectedApplication?.visa_status?.currentStep as string,
      weight: 4,
    },
    {
      label: "Current Status",
      value: selectedApplication?.visa_status?.currentStatus as string,
      weight: 4,
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          paddingY: "16px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: "28px",
            fontWeight: 700,
            color: theme.colorConstants.darkBlue,
          }}
        >
          Visa Form
        </Typography>
      </Box>
      <Grid sx={{ marginTop: "10px" }} container spacing={2}>
        <Grid item xs={12}>
          <ApplicationsDetailsCard
            title="Applications Details"
            data={applicationData}
          />
        </Grid>
        <Grid item xs={8}>
          <Box>
            <VisaFormReviewCard
              data={selectedApplication as IVisaApplication}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <VisaFormActions data={selectedApplication as IVisaApplication} />
          </Box>
        </Grid>

        <Grid
          item
          xs={4}
          sx={{
            marginBottom: "30px",
          }}
        >
          <Paper sx={{ padding: "20px" }} variant="outlined">
            <Typography
              gutterBottom
              variant="h4"
              sx={{
                fontSize: "16px",
                color: theme.colorConstants.black,
              }}
            >
              Input Documents
            </Typography>

            <Box>
              {inputDocuments?.map((item, i) => {
                return (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: theme.colorConstants.darkBlue,
                        fontWeight: 700,
                      }}
                    >
                      {i + 1}. {item?.name}
                    </Typography>

                    <Box>
                      <Stack direction="row">
                        <IconButton>
                          <Visibility />
                        </IconButton>

                        <IconButton>
                          <FileDownload />
                        </IconButton>
                      </Stack>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Paper>
        </Grid>

        <Grid
          item
          xs={4}
          sx={{
            marginBottom: "30px",
          }}
        >
          <Paper sx={{ padding: "20px" }} variant="outlined">
            <Typography
              gutterBottom
              variant="h4"
              sx={{
                fontSize: "16px",
                color: theme.colorConstants.black,
              }}
            >
              Output Documents
            </Typography>

            <Box>
              {outDocuments?.map((item, i) => {
                return (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: theme.colorConstants.darkBlue,
                        fontWeight: 700,
                      }}
                    >
                      {i + 1}. {item?.name}
                    </Typography>

                    <Box>
                      <Stack direction="row">
                        <IconButton>
                          <Visibility />
                        </IconButton>

                        <IconButton>
                          <FileDownload />
                        </IconButton>
                      </Stack>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Paper>
        </Grid>

        <Grid
          item
          xs={8}
          sx={{
            marginBottom: "30px",
          }}
        >
          <Paper sx={{ padding: "20px" }} variant="outlined">
            <Typography
              gutterBottom
              variant="h4"
              sx={{
                fontSize: "16px",
                color: theme.colorConstants.black,
              }}
            >
              Application History
            </Typography>

            <Box>
              <TableContainer>
                <Table size="small">
                  <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableRow>
                      <TableCell
                        align={"left"}
                        sx={{
                          fontSize: "12px",
                          fontWeight: "700",
                          color: "#333",
                          textTransform: "capitalize",
                        }}
                      >
                        Step Name
                      </TableCell>

                      {/* <TableCell
                        align={"center"}
                        sx={{
                          fontSize: "12px",
                          fontWeight: "700",
                          color: "#333",
                          textTransform: "capitalize",
                        }}
                      >
                        Time
                      </TableCell> */}

                      <TableCell
                        align={"right"}
                        sx={{
                          fontSize: "12px",
                          fontWeight: "700",
                          color: "#333",
                          textTransform: "capitalize",
                        }}
                      >
                        Date
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {Array.from({ length: 5 }).map((_, i) => {
                      return (
                        <TableRow key={i}>
                          <StyledTableCell align="left" scope="row">
                            Step - {i + 1}
                          </StyledTableCell>

                          {/* <StyledTableCell align="center" scope="row">
                            12:00:00 AM
                          </StyledTableCell> */}

                          <StyledTableCell align="right" scope="row">
                            12/12/2022
                          </StyledTableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VisaApplicationDetails;
