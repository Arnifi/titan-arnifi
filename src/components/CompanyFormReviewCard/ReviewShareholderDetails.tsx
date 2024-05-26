import React from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IShareholder } from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
import theme from "@/theme";

const CustomeTypography = styled(Typography)(() => ({
  color: theme.colorConstants.lightPurple,
  fontSize: "14px",
  fontWeight: "500",
  "@media (min-width: 600px)": {
    fontSize: "14px",
  },
}));
interface Props {
  data: IShareholder;
  index: number;
}

const ReviewShareholderDetails: React.FC<Props> = ({ data, index }) => {
  const {
    passportFont,
    passportBack,
    emiratesID,
    shareholderDetails: {
      name,
      dateOfBirth,
      email,
      gender,
      phone,
      shareNumber,
      passportDetails: {
        address,
        countryOfIssue,
        expiryDate,
        issueDate,
        passportNumber,
      },
    },
  } = data;

  console.log(data);

  return (
    <>
      <Box paddingTop={"16px"}>
        <CustomeTypography gutterBottom>
          Shareholder - {index + 1}
        </CustomeTypography>

        <Grid paddingBottom={"16px"} container spacing={{ xs: 1, md: 2 }}>
          <Grid item xs={12}>
            <Box
              flexDirection={{ xs: "column", md: "row" }}
              display="flex"
              alignItems={{ xs: "start", md: "center" }}
              paddingY={"5px"}
            >
              <CustomeTypography sx={{ width: "200px" }}>
                Name
              </CustomeTypography>
              <Box
                display="flex"
                sx={{
                  whiteSpace: "nowrap",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 500,
                    color: theme.colorConstants.darkGray,
                    whiteSpace: "nowrap",
                  }}
                >
                  {name.firstName}
                </Typography>

                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 500,
                    color: theme.colorConstants.darkGray,
                    whiteSpace: "nowrap",
                    marginLeft: "10px",
                  }}
                >
                  {name.middleName}
                </Typography>

                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 500,
                    color: theme.colorConstants.darkGray,
                    whiteSpace: "nowrap",
                    marginLeft: "10px",
                  }}
                >
                  {name.lastName}
                </Typography>
              </Box>
            </Box>

            <Box
              flexDirection={{ xs: "column", md: "row" }}
              display="flex"
              alignItems={{ xs: "start", md: "center" }}
              paddingY={"5px"}
            >
              <CustomeTypography sx={{ width: "200px" }}>
                Email
              </CustomeTypography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 500,
                  color: theme.colorConstants.darkGray,
                }}
              >
                {email}
              </Typography>
            </Box>

            <Box
              flexDirection={{ xs: "column", md: "row" }}
              display="flex"
              alignItems={{ xs: "start", md: "center" }}
              paddingY={"5px"}
            >
              <CustomeTypography sx={{ width: "200px" }}>
                Phone
              </CustomeTypography>
              <Box display="flex">
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 500,
                    color: theme.colorConstants.darkGray,
                  }}
                >
                  {phone.countryCode}
                </Typography>

                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 500,
                    color: theme.colorConstants.darkGray,
                  }}
                >
                  {phone.number}
                </Typography>
              </Box>
            </Box>

            <Box
              flexDirection={{ xs: "column", md: "row" }}
              display="flex"
              alignItems={{ xs: "start", md: "center" }}
              paddingY={"5px"}
            >
              <CustomeTypography sx={{ width: "200px" }}>
                Number of shares
              </CustomeTypography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 500,
                  color: theme.colorConstants.darkGray,
                }}
              >
                {shareNumber} AED
              </Typography>
            </Box>

            <Box
              flexDirection={{ xs: "column", md: "row" }}
              display="flex"
              alignItems={{ xs: "start", md: "center" }}
              paddingY={"5px"}
            >
              <CustomeTypography sx={{ width: "200px" }}>
                Gender
              </CustomeTypography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 500,
                  color: theme.colorConstants.darkGray,
                  textTransform: "capitalize",
                }}
              >
                {gender}
              </Typography>
            </Box>

            <Box
              flexDirection={{ xs: "column", md: "row" }}
              display="flex"
              alignItems={{ xs: "start", md: "center" }}
              paddingY={"5px"}
            >
              <CustomeTypography sx={{ width: "200px" }}>
                Date of Birth
              </CustomeTypography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 500,
                  color: theme.colorConstants.darkGray,
                  textTransform: "capitalize",
                }}
              >
                {new Date(
                  parseInt(dateOfBirth.year),
                  parseInt(dateOfBirth.month) - 1,
                  parseInt(dateOfBirth.day)
                ).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }) +
                  ` (${
                    new Date().getFullYear() - parseInt(dateOfBirth.year)
                  } Year)`}
              </Typography>
            </Box>

            <Box
              flexDirection={{ xs: "column", md: "row" }}
              display="flex"
              alignItems={{ xs: "start", md: "center" }}
              paddingY={"5px"}
            >
              <CustomeTypography sx={{ width: "200px" }}>
                Passport number
              </CustomeTypography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 500,
                  color: theme.colorConstants.darkGray,
                  textTransform: "capitalize",
                }}
              >
                {passportNumber}
              </Typography>
            </Box>

            <Box
              flexDirection={{ xs: "column", md: "row" }}
              display="flex"
              alignItems={{ xs: "start", md: "center" }}
              paddingY={"5px"}
            >
              <CustomeTypography sx={{ width: "200px" }}>
                Country of issue
              </CustomeTypography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 500,
                  color: theme.colorConstants.darkGray,
                  textTransform: "capitalize",
                }}
              >
                {countryOfIssue}
              </Typography>
            </Box>

            <Box
              flexDirection={{ xs: "column", md: "row" }}
              display="flex"
              alignItems={{ xs: "start", md: "center" }}
              paddingY={"5px"}
            >
              <CustomeTypography sx={{ width: "200px" }}>
                Address
              </CustomeTypography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 500,
                  color: theme.colorConstants.darkGray,
                  textTransform: "capitalize",
                }}
              >
                {address}
              </Typography>
            </Box>

            <Box
              flexDirection={{ xs: "column", md: "row" }}
              display="flex"
              alignItems={{ xs: "start", md: "center" }}
              paddingY={"5px"}
            >
              <CustomeTypography sx={{ width: "200px" }}>
                Passport issue date
              </CustomeTypography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 500,
                  color: theme.colorConstants.darkGray,
                  textTransform: "capitalize",
                }}
              >
                {new Date(issueDate).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </Typography>
            </Box>

            <Box
              flexDirection={{ xs: "column", md: "row" }}
              display="flex"
              alignItems={{ xs: "start", md: "center" }}
              paddingY={"5px"}
            >
              <CustomeTypography sx={{ width: "200px" }}>
                Passport expiry date
              </CustomeTypography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 500,
                  color: theme.colorConstants.darkGray,
                  textTransform: "capitalize",
                }}
              >
                {new Date(expiryDate).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </Typography>
            </Box>

            {passportFont?.url !== "" && passportFont !== null && (
              <Box marginTop={"16px"}>
                <CustomeTypography sx={{ width: "200px" }}>
                  Passport Font
                </CustomeTypography>
                <Box
                  component="img"
                  src={passportFont?.url}
                  sx={{
                    width: "100%",
                  }}
                />
              </Box>
            )}

            {passportBack?.url !== "" && passportBack !== null && (
              <Box marginTop={"16px"}>
                <CustomeTypography sx={{ width: "200px" }}>
                  Passport Back
                </CustomeTypography>
                <Box
                  component="img"
                  src={passportBack?.url}
                  sx={{
                    width: "100%",
                  }}
                />
              </Box>
            )}

            {emiratesID?.url !== "" && emiratesID !== null && (
              <Box marginTop={"16px"}>
                <CustomeTypography sx={{ width: "200px" }}>
                  Emirates ID
                </CustomeTypography>
                <Box
                  component="img"
                  src={emiratesID?.url}
                  sx={{
                    width: "100%",
                  }}
                />
              </Box>
            )}
          </Grid>
        </Grid>
        <Divider />
      </Box>
    </>
  );
};

export default ReviewShareholderDetails;
