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
import FileUploadContainer from "../FileUploadContainer";

interface IProps {
  loading: boolean;
  statusHandlar: (updateStatus: any) => void;
}

const IsAgreementEsign: React.FC<IProps> = ({ loading, statusHandlar }) => {
  const [isEvisaIssued, setIsEvisaIssued] = useState<string>("No");
  const [eVisa, setEvisa] = useState<File | null>(null);

  const handleStatusChange = () => {
    const data = {
      currentStatus: VisaStatusType.EvisaIssued,
      currentStep: VisaStepsTypes.EvisaIssued,
      eVisa: eVisa,
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
            fontSize: "16px",
            fontWeight: 600,
            color: theme.colorConstants.mediumGray,
          }}
        >
          Waiting for e-visa
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            color: theme.colorConstants.mediumGray,
            marginTop: "16px",
          }}
        >
          Has the e-visa been issued?
        </Typography>

        <RadioGroup
          row
          value={isEvisaIssued}
          onChange={(e) => {
            setIsEvisaIssued(e?.target?.value);
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

        {isEvisaIssued === "Yes" && (
          <Box marginTop="20px" sx={{ paddingY: "10px" }}>
            <FileUploadContainer
              file={eVisa}
              setFile={setEvisa}
              title="Upload e-Visa"
            />
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <GlobalButton
          disabled={!eVisa}
          loading={loading}
          onClick={handleStatusChange}
          title="Move to next step"
        />
      </Box>
    </Box>
  );
};

export default IsAgreementEsign;
