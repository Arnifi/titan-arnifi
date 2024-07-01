import {
  VisaStatusType,
  VisaStepsTypes,
} from "@/lib/Redux/features/visaApplication/visaApplicationSlice";
import theme from "@/theme";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import GlobalButton from "../Buttons/GlobalButton";
import FileUploadContainer from "../FileUploadContainer";

interface IProps {
  loading: boolean;
  statusHandlar: (updateStatus: any) => void;
}

const IsEmiratesIdFormUpload: React.FC<IProps> = ({
  loading,
  statusHandlar,
}) => {
  const [isReportReceived, setIsReportReceived] = useState<string>("No");
  const [idForm, setIdForm] = useState<File | null>(null);
  const [fileNo, setFileNo] = useState<string>("");
  const [uIdNo, setUIdNo] = useState<string>("");

  const handleStatusChange = () => {
    const data = {
      currentStatus: VisaStatusType.WaitingOnGA,
      currentStep: VisaStepsTypes.ApplyForVisaStamping,
      emirateIdForm: idForm,
      fileNo,
      uIdNo,
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
          Has the Emirates id form received?
        </Typography>

        <RadioGroup
          row
          value={isReportReceived}
          onChange={(e) => {
            setIsReportReceived(e?.target?.value);
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

        {isReportReceived === "Yes" && (
          <Box marginTop="20px" sx={{ paddingY: "10px" }}>
            <FileUploadContainer
              file={idForm}
              setFile={setIdForm}
              title="Upload Emirates id form"
            />

            <Box
              marginTop={"16px"}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography sx={{ width: "100px" }}>File No-</Typography>
              <TextField
                sx={{ width: "100%" }}
                size="small"
                variant="outlined"
                placeholder="Enter File Number"
                onChange={(e) => setFileNo(e.target.value)}
                value={fileNo}
              />
            </Box>

            <Box
              marginTop={"16px"}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography sx={{ width: "100px" }}>UID No-</Typography>
              <TextField
                sx={{ width: "100%" }}
                size="small"
                variant="outlined"
                placeholder="Enter UID Number"
                onChange={(e) => setUIdNo(e.target.value)}
                value={uIdNo}
              />
            </Box>
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <GlobalButton
          disabled={!idForm || fileNo === "" || uIdNo === ""}
          loading={loading}
          onClick={handleStatusChange}
          title="Move to next step"
        />
      </Box>
    </Box>
  );
};

export default IsEmiratesIdFormUpload;
