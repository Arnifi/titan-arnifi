import theme from "@/theme";
import {
  Box,
  FormControlLabel,
  IconButton,
  InputLabel,
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
import { AttachFile, Close } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface IProps {
  loading: boolean;
  statusHandlar: (updateStatus: any) => void;
}

const IsResidenceVisaUpload: React.FC<IProps> = ({
  loading,
  statusHandlar,
}) => {
  const [isYes, setIsYes] = useState<string>("No");
  const [visaFiles, setVisaFiles] = useState<File[]>([]);
  const [issueDate, setIssueDate] = useState<Dayjs | Date>(new Date());
  const [expiryDate, setExpiryDate] = useState<Dayjs | Date>(new Date());

  const handleStatusChange = () => {
    const data = {
      currentStatus: VisaStatusType.ResidenceVisaIssued,
      currentStep: VisaStepsTypes.ResidenceVisaIssued,
      visaFiles,
      issueDate,
      expiryDate,
    };

    statusHandlar(data);
  };

  const fileRemoveHandler = (file: File) => {
    const remailFiles = visaFiles?.filter((item) => item?.name !== file.name);
    setVisaFiles(remailFiles);
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
          Has the Residence Visa issued?
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

        {isYes === "Yes" && (
          <Box>
            <Box>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: theme.colorConstants.mediumGray,
                  marginTop: "16px",
                }}
              >
                Please upload the Residence Visa & other Visa Documents for the
                clients?
              </Typography>

              <Box
                marginTop={"16px"}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography sx={{ width: "200px" }}>
                  Visa Issue Date:
                </Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dayjs(issueDate)}
                    views={["day", "month", "year"]}
                    format="DD/MM/YYYY"
                    sx={{
                      width: "100%",
                      fontSize: "14px",
                      fontWeight: 500,
                      "& .css-q6j9a0-MuiInputBase-root-MuiOutlinedInput-root": {
                        height: "35px",
                      },
                    }}
                    onChange={(date) => {
                      setIssueDate(date as Dayjs);
                    }}
                  />
                </LocalizationProvider>
              </Box>

              <Box
                marginTop={"16px"}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography sx={{ width: "200px" }}>
                  Visa Expiry Date:
                </Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dayjs(expiryDate)}
                    views={["day", "month", "year"]}
                    format="DD/MM/YYYY"
                    sx={{
                      width: "100%",
                      fontSize: "14px",
                      fontWeight: 500,
                      "& .css-q6j9a0-MuiInputBase-root-MuiOutlinedInput-root": {
                        height: "35px",
                      },
                    }}
                    onChange={(date) => {
                      setExpiryDate(date as Dayjs);
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </Box>

            <Box>
              {visaFiles?.length > 0 && (
                <Box marginY={"10px"}>
                  {visaFiles?.map((file, i) => {
                    return (
                      <Box
                        key={i}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: "14px",
                            fontWeight: 500,
                            color: theme.colorConstants.mediumGray,
                            marginTop: "16px",
                          }}
                        >
                          {i + 1}. {file?.name}
                        </Typography>

                        <IconButton
                          color="error"
                          onClick={() => fileRemoveHandler(file)}
                        >
                          <Close />
                        </IconButton>
                      </Box>
                    );
                  })}
                </Box>
              )}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  marginTop: "16px",
                }}
              >
                <input
                  id={`user-comment-files`}
                  type="file"
                  accept="image/*, application/pdf"
                  style={{ display: "none" }}
                  onChange={(event) => {
                    const file: File | undefined = event.target.files?.[0];
                    if (file !== undefined) {
                      setVisaFiles([...visaFiles, file]);
                    }
                  }}
                />

                <InputLabel
                  htmlFor={`user-comment-files`}
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    width: "200px",
                    height: "35px",
                    bgcolor: theme.colorConstants.primaryBlue,
                    color: theme.colorConstants.white,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  <AttachFile sx={{ rotate: "45deg", marginRight: "10px" }} />
                  {visaFiles?.length > 0
                    ? "Add More Documents"
                    : "Add Documents"}
                </InputLabel>
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <GlobalButton
          disabled={!visaFiles.length}
          loading={loading}
          onClick={handleStatusChange}
          title="Move to next step"
        />
      </Box>
    </Box>
  );
};

export default IsResidenceVisaUpload;
