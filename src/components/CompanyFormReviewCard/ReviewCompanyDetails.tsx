import {
  IActivityDetails,
  ICompanyDetails,
} from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
import theme from "@/theme";
import { Box, Divider, Grid, Typography, styled } from "@mui/material";
import React from "react";

const CustomeTypography = styled(Typography)(() => ({
  color: theme.colorConstants.lightPurple,
  fontSize: "14px",
  fontWeight: "500",
  "@media (min-width: 600px)": {
    fontSize: "14px",
  },
}));

interface IProps {
  data: ICompanyDetails;
  activityDetails: IActivityDetails;
}

const ReviewCompanyDetails: React.FC<IProps> = ({ data, activityDetails }) => {
  const { companyNames, licenseType, shareCapital } = data;

  return (
    <Box>
      <Box paddingTop={"16px"}>
        <CustomeTypography gutterBottom>Compony Name options</CustomeTypography>
        <Grid paddingBottom={"16px"} container spacing={{ xs: 1, md: 2 }}>
          <Grid item xs={12} md={4}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 500,
                color: theme.colorConstants.darkGray,
              }}
            >
              {companyNames.option1}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 500,
                color: theme.colorConstants.darkGray,
              }}
            >
              {companyNames.option2}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 500,
                color: theme.colorConstants.darkGray,
              }}
            >
              {companyNames.option3}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
      </Box>

      <Box paddingTop={"16px"}>
        <CustomeTypography gutterBottom>License Type</CustomeTypography>
        <Grid paddingBottom={"16px"} container spacing={{ xs: 1, md: 2 }}>
          <Grid item xs={12} md={4}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 500,
                color: theme.colorConstants.darkGray,
              }}
            >
              {licenseType}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
      </Box>

      <Box paddingTop={"16px"}>
        <CustomeTypography gutterBottom>Business Activity</CustomeTypography>
        <Grid paddingBottom={"16px"} container spacing={{ xs: 1, md: 2 }}>
          {activityDetails?.activities?.map((activity, i) => (
            <Grid key={i} item xs={12} md={4}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 500,
                  color: theme.colorConstants.darkGray,
                }}
              >
                {`${i + 1}. ${activity?.name ?? ""}`}
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Divider />
      </Box>

      <Box paddingTop={"16px"}>
        <CustomeTypography gutterBottom>
          Share Capital Details
        </CustomeTypography>

        <Grid paddingBottom={"16px"} container spacing={{ xs: 1, md: 2 }}>
          <Grid item xs={12} md={8}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              paddingY={"5px"}
            >
              <CustomeTypography>Number of Shareholders</CustomeTypography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 500,
                  color: theme.colorConstants.darkGray,
                  width: { xs: "50px", md: "150px" },
                }}
              >
                {shareCapital.totalShareholders}
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              paddingY={"5px"}
            >
              <CustomeTypography>Proposed Share Capital</CustomeTypography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 500,
                  color: theme.colorConstants.darkGray,
                  width: { xs: "50px", md: "150px" },
                }}
              >
                {shareCapital.totalShareCapital ?? 0} AED
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              paddingY={"5px"}
            >
              <CustomeTypography>Share Value</CustomeTypography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 500,
                  color: theme.colorConstants.darkGray,
                  width: { xs: "50px", md: "150px" },
                }}
              >
                {shareCapital.shareValue ?? 0} AED
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              paddingY={"5px"}
            >
              <CustomeTypography>Total no of shares</CustomeTypography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 500,
                  color: theme.colorConstants.darkGray,
                  width: { xs: "50px", md: "150px" },
                }}
              >
                {shareCapital.totalNoOfShares ?? 0} AED
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Divider />
      </Box>
    </Box>
  );
};

export default ReviewCompanyDetails;
