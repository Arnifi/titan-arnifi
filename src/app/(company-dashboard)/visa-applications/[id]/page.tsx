"use client";

import VisaFormReviewCard from "@/components/VisaFormReviewCard";
import { IVisaApplication } from "@/lib/Redux/features/visaApplication/visaApplicationSlice";
import { useAppSelector } from "@/lib/Redux/store";
import theme from "@/theme";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const VisaApplicationDetails = ({ params }: { params: { id: string } }) => {
  const selectedApplication = useAppSelector((state) => {
    return state.visaApplications?.applications?.find(
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
        <Link href="/visa-applications">
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
          Visa Form
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box>
            <VisaFormReviewCard
              data={selectedApplication as IVisaApplication}
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
                  <Grid item xs={6}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "12px",
                        color: theme.colorConstants.lightPurple,
                      }}
                    >
                      Company Name
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
                      {selectedApplication?.companyName}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
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

                  <Grid item xs={12}>
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

                  <Grid item xs={6}>
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
                      {selectedApplication?.visa_status?.currentStep}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
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
                      {selectedApplication?.visa_status?.currentStatus}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VisaApplicationDetails;
