import {
  CompanyStatusType,
  CompanyStepTypes,
  ICompanyStatus,
} from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
import theme from "@/theme";
import {
  Box,
  Button,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

interface IProps {
  isLoading: boolean;
  statusHandlar: (updateStatus: Partial<ICompanyStatus>) => void;
}
const PaymentSuccessfull: React.FC<IProps> = ({ statusHandlar, isLoading }) => {
  const [isSigned, setIsSigned] = useState<string>("No");

  const handleStatusChange = () => {
    const data: Partial<ICompanyStatus> = {
      currentStatus: CompanyStatusType.INREVIEWARNIFI,
      currentStep: CompanyStepTypes.UPLOADPROOF,
    };

    statusHandlar(data);
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
          gutterBottom
          sx={{
            fontSize: "18px",
            fontWeight: 600,
            color: theme.colorConstants?.darkGray,
          }}
        >
          Make Payment
        </Typography>

        <Box>
          <Typography
            variant="body1"
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: theme.colorConstants.mediumGray,
            }}
          >
            GA Payment Successfully?
          </Typography>

          <RadioGroup
            row
            value={isSigned}
            onChange={(e) => {
              setIsSigned(e?.target?.value);
            }}
          >
            {["Yes", "No"].map((item) => (
              <FormControlLabel
                key={item}
                value={item}
                control={<Radio size="small" />}
                label={
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 500,
                      color: theme.colorConstants.darkGray,
                    }}
                  >
                    {item}
                  </Typography>
                }
              />
            ))}
          </RadioGroup>
        </Box>

        {isSigned === "Yes" && (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={handleStatusChange}
              disabled={isLoading}
              variant="contained"
              size="small"
              sx={{
                textTransform: "none",
                paddingX: "20px",
              }}
            >
              {isLoading ? "Loading..." : "Process to Next"}
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default PaymentSuccessfull;
