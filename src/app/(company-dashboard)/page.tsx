"use client";

import OverviewTabularTable from "@/components/OverviewTabularTable";
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
    CompanyStatusType.Open,
    CompanyStatusType.ReviewAtArnifi,
    CompanyStatusType.RejectedAtArnifi,
    CompanyStatusType.WaitingOnGovernmentAuthority,
    CompanyStatusType.RejectedByGA,
    CompanyStatusType.ResolutionEsignRequired,
    CompanyStatusType.MOAAOAEsignRequired,
    CompanyStatusType.LicenseIssued,
    CompanyStatusType.Completed,
  ];

  const allVisaStatus = [
    VisaStatusType.OPEN,
    VisaStatusType.REJECTEDARNIFI,
    VisaStatusType.INREVIEWARNIFI,
    VisaStatusType.WAITINGGA,
    VisaStatusType.REJECTEDGA,
    VisaStatusType.REJECTEDEMPLOYEEAGREEMENT,
    VisaStatusType.REJECTEDEVISA,
    VisaStatusType.MEDICALAPPOINTMENT,
    VisaStatusType.EMIRATESIDAPPOINTMENT,
    VisaStatusType.COMPLETED,
  ];

  console.log(allCompanyApplications);

  const statusWiseCompanyApplications = allCompanyStatus
    ?.map((status) => {
      const applications = allCompanyApplications?.filter(
        (item) => item.applicationStatus?.status === status
      );
      return {
        label: status,
        count: applications?.length,
      };
    })
    .sort((a, b) => b.count - a.count);

  const statusWiseVisaApplications = allVisaStatus
    ?.map((status) => {
      const applications = allVisaApplications?.filter(
        (item) => item.visa_status?.currentStatus === status
      );
      return {
        label: status,
        count: applications.length,
      };
    })
    .sort((a, b) => b.count - a.count);

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
                height: "70vh",
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
              <OverviewTabularTable data={statusWiseCompanyApplications} />
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "5px",
                boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
                height: "70vh",
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

              <OverviewTabularTable data={statusWiseVisaApplications} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
