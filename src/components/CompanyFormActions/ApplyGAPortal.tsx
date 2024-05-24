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
import { FormikValues } from "formik";
import React, { useState } from "react";

const ApplyGAPortal = () => {
  const [isApprove, setIsApprove] = useState<string>("Yes");
  const [rejectText, setRejectText] = useState<string>("");
  const handleSubmit = (values: FormikValues): void => {
    console.log("values", values);
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
          gutterBottom
          sx={{
            fontSize: "20px",
            fontWeight: 600,
            color: theme.colorConstants?.darkGray,
          }}
        >
          Application send on GAPortal
        </Typography>

        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: theme.colorConstants?.mediumGray,
          }}
        >
          Wait for Goverment Approval from GAPortal response
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
            Approve for government approval?
          </Typography>

          <RadioGroup
            row
            value={isApprove}
            onChange={(e) => {
              setIsApprove(e?.target?.value);
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

        {isApprove === "Yes" ? (
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              size="small"
              variant="contained"
              sx={{
                textTransform: "none",
              }}
            >
              Make Payment and Next
            </Button>
          </Box>
        ) : (
          <Box>
            <textarea
              style={{ width: "100%", padding: "5px", fontFamily: "Inter" }}
              rows={4}
              placeholder="Write something here.."
              onChange={(e) => setRejectText(e.target.value)}
              value={rejectText}
            ></textarea>
            <Button
              color="error"
              onClick={handleSubmit}
              disabled={!rejectText}
              size="small"
              variant="contained"
              sx={{
                textTransform: "none",
                paddingX: "30px",
              }}
            >
              Reject GA
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default ApplyGAPortal;
