import {
  CompanyStatusType,
  CompanyStepTypes,
  IUploadImage,
} from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
import theme from "@/theme";
import {
  Box,
  FormControlLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import GlobalButton from "../Buttons/GlobalButton";
import LicenseUploadContainer from "../LicenseUploadContainer";
import { Close } from "@mui/icons-material";

export interface ILicenseFiles {
  name: string;
  document: File | IUploadImage;
}

interface IProps {
  loading: boolean;
  statusHandlar: (updateStatus: any) => void;
}
const WaitingLicenseApproval: React.FC<IProps> = ({
  statusHandlar,
  loading,
}) => {
  const [isIssued, setIsIssued] = useState<string>("No");
  const [uploadedFiles, setUploadedFiles] = useState<ILicenseFiles[]>([]);
  const [othersInfo, setOthersInfo] = useState({});

  const handleStatusChange = () => {
    const data = {
      currentStatus: CompanyStatusType.LicenseIssued,
      currentStep: CompanyStepTypes.WaitingEstablishmentCard,
      licenseFiles: uploadedFiles,
      ...othersInfo,
    };

    statusHandlar(data);
  };

  const fileRemoveHandler = (name: string) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.name !== name));
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
            <LicenseUploadContainer
              setOthers={setOthersInfo}
              setFiles={setUploadedFiles}
              files={uploadedFiles}
            />
          </Box>
        )}

        <Box marginTop="20px">
          {uploadedFiles?.map((item, i) => {
            return (
              <Paper
                key={i}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "5px",
                  padding: "5px",
                  border: "1px solid",
                }}
              >
                <Typography>
                  {i + 1}. {item.name}
                </Typography>

                <IconButton
                  onClick={() => fileRemoveHandler(item?.name)}
                  color="error"
                >
                  <Close />
                </IconButton>
              </Paper>
            );
          })}
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <GlobalButton
          disabled={!uploadedFiles?.length}
          title="Move to next step"
          loading={loading}
          onClick={handleStatusChange}
        />
      </Box>
    </Box>
  );
};

export default WaitingLicenseApproval;
