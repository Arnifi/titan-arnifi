import {
  CompanyStatusType,
  CompanyStepTypes,
} from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
import theme from "@/theme";
import {
  Box,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import GlobalButton from "../Buttons/GlobalButton";
import FileUploadContainer from "../FileUploadContainer";
import EstablishmentCardUploadContainer from "../EstablishmentCardUploadContainer";

interface IProps {
  loading: boolean;
  statusHandlar: (updateStatus: any) => void;
}
const WaitingEstablishmentCard: React.FC<IProps> = ({
  statusHandlar,
  loading,
}) => {
  const [isEstablishmentCard, setIsEstablishmentCard] = useState<string>("No");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [othersInfo, setOthersInfo] = useState<{
    establishmentCardId: string;
    establishmentCardIssueDate: Date;
    establishmentCardExpiryDate: Date;
  }>();

  const handleStatusChange = () => {
    const data = {
      currentStatus: CompanyStatusType.Completed,
      currentStep: CompanyStepTypes.Completed,
      establishmentCard: uploadedFile,
      ...othersInfo,
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
            {uploadedFile && (
              <Grid container spacing={1} sx={{ marginBottom: "20px" }}>
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: theme.colorConstants.mediumGray,
                    }}
                  >
                    Establishment card ID
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: theme.colorConstants.darkGray,
                    }}
                  >
                    {othersInfo?.establishmentCardId}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: theme.colorConstants.mediumGray,
                    }}
                  >
                    Issue Date
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: theme.colorConstants.darkGray,
                    }}
                  >
                    {new Date(
                      othersInfo?.establishmentCardIssueDate as Date
                    ).toLocaleDateString("en-GB")}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: theme.colorConstants.mediumGray,
                    }}
                  >
                    Expiry Date
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: theme.colorConstants.darkGray,
                    }}
                  >
                    {new Date(
                      othersInfo?.establishmentCardExpiryDate as Date
                    ).toLocaleDateString("en-GB")}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: theme.colorConstants.mediumGray,
                    }}
                  >
                    Establishment card
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: theme.colorConstants.darkGray,
                    }}
                  >
                    {uploadedFile?.name}
                  </Typography>
                </Grid>
              </Grid>
            )}

            <EstablishmentCardUploadContainer
              setFile={setUploadedFile}
              file={uploadedFile}
              setOthers={setOthersInfo}
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
