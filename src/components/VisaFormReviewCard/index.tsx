import theme from "@/theme";
import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { IVisaApplication } from "@/lib/Redux/features/visaApplication/visaApplicationSlice";

const PreviewSingleContent = ({
  label,
  value,
}: {
  label: string;
  value: string;
}): JSX.Element => {
  return (
    <Box>
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "12px", md: "14px" },
          fontWeight: 500,
          color: theme.colorConstants.mediumGray,
        }}
      >
        {label}
      </Typography>

      <Typography
        variant="body1"
        gutterBottom
        sx={{
          fontSize: { xs: "14px", md: "16px" },
          fontWeight: 500,
          color: theme.colorConstants.black,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

interface IProps {
  data: IVisaApplication;
}
const VisaFormReviewCard: React.FC<IProps> = ({ data }) => {
  const {
    personalDetails,
    addressDetails,
    otherDetails,
    employmentDetails,
    salaryDetails,
    passportDetails,
    photograph,
    passportBack,
    passportFont,
    emiratesID,
    oldVisa,
    otherDocuments,
    isLegalResident,
    isCurrentlyResidingCountry,
    isOtherDocument,
  } = data;

  return (
    <Paper
      variant="outlined"
      sx={{
        marginBottom: "20px",
        height: "100%",
        width: "100%",
        border: "1px solid #e5e5e5",
        padding: "40px",
        "@media (min-width: 600px)": {
          height: "80vh",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "10px",
            backgroundColor: theme.colorConstants.silverGray,
            borderRadius: "20px",
            marginLeft: "50px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.colorConstants.purplishBlue,
            borderRadius: "20px",
          },
        },
      }}
    >
      <Typography
        gutterBottom
        variant="h4"
        sx={{
          fontSize: { xs: "14px", md: "16px" },
          color: theme.colorConstants.black,
        }}
      >
        Visa APPLICATION
      </Typography>

      <Box
        sx={{
          borderBottom: `1px solid ${
            theme.colorConstants.borderColor as string
          }`,
          paddingY: "20px",
        }}
      >
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            fontSize: "14px",
            fontWeight: 700,

            color: theme.colorConstants.darkGray,
          }}
        >
          Personal Details
        </Typography>

        <Grid sx={{ marginTop: "10px" }} container spacing={{ xs: 1, md: 2 }}>
          <Grid item xs={6}>
            <PreviewSingleContent
              label="Full Name"
              value={`${personalDetails?.firstName} ${personalDetails?.middleName} ${personalDetails?.lastName}`}
            />
          </Grid>

          <Grid item xs={6}>
            <PreviewSingleContent
              label="Gender"
              value={personalDetails?.gender}
            />
          </Grid>

          <Grid item xs={6}>
            <PreviewSingleContent
              label="Email ID"
              value={personalDetails?.email}
            />
          </Grid>

          <Grid item xs={6} md={3}>
            <PreviewSingleContent label="Phone Number" value="1234567890" />
          </Grid>

          <Grid item xs={6} md={3}>
            <PreviewSingleContent
              label="Nationality"
              value={personalDetails?.nationality}
            />
          </Grid>

          <Grid item xs={6}>
            <PreviewSingleContent
              label="Date of Birth"
              value={
                new Date(
                  parseInt(personalDetails?.dateOfBirth?.year),
                  parseInt(personalDetails?.dateOfBirth?.month) - 1,
                  parseInt(personalDetails?.dateOfBirth?.day)
                ).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }) +
                ` (${
                  new Date().getFullYear() -
                  parseInt(personalDetails?.dateOfBirth?.year)
                } Year)`
              }
            />
          </Grid>

          <Grid item xs={3}>
            <PreviewSingleContent
              label="Country of Birth"
              value={personalDetails?.countryOfBirth}
            />
          </Grid>

          <Grid item xs={3}>
            <PreviewSingleContent
              label="City of birth"
              value={personalDetails?.cityOfBirth}
            />
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          borderBottom: `1px solid ${
            theme.colorConstants.borderColor as string
          }`,
          paddingY: "20px",
        }}
      >
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            fontSize: "14px",
            fontWeight: 700,

            color: theme.colorConstants.darkGray,
          }}
        >
          Address Details
        </Typography>

        <Grid sx={{ marginTop: "10px" }} container spacing={{ xs: 1, md: 2 }}>
          <Grid item xs={12}>
            <PreviewSingleContent
              label="Full Address"
              value={`${addressDetails?.address?.line1} ${addressDetails?.address?.line2}`}
            />
          </Grid>
        </Grid>

        {addressDetails?.isUAEAddress === "Yes" && (
          <Grid sx={{ marginTop: "10px" }} container spacing={{ xs: 1, md: 2 }}>
            <Grid item xs={6} md={12}>
              <PreviewSingleContent
                label="UAE Full Address"
                value={`${addressDetails?.uaeAddress?.line1} ${addressDetails?.uaeAddress?.line2}`}
              />
            </Grid>
          </Grid>
        )}
      </Box>

      <Box
        sx={{
          borderBottom: `1px solid ${
            theme.colorConstants.borderColor as string
          }`,
          paddingY: "20px",
        }}
      >
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            fontSize: "14px",
            fontWeight: 700,

            color: theme.colorConstants.darkGray,
          }}
        >
          Other Details
        </Typography>

        <Grid sx={{ marginTop: "10px" }} container spacing={{ xs: 1, md: 2 }}>
          <Grid item xs={4}>
            <PreviewSingleContent
              label="Education Level"
              value={`${otherDetails?.education}`}
            />
          </Grid>

          <Grid item xs={4}>
            <PreviewSingleContent
              label="Marital Status"
              value={`${otherDetails?.martialStatus}`}
            />
          </Grid>

          <Grid item xs={4}>
            <PreviewSingleContent
              label="Religion"
              value={`${otherDetails?.religion}`}
            />
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          borderBottom: `1px solid ${
            theme.colorConstants.borderColor as string
          }`,
          paddingY: "20px",
        }}
      >
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            fontSize: "14px",
            fontWeight: 700,

            color: theme.colorConstants.darkGray,
          }}
        >
          Employment Details
        </Typography>

        <Grid sx={{ marginTop: "10px" }} container spacing={{ xs: 1, md: 2 }}>
          <Grid item xs={4}>
            <PreviewSingleContent
              label="Job Title"
              value={`${employmentDetails?.jobTitle}`}
            />
          </Grid>

          <Grid item xs={4}>
            <PreviewSingleContent
              label="Job Duration"
              value={`${employmentDetails?.duration} Months`}
            />
          </Grid>

          <Grid item xs={4}>
            <PreviewSingleContent
              label="Start Date"
              value={new Date(employmentDetails?.startDate).toLocaleDateString(
                "en-GB",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            />
          </Grid>

          <Grid item xs={4}>
            <PreviewSingleContent
              label="Probation Period"
              value={employmentDetails?.probationPeriod}
            />
          </Grid>

          <Grid item xs={4}>
            <PreviewSingleContent
              label="Employment termination notice"
              value={employmentDetails?.terminationNotice}
            />
          </Grid>

          <Grid item xs={4}>
            <PreviewSingleContent
              label="Annual Return ticket eligibility"
              value={employmentDetails?.annualReturnTicket}
            />
          </Grid>

          <Grid item xs={4}>
            <PreviewSingleContent
              label="Annual Leave entitlement"
              value={employmentDetails?.annualLeaveEntitlement}
            />
          </Grid>

          <Grid item xs={4}>
            <PreviewSingleContent
              label="Number of Leaves"
              value={employmentDetails?.numberOfLeaves}
            />
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          borderBottom: `1px solid ${
            theme.colorConstants.borderColor as string
          }`,
          paddingY: "20px",
        }}
      >
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            fontSize: "14px",
            fontWeight: 700,

            color: theme.colorConstants.darkGray,
          }}
        >
          Salary Details
        </Typography>

        <Grid sx={{ marginTop: "10px" }} container spacing={{ xs: 1, md: 2 }}>
          <Grid item xs={4}>
            <PreviewSingleContent
              label="Basic salary"
              value={`${salaryDetails?.basicSalary} AED`}
            />
          </Grid>

          <Grid item xs={4}>
            <PreviewSingleContent
              label="Accommodation allowance"
              value={`${salaryDetails?.accommodationAllowance ?? 0} AED`}
            />
          </Grid>

          <Grid item xs={4}>
            <PreviewSingleContent
              label="Transportation allowance"
              value={`${salaryDetails?.transportationAllowance ?? 0} AED`}
            />
          </Grid>

          <Grid item xs={4}>
            <PreviewSingleContent
              label="Other allowance"
              value={`${salaryDetails?.otherAllowance ?? 0} AED`}
            />
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          borderBottom: `1px solid ${
            theme.colorConstants.borderColor as string
          }`,
          paddingY: "20px",
        }}
      >
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            fontSize: "14px",
            fontWeight: 700,

            color: theme.colorConstants.darkGray,
          }}
        >
          Passport Details
        </Typography>

        <Grid sx={{ marginTop: "10px" }} container spacing={{ xs: 1, md: 2 }}>
          <Grid item xs={4}>
            <PreviewSingleContent
              label="Passport Type"
              value={`${passportDetails?.type}`}
            />
          </Grid>

          <Grid item xs={4}>
            <PreviewSingleContent
              label="Passport Number"
              value={`${passportDetails?.passportNumber}`}
            />
          </Grid>

          <Grid item xs={4}>
            <PreviewSingleContent
              label="country of issue"
              value={`${passportDetails?.countryOfIssue}`}
            />
          </Grid>

          <Grid item xs={12} md={9}>
            <Typography
              variant="body1"
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                color: theme.colorConstants.mediumGray,
              }}
            >
              Passport Front
            </Typography>

            <Box
              sx={{ marginTop: "10px" }}
              component="img"
              src={passportFont?.url}
              alt="Passport Font"
              width={{ xs: "100%", md: "350px" }}
            />
          </Grid>

          <Grid item xs={12} md={9}>
            <Typography
              variant="body1"
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                color: theme.colorConstants.mediumGray,
              }}
            >
              Passport Back
            </Typography>

            <Box
              sx={{ marginTop: "10px" }}
              component="img"
              src={passportBack?.url}
              alt="Passport Back"
              width={{ xs: "100%", md: "350px" }}
            />
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          borderBottom: `1px solid ${
            theme.colorConstants.borderColor as string
          }`,
          paddingY: "20px",
        }}
      >
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            fontSize: "14px",
            fontWeight: 700,

            color: theme.colorConstants.darkGray,
          }}
        >
          Upload Documents
        </Typography>

        <Grid sx={{ marginTop: "10px" }} container spacing={{ xs: 1, md: 2 }}>
          <Grid item xs={12} md={9}>
            <Typography
              variant="body1"
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                color: theme.colorConstants.mediumGray,
              }}
            >
              Photograph
            </Typography>
            <Box
              sx={{ marginTop: "10px" }}
              component="img"
              src={photograph?.url}
              alt="Photograph"
              width={{ xs: "100%", md: "350px" }}
            />
          </Grid>

          {isLegalResident === "Yes" && (
            <Grid item xs={12} md={9}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: theme.colorConstants.mediumGray,
                }}
              >
                Old Visa
              </Typography>
              <Box
                sx={{ marginTop: "10px" }}
                component="img"
                src={oldVisa?.url}
                alt="old visa"
                width="100%"
              />
            </Grid>
          )}

          {isCurrentlyResidingCountry === "Yes" && (
            <Grid item xs={12} md={9}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: theme.colorConstants.mediumGray,
                }}
              >
                Emirates ID
              </Typography>
              <Box
                sx={{ marginTop: "10px" }}
                component="img"
                src={emiratesID?.url}
                alt="old visa"
                width="100%"
              />
            </Grid>
          )}

          {isOtherDocument === "Yes" && (
            <Grid item xs={12} md={9}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: theme.colorConstants.mediumGray,
                }}
              >
                Supporting document
              </Typography>

              {otherDocuments?.map((item, i) => (
                <Box
                  key={i}
                  sx={{ marginTop: "10px" }}
                  component="img"
                  src={item?.url}
                  alt="item?.name"
                  width="100%"
                />
              ))}
            </Grid>
          )}
        </Grid>
      </Box>
    </Paper>
  );
};

export default VisaFormReviewCard;
