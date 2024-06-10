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
import FileUploadContainer from "../FileUploadContainer";

interface IProps {
  loading: boolean;
  statusHandlar: (updateStatus: any) => void;
}
const WaitingLicenseApproval: React.FC<IProps> = ({
  statusHandlar,
  loading,
}) => {
  const [isIssued, setIsIssued] = useState<string>("No");
  const [uploadedFiles, setUploadedFiles] = useState<File | null>(null);

  const handleStatusChange = () => {
    const data = {
      currentStatus: CompanyStatusType.LicenseIssued,
      currentStep: CompanyStepTypes.WaitingEstablishmentCard,
    };

    statusHandlar(data);
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      flexDirection={"column"}
      height={"100%"}
    >
      <Box>
        <Box>
          <Typography
            variant="body1"
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              color: theme.colorConstants.mediumGray,
            }}
          >
            Waiting for the Governemnt Authority to share license documents
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
            Have the License document received?
          </Typography>

          <RadioGroup
            row
            value={isIssued}
            onChange={(e) => {
              setIsIssued(e?.target?.value);
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

        {isIssued === "Yes" && (
          <Box marginTop={"20px"}>
            <FileUploadContainer
              setFile={setUploadedFiles}
              file={uploadedFiles}
              title={`Upload Document - 1`}
            />
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <GlobalButton
          disabled={!uploadedFiles}
          title="Move to next step"
          loading={loading}
          onClick={handleStatusChange}
        />
      </Box>
    </Box>
  );
};

export default WaitingLicenseApproval;
