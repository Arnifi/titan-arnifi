import theme from "@/theme";
import {
  Box,
  Card,
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

const RejectAction: React.FC<IProps> = ({ message }) => {
  const [isSendEmail, setIsSendEmail] = useState<string>("No");
  const [emailText, setEmailText] = useState<string>("");
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
        Application Reject by Arnifi Agent
      </Typography>

      <Box>
        <Typography
          variant="body1"
          sx={{
            fontSize: "12px",
            color: theme.colorConstants?.mediumGray,
          }}
        >
          Rejection comments
        </Typography>

        <Card
          variant="outlined"
          sx={{
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: theme.colorConstants?.darkGray,
            }}
          >
            {message}
          </Typography>
        </Card>
      </Box>

      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 600,
          color: theme.colorConstants?.mediumGray,
        }}
      >
        Wait for the user to resubmit the form. You can go ahead and send email
        to remind user about the form resubmit.
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

          <GlobalButton
            disabled={!emailText}
            title="Send Email"
            loading={false}
            onClick={() => {}}
            color={"error"}
          />
        </Box>
      )}
    </Box>
  );
};

export default RejectAction;
