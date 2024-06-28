"use client";

import VisaFormAdminActions from "@/components/AdminActions/VisaFormAdminActions";
import AdminDocumentActions from "@/components/AdminDocumentActions";
import ApplicationsDetailsCard from "@/components/ApplicationsDetailsCard";
import VisaFormReviewCard from "@/components/VisaFormReviewCard";
import { IUploadImage } from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
import { IVisaApplication } from "@/lib/Redux/features/visaApplication/visaApplicationSlice";
import { useAppSelector } from "@/lib/Redux/store";
import theme from "@/theme";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const VisaApplicationDetails = ({ params }: { params: { id: string } }) => {
  const selectedApplication = useAppSelector((state) => {
    return state.visaApplications?.applications?.find(
      (item) => item?.id === Number(params.id)
    );
  });

  const applicationDocuments = [] as {
    label: string;
    data: IUploadImage | File;
  }[];

  if (selectedApplication?.passportFont?.url) {
    applicationDocuments?.push({
      label: "Passport Front",
      data: selectedApplication?.passportFont as IUploadImage,
    });
  }

  if (selectedApplication?.passportBack?.url) {
    applicationDocuments?.push({
      label: "Passport Back",
      data: selectedApplication?.passportBack as IUploadImage,
    });
  }

  if (selectedApplication?.photograph?.url) {
    applicationDocuments?.push({
      label: "Photograph",
      data: selectedApplication?.photograph as IUploadImage,
    });
  }

  if (selectedApplication?.oldVisa?.url) {
    applicationDocuments?.push({
      label: "Photograph",
      data: selectedApplication?.photograph as IUploadImage,
    });
  }

  if (selectedApplication?.emiratesID) {
    applicationDocuments?.push({
      label: "Emirates ID ",
      data: selectedApplication?.emiratesID as IUploadImage,
    });
  }

  selectedApplication?.otherDocuments?.forEach((item) => {
    applicationDocuments?.push({
      label: item?.name as string,
      data: item as IUploadImage,
    });
  });

  selectedApplication?.applicationStatus?.rejectionFiles?.forEach((item, i) => {
    applicationDocuments?.push({
      label: `Rejection File - ${i + 1}`,
      data: item as IUploadImage,
    });
  });

  const adminDocuments = [] as {
    label: string;
    data: IUploadImage | File;
  }[];

  selectedApplication?.applicationStatus?.paymentInvoice?.forEach((item) => {
    adminDocuments?.push({
      label: "Payment Invoice",
      data: item as IUploadImage,
    });
  });

  selectedApplication?.applicationStatus?.paymentProof?.forEach((item) => {
    adminDocuments?.push({
      label: "Payment Slip",
      data: item as IUploadImage,
    });
  });

  selectedApplication?.applicationStatus?.eVisa?.forEach((item) => {
    adminDocuments?.push({
      label: "e-Visa",
      data: item as IUploadImage,
    });
  });

  selectedApplication?.applicationStatus?.medicalReports?.forEach((item) => {
    adminDocuments?.push({
      label: "Medical Report",
      data: item as IUploadImage,
    });
  });

  selectedApplication?.applicationStatus?.emirateIdAcForm?.document?.forEach(
    (item) => {
      adminDocuments?.push({
        label: "Emirates ID Form",
        data: item as IUploadImage,
      });
    }
  );

  selectedApplication?.applicationStatus?.residenceVisa?.document?.forEach(
    (item, i) => {
      adminDocuments?.push({
        label: `Residence Visa - ${i + 1}`,
        data: item as IUploadImage,
      });
    }
  );

  console.log(selectedApplication);

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
      value: selectedApplication?.applicationStatus?.step as string,
      weight: 4,
    },
    {
      label: "Current Status",
      value: selectedApplication?.applicationStatus?.status as string,
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
          <Box>
            <VisaFormReviewCard
              data={selectedApplication as IVisaApplication}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <VisaFormAdminActions
              data={selectedApplication as IVisaApplication}
            />
          </Box>
        </Grid>

        <Grid item xs={4}>
          {applicationDocuments?.length > 0 && (
            <AdminDocumentActions
              title="Input Documents"
              data={applicationDocuments}
            />
          )}
        </Grid>

        <Grid item xs={4}>
          {adminDocuments?.length > 0 && (
            <AdminDocumentActions
              title="Output Documents"
              data={adminDocuments}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default VisaApplicationDetails;
