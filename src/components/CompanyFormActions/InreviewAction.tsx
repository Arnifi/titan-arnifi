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

const InreviewAction = () => {
  const [isReject, setIsReject] = useState("No");
  const [rejectText, setRejectText] = useState<string>("");
  const statusRejectHandler = (values: FormikValues): void => {
    console.log("values", values);
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        marginTop: "20px",
        marginBottom: "10px",
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
          Please review the application
        </Typography>

        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 500,
            color: theme.colorConstants?.mediumGray,
          }}
        >
          Below are the important points to check
        </Typography>

        <Box marginTop="10px">
          {[
            "Documents",
            "Name across application and documents",
            "Validity of documents",
          ].map((item, i) => (
            <Typography
              key={item}
              variant="body1"
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: theme.colorConstants?.darkBlue,
              }}
            >
              {i + 1}. {item}
            </Typography>
          ))}

          <Box
            sx={{ marginTop: "10px", display: "flex", flexDirection: "column" }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: "12px",
                fontWeight: 500,
                color: theme.colorConstants?.mediumGray,
                marginRight: "16px",
              }}
            >
              Are you sure reject this Application?
            </Typography>

            <RadioGroup
              row
              value={isReject}
              onChange={(e) => {
                setIsReject(e?.target?.value);
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

          <Box>
            {isReject !== "Yes" ? (
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    textTransform: "none",
                    paddingX: "20px",
                  }}
                >
                  Approve and Apply GA
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
                  onClick={statusRejectHandler}
                  disabled={!rejectText}
                  size="small"
                  variant="contained"
                  sx={{
                    paddingX: "30px",
                    textTransform: "none",
                  }}
                >
                  Reject
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default InreviewAction;
