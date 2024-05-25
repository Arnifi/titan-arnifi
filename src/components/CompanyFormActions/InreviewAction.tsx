import {
  CompanyStatusType,
  CompanyStepTypes,
  ICompanyStatus,
} from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
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

interface IProps {
  isLoading: boolean;
  statusHandlar: (updateStatus: Partial<ICompanyStatus>) => void;
  agentComment: string;
}

const InreviewAction: React.FC<IProps> = ({
  isLoading,
  statusHandlar,
  agentComment,
}) => {
  const [isReject, setIsReject] = useState("No");
  const [rejectText, setRejectText] = useState<string>("");

  const rejectHandler = () => {
    const data: Partial<ICompanyStatus> = {
      currentStatus: CompanyStatusType.REJECTEDARNIFI,
      currentStep: CompanyStepTypes.REJECTEDARNIFI,
      message: `Your application has been rejected by Arnifi agent due to ${rejectText}. Resubmit the application form.
      `,
      agentComment: rejectText,
    };
    statusHandlar(data);
  };

  const approveHandler = () => {
    const data: Partial<ICompanyStatus> = {
      currentStep: CompanyStepTypes?.APPLYGA,
    };

    statusHandlar(data);
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
          {agentComment !== ""
            ? "Resubmitted Application"
            : "Please review the application"}
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
                  disabled={isLoading}
                  onClick={approveHandler}
                  variant="contained"
                  size="small"
                  sx={{
                    textTransform: "none",
                    paddingX: "20px",
                  }}
                >
                  {isLoading ? "Loading..." : "Approve and Apply GA"}
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
                  onClick={rejectHandler}
                  disabled={!rejectText || isLoading}
                  size="small"
                  variant="contained"
                  sx={{
                    paddingX: "30px",
                    textTransform: "none",
                  }}
                >
                  {isLoading ? "Loading..." : "Reject"}
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
