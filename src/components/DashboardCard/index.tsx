import {
  CompanyStatusType,
  ICompanyStatus,
} from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
import theme from "@/theme";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";

interface ICardProps {
  color: string;
  title: string;
  count: string;
}

export const CustomCard: React.FC<ICardProps> = ({ color, title, count }) => {
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

interface IProps {
  status: ICompanyStatus[];
}
const DashboardCard: React.FC<IProps> = ({ status }) => {
  const rejectApplications = status.filter(
    (item) =>
      item?.currentStatus === CompanyStatusType.REJECTEDARNIFI ||
      item?.currentStatus === CompanyStatusType.REJECTEDGA
  ).length;

  const reviewApplications = status.filter(
    (item) => item?.currentStatus === CompanyStatusType.INREVIEWARNIFI
  ).length;

  const waitingAuthority = status.filter(
    (item) => item?.currentStatus === CompanyStatusType.WAITINGGA
  );

  const inProgress = status?.filter(
    (item) =>
      item?.currentStatus !== CompanyStatusType.INREVIEWARNIFI &&
      item?.currentStatus !== CompanyStatusType.WAITINGGA &&
      item?.currentStatus !== CompanyStatusType.REJECTEDARNIFI &&
      item?.currentStatus !== CompanyStatusType.REJECTEDGA
  )?.length;

  return (
    <Grid
      container
      spacing={2}
      sx={{
        paddingX: "40px",
        paddingBottom: "40px",
      }}
    >
      <Grid item xs={6}>
        <CustomCard
          color="#EBEEFB"
          title="Review"
          count={reviewApplications.toString().padStart(2, "0")}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomCard
          color="#EBEEFB"
          title="Waiting on Authority"
          count={waitingAuthority.toString().padStart(2, "0")}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomCard
          color="#EBEEFB"
          title="In Progress"
          count={inProgress.toString().padStart(2, "0")}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomCard
          color="#FBD2D2"
          title="Reject"
          count={rejectApplications.toString().padStart(2, "0")}
        />
      </Grid>
    </Grid>
  );
};

export default DashboardCard;
