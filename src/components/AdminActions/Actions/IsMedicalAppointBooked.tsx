import {
  VisaStatusType,
  VisaStepsTypes,
} from "@/lib/Redux/features/visaApplication/visaApplicationSlice";
import theme from "@/theme";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import GlobalButton from "../Buttons/GlobalButton";

interface IProps {
  loading: boolean;
  statusHandlar: (updateStatus: any) => void;
}

const IsMedicalAppointBooked: React.FC<IProps> = ({
  loading,
  statusHandlar,
}) => {
  const [itYes, setIsYes] = useState<string>("No");
  const [medicalInstruction, setMedicalInstruction] = useState<string>("");
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const handleStatusChange = () => {
    const data = {
      currentStatus: VisaStatusType.MedicalAppointment,
      currentStep: VisaStepsTypes.WaitingForMedicalReports,
      medicalInstruction: medicalInstruction,
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
          Has the medical appointment booked?
        </Typography>

        <RadioGroup
          row
          value={itYes}
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

        {itYes === "Yes" && (
          <Box marginTop={"30px"}>
            <Typography
              variant="body1"
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                color: theme.colorConstants.mediumGray,
              }}
            >
              Add Appointment Details
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: "12px",
                fontWeight: 500,
                color: theme.colorConstants.mediumGray,
              }}
            >
              (Any perquisite of instruction for client)
            </Typography>
            <Box sx={{ width: "100%" }}>
              <textarea
                disabled={isSubmit}
                style={{ width: "100%", padding: "5px", fontFamily: "Inter" }}
                rows={4}
                placeholder="Write something..."
                onChange={(e) => setMedicalInstruction(e.target.value)}
                value={medicalInstruction}
              ></textarea>

              <Stack
                spacing={2}
                direction="row"
                sx={{
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <Button
                  size="small"
                  onClick={() => setIsSubmit(!isSubmit)}
                  variant="outlined"
                  sx={{ paddingX: "16px", textTransform: "none" }}
                >
                  {isSubmit ? "Edit" : "Submit"}
                </Button>
              </Stack>
            </Box>
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <GlobalButton
          disabled={!medicalInstruction || !isSubmit}
          loading={loading}
          onClick={handleStatusChange}
          title="Move to next step"
        />
      </Box>
    </Box>
  );
};

export default IsMedicalAppointBooked;
