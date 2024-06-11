"use client";

import GlobalError from "@/components/Errors/GlobalError";
import GlobalLoader from "@/components/Loaders/GlobalLoader";
import OverViewItemsTable from "@/components/Tables/OverviewItemsTable";
import { useGetAllDocumentsQuery } from "@/lib/Redux/features/legalDocument/legalDocumentApi";
import theme from "@/theme";
import {
  Description,
  PendingActions,
  PictureAsPdf,
  SaveAlt,
} from "@mui/icons-material";
import { Box, Typography, Grid, Card, styled } from "@mui/material";
import React from "react";
import { ILegalDocument } from "../api/legal-documents/legalDocument.model";
import OverviewPieChart from "@/components/Charts/PieChart";

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
          Documents Overview
        </Typography>
      </Box>

      <Box marginTop={5}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <CustomCard sx={{ bgcolor: theme.colorConstants.mediumGray }}>
              <Typography
                variant="h4"
                sx={{ color: theme.colorConstants.white }}
              >
                Total Documents
              </Typography>

              <Box
                display="flex"
                alignItems="center"
                justifyContent={"space-between"}
                sx={{ paddingTop: "20px" }}
              >
                <Description
                  sx={{
                    fontSize: "50px",
                    color: theme.colorConstants.white,
                  }}
                />
                <Typography
                  sx={{ color: theme.colorConstants.white }}
                  variant="h2"
                >
                  {total || 0}
                </Typography>
              </Box>
            </CustomCard>
          </Grid>

          <Grid item xs={3}>
            <CustomCard sx={{ bgcolor: theme.colorConstants.discountGreen }}>
              <Typography
                variant="h4"
                sx={{ color: theme.colorConstants.white }}
              >
                Active Documents
              </Typography>

              <Box
                display="flex"
                alignItems="center"
                justifyContent={"space-between"}
                sx={{ paddingTop: "20px" }}
              >
                <PictureAsPdf
                  sx={{
                    fontSize: "50px",
                    color: theme.colorConstants.white,
                  }}
                />
                <Typography
                  sx={{ color: theme.colorConstants.white }}
                  variant="h2"
                >
                  {active || 0}
                </Typography>
              </Box>
            </CustomCard>
          </Grid>

          <Grid item xs={3}>
            <CustomCard sx={{ bgcolor: theme.colorConstants.crossRed }}>
              <Typography
                variant="h4"
                sx={{ color: theme.colorConstants.white }}
              >
                Pending Documents
              </Typography>

              <Box
                display="flex"
                alignItems="center"
                justifyContent={"space-between"}
                sx={{ paddingTop: "20px" }}
              >
                <PendingActions
                  sx={{
                    fontSize: "50px",
                    color: theme.colorConstants.white,
                  }}
                />
                <Typography
                  sx={{ color: theme.colorConstants.white }}
                  variant="h2"
                >
                  {pending || 0}
                </Typography>
              </Box>
            </CustomCard>
          </Grid>

          <Grid item xs={3}>
            <CustomCard sx={{ bgcolor: theme.colorConstants.fadedBlue }}>
              <Typography
                variant="h4"
                sx={{ color: theme.colorConstants.white }}
              >
                Total Download
              </Typography>

              <Box
                display="flex"
                alignItems="center"
                justifyContent={"space-between"}
                sx={{ paddingTop: "20px" }}
              >
                <SaveAlt
                  sx={{
                    fontSize: "50px",
                    color: theme.colorConstants.white,
                  }}
                />
                <Typography
                  sx={{ color: theme.colorConstants.white }}
                  variant="h2"
                >
                  {download || 0}
                </Typography>
              </Box>
            </CustomCard>
          </Grid>

          <Grid item xs={8}>
            <Box>
              <Typography
                gutterBottom
                variant="h4"
                sx={{ color: theme.colorConstants.darkBlue }}
              >
                Top 10 Downloaded Documents
              </Typography>

              <OverViewItemsTable data={documents} />
            </Box>
          </Grid>

          <Grid item xs={4}>
            <OverviewPieChart data={pieChartData} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
