"use client";

import CompanyFormAdminActions from "@/components/AdminActions/CompanyFormAdminActions";
import AdminDocumentActions from "@/components/AdminDocumentActions";
import ApplicationHistoryCard from "@/components/ApplicationHistoryCard";
import ApplicationsDetailsCard from "@/components/ApplicationsDetailsCard";
import CompanyFormReviewCard from "@/components/CompanyFormReviewCard";
import { ICompanyApplication } from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
import { useAppSelector } from "@/lib/Redux/store";
import theme from "@/theme";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const CompanyApplicationDetails = ({ params }: { params: { id: string } }) => {
  const selectedApplication = useAppSelector((state) => {
    return state.companyApplications?.applications?.find(
      (item) => item?.id === Number(params.id)
    );
  });

  const applicationData = [
    {
      label: "Linked To",
      value: selectedApplication?.username as string,
      weight: 12,
    },
    {
      label: "Jurisdiction",
      value: selectedApplication?.jurisdiction as string,
      weight: 6,
    },
    {
      label: "Number of Business Activity",
      value: selectedApplication?.activityDetails?.activities?.length as number,
      weight: 6,
    },
    {
      label: "Current Step",
      value: selectedApplication?.company_status?.currentStep as string,
      weight: 6,
    },
    {
      label: "Current Status",
      value: selectedApplication?.company_status?.currentStatus as string,
      weight: 6,
    },
  ];

  const inputDocumentsData = [
    {
      label: "Shareholder - 1 Passport Font",
      data: "link",
    },
    {
      label: "Shareholder - 1 Passport Back",
      data: "link",
    },
    {
      label: "Shareholder - 2 Passport Font",
      data: "link",
    },
    {
      label: "Shareholder - 2 Passport Back",
      data: "link",
    },
  ];

  const outputDocumentsData = [
    {
      label: "Payment Slip",
      data: null,
    },
    {
      label: "Company License",
      data: null,
    },
    {
      label: "Emirates ID",
      data: null,
    },
  ];

  const historData = [
    {
      label: "Step - 1",
      value: "12/04/2024",
    },
    {
      label: "Step - 2",
      value: "12/04/2024",
    },
    {
      label: "Step - 3",
      value: "12/04/2024",
    },
    {
      label: "Step - 4",
      value: "12/04/2024",
    },
    {
      label: "Step - 5",
      value: "12/04/2024",
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
          Company Form
        </Typography>
      </Box>

      <Grid
        sx={{ marginBottom: "50px", paddingTop: "20px" }}
        container
        spacing={2}
      >
        <Grid item xs={12}>
          <ApplicationsDetailsCard
            title="Applications Details"
            data={applicationData}
          />
        </Grid>

        <Grid item xs={8}>
          <CompanyFormReviewCard
            data={selectedApplication as ICompanyApplication}
          />
        </Grid>
        <Grid item xs={4}>
          <CompanyFormAdminActions
            data={selectedApplication as ICompanyApplication}
          />
        </Grid>

        <Grid item xs={4}>
          <AdminDocumentActions
            title="Input Documents"
            data={inputDocumentsData}
          />
        </Grid>

        <Grid item xs={4}>
          <AdminDocumentActions
            title="Output Documents"
            data={outputDocumentsData}
          />
        </Grid>

        <Grid item xs={8}>
          <ApplicationHistoryCard data={historData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyApplicationDetails;
