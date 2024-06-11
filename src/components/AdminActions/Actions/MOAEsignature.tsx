import {
  CompanyStatusType,
  CompanyStepTypes,
} from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
import theme from "@/theme";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import GlobalButton from "../Buttons/GlobalButton";

interface IProps {
  loading: boolean;
  statusHandlar: (updateStatus: any) => void;
}
const MOAEsignature: React.FC<IProps> = ({ statusHandlar, loading }) => {
  const [isSigned, setIsSigned] = useState<string>("No");

  const handleStatusChange = () => {
    const data = {
      currentStatus: CompanyStatusType.WaitingOnGovernmentAuthority,
      // currentStatus: CompanyStatusType.ReviewAtArnifi,
      currentStep: CompanyStepTypes.LicenseIssued,
      // currentStep: CompanyStepTypes.ReviewAtArnifi,
    };

    statusHandlar(data);
  };

  return (
    <Box
      display="flex"
      justifyContent={"space-between"}
      flexDirection={"column"}
      height={"100%"}
    >
      <Box>
        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: theme.colorConstants.mediumGray,
          }}
        >
          Waiting for all the parties to E-sign the MOA/AOA document.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: theme.colorConstants.mediumGray,
            marginTop: "16px",
          }}
        >
          Have the MOA/AOA document signed?
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

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <GlobalButton
          disabled={isSigned !== "Yes"}
          title="Move to next step"
          onClick={handleStatusChange}
          loading={loading}
        />
      </Box>
    </Box>
  );
};

export default MOAEsignature;
