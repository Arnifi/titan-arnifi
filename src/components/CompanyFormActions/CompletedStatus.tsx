import theme from "@/theme";
import {
  Box,
  Button,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const CompletedStatus = () => {
  const [isSendEmail, setIsSendEmail] = useState<string>("Yes");
  const [emailText, setEmailText] = useState<string>("");
  const handleSubmit = (): void => {
    console.log("values");
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        marginTop: "20px",
        padding: "20px",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: theme.colorConstants?.mediumGray,
          }}
        >
          This Company Create Successfully!
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
            <Button
              onClick={handleSubmit}
              disabled={!emailText}
              size="small"
              variant="contained"
              sx={{
                textTransform: "none",
                paddingX: "20px",
              }}
            >
              Send Email
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default CompletedStatus;
