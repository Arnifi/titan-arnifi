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
import {
  VisaStatusType,
  VisaStepsTypes,
} from "@/lib/Redux/features/visaApplication/visaApplicationSlice";

interface IProps {
  loading: boolean;
  statusHandlar: (updateStatus: any) => void;
}

const IsVisaStamping: React.FC<IProps> = ({ loading, statusHandlar }) => {
  const [isYes, setIsYes] = useState<string>("No");

  const handleStatusChange = () => {
    const data = {
      currentStatus: VisaStatusType.WaitingOnGA,
      currentStep: VisaStepsTypes.WaitingForResidenceVisa,
    };

    statusHandlar(data);
  };

  return (
    <Box
      height={"100%"}
      display={"flex"}
      justifyContent={"space-between"}
      flexDirection={"column"}
    >
      <Box>
        <Typography
          variant="body1"
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            color: theme.colorConstants.mediumGray,
            marginTop: "16px",
          }}
        >
          Has the application been applied for Visa Stamping?
        </Typography>

        <RadioGroup
          row
          value={isYes}
          onChange={(e) => {
            setIsYes(e?.target?.value);
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
          disabled={isYes === "No"}
          loading={loading}
          onClick={handleStatusChange}
          title="Move to next step"
        />
      </Box>
    </Box>
  );
};

export default IsVisaStamping;
