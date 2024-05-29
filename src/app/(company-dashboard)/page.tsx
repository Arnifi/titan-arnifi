"use client";

import DashboardCard from "@/components/DashboardCard";
import VisaTabularForm from "@/components/VisaTabularForm";
import { CompanyStatusType } from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
import { VisaStatusType } from "@/lib/Redux/features/visaApplication/visaApplicationSlice";
import { useAppSelector } from "@/lib/Redux/store";
import theme from "@/theme";
import { Box, Typography, Grid } from "@mui/material";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  const allCompanyApplications = useAppSelector(
    (state) => state.companyApplications?.applications
  );

  const allVisaApplications = useAppSelector(
    (state) => state.visaApplications?.applications
  );

  const allCompanyStatus = [
    CompanyStatusType.OPEN,
    CompanyStatusType.SUBMITTED,
    CompanyStatusType.INREVIEWARNIFI,
    CompanyStatusType.REJECTEDARNIFI,
    CompanyStatusType.WAITINGGA,
    CompanyStatusType.REJECTEDGA,
    CompanyStatusType.RESOLUTIONSIGNED,
    CompanyStatusType.MOAAOASIGNED,
    CompanyStatusType.COMPLETED,
  ];

  const statusWiseCompanyApplications = allCompanyStatus?.map((status) => {
    const applications = allCompanyApplications?.filter(
      (item) => item.company_status?.currentStatus === status
    );
    return {
      leble:
        status === CompanyStatusType?.OPEN
          ? "Open"
          : status === CompanyStatusType?.SUBMITTED
          ? "Submitted"
          : status === CompanyStatusType?.INREVIEWARNIFI
          ? "Inreview"
          : status === CompanyStatusType?.REJECTEDARNIFI
          ? "Reject-A"
          : status === CompanyStatusType?.REJECTEDGA
          ? "Reject-GA"
          : status === CompanyStatusType?.WAITINGGA
          ? "Waiting-GA"
          : status === CompanyStatusType?.MOAAOASIGNED
          ? "MOA/AOA"
          : status === CompanyStatusType?.RESOLUTIONSIGNED
          ? "Resolution"
          : "Completed",
      color:
        status === CompanyStatusType?.OPEN
          ? "#EBEEFB"
          : status === CompanyStatusType?.COMPLETED
          ? "#D7ECE1"
          : status === CompanyStatusType?.SUBMITTED
          ? "#D7ECE1"
          : status === CompanyStatusType.INREVIEWARNIFI
          ? "#EBEEFB"
          : status === CompanyStatusType.REJECTEDARNIFI
          ? "#FBD2D2"
          : status === CompanyStatusType.REJECTEDGA
          ? "#FBD2D2"
          : status === CompanyStatusType.WAITINGGA
          ? "#FDEBD8"
          : status === CompanyStatusType.MOAAOASIGNED
          ? "#EBEEFB"
          : status === CompanyStatusType.RESOLUTIONSIGNED
          ? "#D7ECE1"
          : "#FDEBD8",
      count: applications.length,
    };
  });

  return (
    <Box>
      <Box>
        <Typography variant="h3" sx={{ color: theme.colorConstants.darkBlue }}>
          Dashboard Tasks
        </Typography>
      </Box>

      <Box
        sx={{
          marginY: "20px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "5px",
                boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
              }}
            >
              <Box
                sx={{
                  paddingX: "40px",
                  paddingY: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: theme.colorConstants.darkBlue,
                  }}
                >
                  Company Applications
                </Typography>
                <Link href="/company-applications">
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: theme.colorConstants.primaryBlue,
                    }}
                  >
                    View Applications
                  </Typography>
                </Link>
              </Box>
              <DashboardCard data={statusWiseCompanyApplications} />
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "5px",
                boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
              }}
            >
              <Box
                sx={{
                  paddingX: "20px",
                  paddingY: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: theme.colorConstants.darkBlue,
                  }}
                >
                  Visa Applications
                </Typography>
                <Link href="/visa-applications">
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: theme.colorConstants.primaryBlue,
                    }}
                  >
                    View Applications
                  </Typography>
                </Link>
              </Box>

              <VisaTabularForm data={allVisaApplications} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
