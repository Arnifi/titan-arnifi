import { ICompanyApplication } from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
import theme from "@/theme";
import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import ReviewCompanyDetails from "./ReviewCompanyDetails";
import ReviewShareholderDetails from "./ReviewShareholderDetails";

interface IProps {
  data: ICompanyApplication;
}
const CompanyFormReviewCard: React.FC<IProps> = ({ data }) => {
  const { companyDetails, shareholders, activityDetails } = data;
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
          height: "70vh",
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
        COMPANY APPLICATION
      </Typography>

      <ReviewCompanyDetails
        data={companyDetails}
        activityDetails={activityDetails}
      />

      {shareholders.length > 0 &&
        shareholders.map((data, i) => (
          <ReviewShareholderDetails index={i} key={i} data={data} />
        ))}
    </Paper>
  );
};

export default CompanyFormReviewCard;
