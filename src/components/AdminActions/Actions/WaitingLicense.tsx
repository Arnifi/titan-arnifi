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
import InputFile from "../InputFile/InputFile";

interface IProps {
  loading: boolean;
  statusHandlar: (updateStatus: any) => void;
}
const WaitingLicense: React.FC<IProps> = ({ statusHandlar, loading }) => {
  const [isSigned, setIsSigned] = useState<string>("No");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleStatusChange = () => {
    const data = {
      currentStatus: CompanyStatusType.WaitingOnGovernmentAuthority,
      currentStep: CompanyStepTypes.WaitingEstablishmentCard,
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
        Waiting on License
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
          License issued?
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
        <Box>
          <InputFile setFile={setUploadedFile} />
          <Box
            marginTop="10px"
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <GlobalButton
              disabled={uploadedFile === null}
              title="Upload License and Next"
              loading={loading}
              onClick={handleStatusChange}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default WaitingLicense;
