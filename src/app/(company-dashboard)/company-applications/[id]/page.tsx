"use client";

import CompanyFormAdminActions from "@/components/AdminActions/CompanyFormAdminActions";
import AdminDocumentActions from "@/components/AdminDocumentActions";
import ApplicationHistoryCard from "@/components/ApplicationHistoryCard";
import ApplicationsDetailsCard from "@/components/ApplicationsDetailsCard";
import CompanyFormReviewCard from "@/components/CompanyFormReviewCard";
import {
  ICompanyApplication,
  IUploadImage,
} from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
import { useAppSelector } from "@/lib/Redux/store";
import theme from "@/theme";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import Link from "next/link";
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
      value: selectedApplication?.applicationStatus?.step as string,
      weight: 6,
    },
    {
      label: "Current Status",
      value: selectedApplication?.applicationStatus?.status as string,
      weight: 6,
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

  const historyData = [
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

  const applicationDocuments = [] as { label: string; data: string }[];

  selectedApplication?.shareholders?.forEach((shareholder, i) => {
    const passportFont = shareholder?.passportFont;
    const passportBack = shareholder?.passportBack;
    const emiratesID = shareholder?.emiratesID;

    const file1 = {
      label: `Shareholder - ${i + 1} Passport Font`,
      data: passportFont?.url,
    };

    const file2 = {
      label: `Shareholder - ${i + 1} Passport Back`,
      data: passportBack?.url,
    };

    const file3 = {
      label: `Shareholder - ${i + 1} Emirates ID`,
      data: emiratesID?.url,
    };

    if (file1?.data) {
      applicationDocuments.push(file1);
    }

    if (file2?.data) {
      applicationDocuments.push(file2);
    }

    if (file3?.data) {
      applicationDocuments.push(file3);
    }
  });

  selectedApplication?.applicationStatus?.rejectionFiles?.forEach(
    (file: IUploadImage, i: number) => {
      const commentFile = {
        label: `Rejection File - ${i + 1}`,
        data: file.url,
      };
      applicationDocuments.push(commentFile);
    }
  );

  return (
    <Box>
      <Box
        sx={{
          paddingY: "16px",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
        }}
      >
        <Link href={"/company-applications"}>
          <IconButton>
            <ArrowBackIosNew />
          </IconButton>
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
            data={applicationDocuments}
          />
        </Grid>

        <Grid item xs={4}>
          <AdminDocumentActions
            title="Output Documents"
            data={outputDocumentsData}
          />
        </Grid>

        <Grid item xs={8}>
          <ApplicationHistoryCard data={historyData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyApplicationDetails;
