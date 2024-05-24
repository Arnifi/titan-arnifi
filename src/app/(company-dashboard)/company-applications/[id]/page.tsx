"use client";

import CompanyFormActions from "@/components/CompanyFormActions";
import CompanyFormReviewCard from "@/components/CompanyFormReviewCard";
import { ICompanyApplication } from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
import { useAppSelector } from "@/lib/Redux/store";
import theme from "@/theme";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const CompanyApplicationDetails = ({ params }: { params: { id: string } }) => {
  const selectedApplication = useAppSelector((state) => {
    return state.companyApplications?.applications?.find(
      (item) => item?.id === Number(params.id)
    );
  });

  return (
    <Box>
      <Box
        sx={{
          paddingY: "16px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link href="/company-applications">
          <KeyboardArrowLeft
            sx={{
              fontSize: "30px",
              color: theme.colorConstants.darkBlue,
            }}
          />
        </Link>
        <Typography
          variant="body1"
          sx={{
            fontSize: "28px",
            fontWeight: 700,
            color: theme.colorConstants.darkBlue,
          }}
        >
          Company Form
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box>
            <CompanyFormReviewCard
              data={selectedApplication as ICompanyApplication}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <Paper sx={{ padding: "20px" }} variant="outlined">
              <Typography
                gutterBottom
                variant="h4"
                sx={{
                  fontSize: "16px",
                  color: theme.colorConstants.black,
                }}
              >
                Applications Details
              </Typography>

              <Box marginTop={"20px"}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "12px",
                        color: theme.colorConstants.lightPurple,
                      }}
                    >
                      Linked To
                    </Typography>

                    <Typography
                      gutterBottom
                      variant="body1"
                      sx={{
                        fontSize: "14px",
                        color: theme.colorConstants.darkBlue,
                        fontWeight: 700,
                      }}
                    >
                      {selectedApplication?.username}
                    </Typography>
                  </Grid>

                  <Grid item xs={5}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "12px",
                        color: theme.colorConstants.lightPurple,
                      }}
                    >
                      Jurisdiction
                    </Typography>

                    <Typography
                      gutterBottom
                      variant="body1"
                      sx={{
                        fontSize: "14px",
                        color: theme.colorConstants.darkBlue,
                        fontWeight: 700,
                      }}
                    >
                      {selectedApplication?.jurisdiction}
                    </Typography>
                  </Grid>

                  <Grid item xs={7}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "12px",
                        color: theme.colorConstants.lightPurple,
                      }}
                    >
                      Number of Business Activity
                    </Typography>

                    <Typography
                      gutterBottom
                      variant="body1"
                      sx={{
                        fontSize: "14px",
                        color: theme.colorConstants.darkBlue,
                        fontWeight: 700,
                      }}
                    >
                      {selectedApplication?.activityDetails?.activities?.length}
                    </Typography>
                  </Grid>

                  <Grid item xs={5}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "12px",
                        color: theme.colorConstants.lightPurple,
                      }}
                    >
                      Current Step
                    </Typography>

                    <Typography
                      gutterBottom
                      variant="body1"
                      sx={{
                        fontSize: "14px",
                        color: theme.colorConstants.darkBlue,
                        fontWeight: 700,
                      }}
                    >
                      {selectedApplication?.company_status?.currentStep}
                    </Typography>
                  </Grid>

                  <Grid item xs={7}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "12px",
                        color: theme.colorConstants.lightPurple,
                      }}
                    >
                      Current Status
                    </Typography>

                    <Typography
                      gutterBottom
                      variant="body1"
                      sx={{
                        fontSize: "14px",
                        color: theme.colorConstants.darkBlue,
                        fontWeight: 700,
                      }}
                    >
                      {selectedApplication?.company_status?.currentStatus}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Paper>

            <CompanyFormActions />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyApplicationDetails;
