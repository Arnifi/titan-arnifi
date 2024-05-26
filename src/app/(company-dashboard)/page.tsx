"use client";

import DashboardCard from "@/components/DashboardCard";
import { CompanyStatusType } from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
import { VisaStatusType } from "@/lib/Redux/features/visaApplication/visaApplicationSlice";
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

  const allVisaStatus = [
    VisaStatusType.OPEN,
    VisaStatusType.SUBMITTED,
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

  const statusWiseVisaApplications = allVisaStatus?.map((status) => {
    const applications = allVisaApplications?.filter(
      (item) => item.visa_status?.currentStatus === status
    );
    return {
      leble:
        status === VisaStatusType?.OPEN
          ? "Open"
          : status === VisaStatusType?.SUBMITTED
          ? "Submitted"
          : status === VisaStatusType?.INREVIEWARNIFI
          ? "Inreview"
          : status === VisaStatusType?.REJECTEDARNIFI
          ? "Reject-Agent"
          : status === VisaStatusType?.REJECTEDGA
          ? "Reject-GA"
          : status === VisaStatusType?.WAITINGGA
          ? "Waiting-GA"
          : status === VisaStatusType?.REJECTEDEMPLOYEEAGREEMENT
          ? "Employee"
          : status === VisaStatusType?.REJECTEDEVISA
          ? "Evisa Issued"
          : status === VisaStatusType?.MEDICALAPPOINTMENT
          ? "Medical"
          : status === VisaStatusType?.EMIRATESIDAPPOINTMENT
          ? "Emirates id"
          : "Completed",
      color:
        status === VisaStatusType?.OPEN
          ? "#EBEEFB"
          : status === VisaStatusType?.COMPLETED
          ? "#D7ECE1"
          : status === VisaStatusType?.SUBMITTED
          ? "#D7ECE1"
          : status === VisaStatusType.INREVIEWARNIFI
          ? "#EBEEFB"
          : status === VisaStatusType.REJECTEDARNIFI
          ? "#FBD2D2"
          : status === VisaStatusType.REJECTEDGA
          ? "#FBD2D2"
          : status === VisaStatusType.WAITINGGA
          ? "#FDEBD8"
          : status === VisaStatusType.REJECTEDEMPLOYEEAGREEMENT
          ? "#EBEEFB"
          : status === VisaStatusType.REJECTEDEVISA
          ? "#D7ECE1"
          : status === VisaStatusType.MEDICALAPPOINTMENT
          ? "#FDEBD8"
          : status === VisaStatusType.EMIRATESIDAPPOINTMENT
          ? "#EBEEFB"
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

              <DashboardCard data={statusWiseVisaApplications} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
