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

const WaitingOnGA = () => {
  const [isApprove, setIsApproved] = useState<string>("Yes");
  const [rejectMessage, setRejectMessage] = useState<string>("");
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
          variant="body1"
          gutterBottom
          sx={{
            lineHeight: "25px",
            fontSize: "18px",
            fontWeight: 600,
            color: theme.colorConstants?.mediumGray,
          }}
        >
          Has the application been approved by the Government Authority?
        </Typography>

        <Box sx={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
          <RadioGroup
            row
            value={isApprove}
            onChange={(e) => {
              setIsApproved(e?.target?.value);
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

        {isApprove === "No" ? (
          <Box>
            <textarea
              style={{ width: "100%", padding: "5px", fontFamily: "Inter" }}
              rows={4}
              placeholder="Write something here.."
              onChange={(e) => setRejectMessage(e.target.value)}
              value={rejectMessage}
            ></textarea>
            <Button
              color="error"
              onClick={handleSubmit}
              disabled={!rejectMessage}
              size="small"
              variant="contained"
              sx={{
                paddingX: "30px",
                textTransform: "none",
              }}
            >
              Reject on GA
            </Button>
          </Box>
        ) : (
          <Box display={"flex"} justifyContent={"end"}>
            <Button
              variant="contained"
              size="small"
              sx={{
                textTransform: "none",
              }}
            >
              Approve and Next
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default WaitingOnGA;
