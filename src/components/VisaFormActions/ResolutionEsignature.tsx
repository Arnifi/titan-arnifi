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
  InputLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  css,
  styled,
} from "@mui/material";
import React, { useState } from "react";

interface IProps {
  isLoading: boolean;
  statusHandlar: (updateStatus: Partial<ICompanyStatus> | any) => void;
}
const ResolutionEsignature: React.FC<IProps> = ({
  statusHandlar,
  isLoading,
}) => {
  const [isSigned, setIsSigned] = useState<string>("No");

  const handleStatusChange = () => {
    const data = {
      currentStatus: CompanyStatusType.WaitingOnGovernmentAuthority,
      currentStep: CompanyStepTypes.WaitingEstablishmentCard,
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
          Waiting for Resolution E-signature
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
            Resolution E-signature signed?
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
              {isLoading ? "Loading..." : "Apply License Approved"}
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default ResolutionEsignature;
