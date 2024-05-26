"use client";

import GlobalError from "@/components/Errors/GlobalError";
import GlobalLoader from "@/components/Loaders/GlobalLoader";
import { useGetAllDocumentsQuery } from "@/lib/Redux/features/legalDocument/legalDocumentApi";
import theme from "@/theme";
import { Box, Typography, Card, styled } from "@mui/material";
import React from "react";
import { ILegalDocument } from "../api/legal-documents/legalDocument.model";

const CustomCard = styled(Card)(({ theme }) => ({
  color: theme.colorConstants.darkBlue,
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
}));

const Dashboard = () => {
  const { data, isLoading, isError } = useGetAllDocumentsQuery({});

  if (isLoading) {
    return <GlobalLoader height={"70vh"} />;
  }

  if (isError || !data?.success) {
    return (
      <GlobalError
        height={"70vh"}
        message={data?.message || "Something went wrong"}
      />
    );
  }

  const documents = data?.data as ILegalDocument[];

  const total = documents.length;
  const active = documents.filter((doc) => doc.status).length;
  const pending = documents.filter((doc) => !doc.status).length;
  const download = documents.reduce((a, b) => a + b.downloadCount, 0);

  const pieChartData = [
    {
      id: 1,
      value: total || 0,
      label: "Total Document",
      color: theme.colorConstants.mediumGray || "#gray",
    },
    {
      id: 2,
      value: active || 0,
      label: "Active Document",
      color: theme.colorConstants.discountGreen || "green",
    },
    {
      id: 3,
      value: pending,
      label: "Pending Document",
      color: theme.colorConstants.crossRed || "red",
    },
    {
      id: 4,
      value: download || 0,
      label: "Total Download",
      color: theme.colorConstants.fadedBlue || "blue",
    },
  ];

  return (
    <Box>
      <Box>
        <Typography variant="h3" sx={{ color: theme.colorConstants.darkBlue }}>
          Dashboard Tasks
        </Typography>
      </Box>

      <Box marginTop={5}>Company Dashboard</Box>
    </Box>
  );
};

export default Dashboard;
