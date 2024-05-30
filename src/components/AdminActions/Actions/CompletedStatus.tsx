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

interface IProps {
  message: string;
}

const CompletedStatus: React.FC<IProps> = ({ message }) => {
  const [isSendEmail, setIsSendEmail] = useState<string>("Yes");
  const [emailText, setEmailText] = useState<string>("");
  const handleSubmit = (): void => {
    console.log("values");
  };

  return (
    <Box>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 600,
          color: theme.colorConstants?.mediumGray,
        }}
      >
        {message}
      </Typography>

      <Box sx={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
        <Typography
          variant="body1"
          sx={{
            fontSize: "12px",
            fontWeight: 500,
            color: theme.colorConstants?.mediumGray,
            marginRight: "16px",
          }}
        >
          Want to send email to user?
        </Typography>

        <RadioGroup
          row
          value={isSendEmail}
          onChange={(e) => {
            setIsSendEmail(e?.target?.value);
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

      {isSendEmail === "Yes" && (
        <Box>
          <textarea
            style={{ width: "100%", padding: "5px", fontFamily: "Inter" }}
            rows={4}
            placeholder="Write something here.."
            onChange={(e) => setEmailText(e.target.value)}
            value={emailText}
          ></textarea>

          <GlobalButton title="Send Email" loading={false} onClick={() => {}} />
        </Box>
      )}
    </Box>
  );
};

export default CompletedStatus;
