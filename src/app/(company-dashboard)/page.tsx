"use client";

import DashboardCard from "@/components/DashboardCard";
import { CompanyStatusType } from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
import { useAppSelector } from "@/lib/Redux/store";
import theme from "@/theme";
import { Box, Typography, Grid } from "@mui/material";
import Link from "next/link";
import React from "react";

interface ICardProps {
  color: string;
  title: string;
  count: number;
}

const CustomCard: React.FC<ICardProps> = ({ color, title, count }) => {
  return (
    <Box
      sx={{
        bgcolor: color,
        borderRadius: "10px",
        paddingY: "40px",
        paddingX: "30px",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontSize: "32px",
          fontWeight: 700,
          color: theme.colorConstants.darkBlue,
        }}
      >
        {count}
      </Typography>

      <Typography
        variant="h3"
        sx={{
          marginTop: "10px",
          fontSize: "16px",
          fontWeight: 600,
          color: theme.colorConstants.mediumGray,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

const Dashboard = () => {
  const allApplications = useAppSelector(
    (state) => state.companyApplications?.applications
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

  const statusWiseApplications = allCompanyStatus?.map((status) => {
    const applications = allApplications?.filter(
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
          marginY: "30px",
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
              <DashboardCard data={statusWiseApplications} />
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

              <Grid
                container
                spacing={2}
                sx={{
                  paddingX: "40px",
                  paddingBottom: "40px",
                }}
              >
                <Grid item xs={6}>
                  <CustomCard color="#EBEEFB" title="Review" count={30} />
                </Grid>

                <Grid item xs={6}>
                  <CustomCard
                    color="#EBEEFB"
                    title="Waiting on Authority"
                    count={24}
                  />
                </Grid>

                <Grid item xs={6}>
                  <CustomCard color="#EBEEFB" title="In Progress" count={52} />
                </Grid>

                <Grid item xs={6}>
                  <CustomCard color="#FBD2D2" title="Reject" count={10} />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
