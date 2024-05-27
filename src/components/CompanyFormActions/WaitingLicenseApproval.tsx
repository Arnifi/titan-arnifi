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
const WaitingLicenseApproval: React.FC<IProps> = ({
  statusHandlar,
  isLoading,
}) => {
  const [isApproved, setIsApproved] = useState<string>("No");

  const handleStatusChange = () => {
    const data: Partial<ICompanyStatus> = {
      currentStatus: CompanyStatusType.MOAAOASIGNED,
      currentStep: CompanyStepTypes.MOAAOASIGNED,
      message:
        "Your application is under processing at goverment Authority. You will be notified once the company is approved. Post that, they will send an email with MOA/ AOA document for Esigning to all the shareholders and Authorised diginitaries.",
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
          Waiting for License Approval
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
            License Approved?
          </Typography>

          <RadioGroup
            row
            value={isApproved}
            onChange={(e) => {
              setIsApproved(e?.target?.value);
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

        {isApproved === "Yes" && (
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

export default WaitingLicenseApproval;
