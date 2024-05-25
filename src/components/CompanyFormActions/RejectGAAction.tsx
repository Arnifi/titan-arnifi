import {
  CompanyStepTypes,
  ICompanyStatus,
} from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
import theme from "@/theme";
import {
  Box,
  Button,
  Card,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

interface IProps {
  message: string;
  userComment: string;
  isLoading: boolean;
  statusHandlar: (updateStatus: Partial<ICompanyStatus>) => void;
}

const RejectGAAction: React.FC<IProps> = ({
  message,
  userComment,
  isLoading,
  statusHandlar,
}) => {
  const [isSendEmail, setIsSendEmail] = useState<string>("No");
  const [emailText, setEmailText] = useState<string>("");
  const [isUpdateGA, setUpdateGA] = useState<string>("No");

  const handleSubmit = (): void => {
    console.log("values");
  };

  const handleNext = () => {
    const data: Partial<ICompanyStatus> = {
      currentStep: CompanyStepTypes.WAITINGUPDATEREJECTION,
    };
    statusHandlar(data);
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
            fontSize: "18px",
            fontWeight: 600,
            color: theme.colorConstants?.darkGray,
          }}
        >
          Application Reject form GA
        </Typography>

        <Typography
          gutterBottom
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: theme.colorConstants?.mediumGray,
          }}
        >
          Please wait while the client respond back.
        </Typography>

        <Box>
          <Typography
            variant="body1"
            sx={{
              fontSize: "12px",
              color: theme.colorConstants?.mediumGray,
            }}
          >
            Rejection comments (by GA)
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

        <Box>
          <Typography
            variant="body1"
            sx={{
              fontSize: "12px",
              color: theme.colorConstants?.mediumGray,
            }}
          >
            Rejection comments (by User)
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
              {userComment}
            </Typography>
          </Card>
        </Box>

        {!userComment ? (
          <Box
            sx={{ marginTop: "10px", display: "flex", alignItems: "center" }}
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
        ) : (
          <Box
            sx={{
              marginTop: "10px",
              display: "flex",
              alignItems: "left",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                color: theme.colorConstants?.mediumGray,
                marginRight: "16px",
              }}
            >
              Have you uploaded the client comments on Government portal?
            </Typography>

            <RadioGroup
              row
              value={isUpdateGA}
              onChange={(e) => {
                setUpdateGA(e?.target?.value);
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
        )}

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

        {isUpdateGA === "Yes" && (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={handleNext}
              disabled={isLoading}
              size="small"
              variant="contained"
              sx={{
                textTransform: "none",
                paddingX: "30px",
              }}
            >
              {isLoading ? "Loading..." : "Next step"}
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default RejectGAAction;
