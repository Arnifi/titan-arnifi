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
  statusHandlar: (updateStatus: any) => void;
}

const FormSubmitAction: React.FC<IProps> = ({ statusHandlar, isLoading }) => {
  const statusChangeHandler = (): void => {
    const updateStatus = {
      currentStatus: CompanyStatusType.ReviewAtArnifi,
      currentStep: CompanyStepTypes.ReviewAtArnifi,
    };

    statusHandlar(updateStatus);
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        marginY: "20px",
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
