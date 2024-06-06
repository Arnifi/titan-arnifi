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
import FileUploadContainer from "../FileUploadContainer";

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
      currentStatus: CompanyStatusType.Completed,
      currentStep: CompanyStepTypes.Completed,
      message:
        "Congratulations, your company has been incorporated. For associated documents, please refer to the document section on the dashboard.",
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
          gutterBottom
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: theme.colorConstants?.mediumGray,
          }}
        >
          Waiting for the Governmnt Authority to share Establishment card?
        </Typography>

        <Box marginTop={"20px"}>
          <Typography
            variant="body1"
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: theme.colorConstants.mediumGray,
            }}
          >
            Have the Establishment card received?
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
          <Box marginTop={"20px"}>
            <FileUploadContainer
              setFile={setUploadedFile}
              file={uploadedFile}
              title="Upload Establishment Card"
            />
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <GlobalButton
          disabled={!uploadedFile}
          title="Move to next step"
          loading={loading}
          onClick={handleStatusChange}
        />
      </Box>
    </Box>
  );
};

export default WaitingEstablishmentCard;
