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
import InputFile from "../InputFile/InputFile";

interface IProps {
  loading: boolean;
  statusHandlar: (updateStatus: Partial<ICompanyStatus>) => void;
}
const WaitingEstablishmentCard: React.FC<IProps> = ({
  statusHandlar,
  loading,
}) => {
  const [isEstablishmentCard, setIsEstablishmentCard] = useState<string>("No");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleStatusChange = () => {
    const data: Partial<ICompanyStatus> = {
      currentStatus: CompanyStatusType.COMPLETED,
      currentStep: CompanyStepTypes.COMPLETED,
      message:
        "Congratulations, your company has been incorporated. For associated documents, please refer to the document section on the dashboard.",
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
        Waiting for Establishment Card
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
          Establishment card is signed?
        </Typography>

        <RadioGroup
          row
          value={isEstablishmentCard}
          onChange={(e) => {
            setIsEstablishmentCard(e?.target?.value);
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

      {isEstablishmentCard === "Yes" && (
        <Box>
          <InputFile setFile={setUploadedFile} />
          <Box
            marginTop={"10px"}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <GlobalButton
              disabled={uploadedFile === null}
              title="Upload and Completed"
              onClick={handleStatusChange}
              loading={loading}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default WaitingEstablishmentCard;
