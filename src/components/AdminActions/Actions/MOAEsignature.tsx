import {
  CompanyStatusType,
  CompanyStepTypes,
  ICompanyStatus,
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
  statusHandlar: (updateStatus: Partial<ICompanyStatus>) => void;
}
const MOAEsignature: React.FC<IProps> = ({ statusHandlar, loading }) => {
  const [isSigned, setIsSigned] = useState<string>("No");

  const handleStatusChange = () => {
    const data: Partial<ICompanyStatus> = {
      currentStatus: CompanyStatusType.WAITINGGA,
      currentStep: CompanyStepTypes.WAITINGLICENSE,
      message:
        "Your company license documents are under process at governement Authority. Once the documents are issued, it will be available in the documents section.",
    };

    statusHandlar(data);
  };

  return (
    <Box>
      <Typography
        gutterBottom
        sx={{
          fontSize: "18px",
          fontWeight: 600,
          color: theme.colorConstants?.darkGray,
        }}
      >
        Waiting for MOA/AOA E-signature
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
          MOA/AOA E-signature signed?
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
          <GlobalButton
            title="Process to Next"
            onClick={handleStatusChange}
            loading={loading}
          />
        </Box>
      )}
    </Box>
  );
};

export default MOAEsignature;
