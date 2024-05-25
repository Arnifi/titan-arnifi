import {
  CompanyStatusType,
  CompanyStepTypes,
  ICompanyStatus,
} from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
import theme from "@/theme";
import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";

interface IProps {
  isLoading: boolean;
  statusHandlar: (updateStatus: Partial<ICompanyStatus>) => void;
}

const FormSubmitAction: React.FC<IProps> = ({ statusHandlar, isLoading }) => {
  const statusChangeHandler = (): void => {
    const updateStatus = {
      currentStatus: CompanyStatusType.INREVIEWARNIFI,
      currentStep: CompanyStepTypes.INREVIEWARNIFI,
      message:
        "Your application has been picked up by agent for review. If rejected, you will have to resubmit form with the correct details",
    };

    statusHandlar(updateStatus);
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        marginTop: "20px",
        padding: "20px",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: theme.colorConstants?.mediumGray,
          }}
        >
          User Company Form Submit Successfully!
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            onClick={statusChangeHandler}
            variant="contained"
            size="small"
            sx={{
              marginTop: "10px",
              textTransform: "none",
              paddingX: "20px",
            }}
          >
            {isLoading ? "Loading..." : "Move to Review"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default FormSubmitAction;
