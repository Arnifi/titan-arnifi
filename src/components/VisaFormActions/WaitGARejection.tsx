import {
  CompanyStatusType,
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
  statusHandlar: (updateStatus: Partial<ICompanyStatus> | any) => void;
}

const WaitGARejection: React.FC<IProps> = ({
  message,
  userComment,
  isLoading,
  statusHandlar,
}) => {
  const [isApproveGA, setIsApproveGA] = useState<string>("No");
  const [rejectText, setRejectText] = useState<string>("");

  const handleNext = () => {
    const data = {
      currentStatus: CompanyStatusType.ResolutionEsignRequired,
      currentStep: CompanyStepTypes.ResolutionSigning,
      message:
        "Your application is being processed by government Authority. As a part of process, they have shared a Resolution agreement on email on registered shareholders and authorised dignitaries. Please get those signed asap so as to move your application ahead",
    };
    statusHandlar(data);
  };

  const handleReject = () => {
    const data = {
      currentStatus: CompanyStatusType.RejectedByGA,
      currentStep: CompanyStepTypes.RejectedByGA,
      message: `Your application has been sent back by government Authority due to ${rejectText}. In the comments field, please add the details as per the comments received.`,
      commentsFormGA: rejectText,
    };
    statusHandlar(data);
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        marginY: "20px",
        padding: "20px",
      }}
    >
      <Box>
        <Typography
          gutterBottom
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: theme.colorConstants?.mediumGray,
          }}
        >
          Application is awaiting update from government authority.
        </Typography>

        <Typography
          gutterBottom
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: theme.colorConstants?.mediumGray,
          }}
        >
          Please check on the registered email id or portal for update.
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
            The company application approved form GA?
          </Typography>

          <RadioGroup
            row
            value={isApproveGA}
            onChange={(e) => {
              setIsApproveGA(e?.target?.value);
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

        {isApproveGA === "Yes" ? (
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
              {isLoading ? "Loading..." : "Approve and Next"}
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
              onClick={handleReject}
              disabled={!rejectText}
              size="small"
              variant="contained"
              sx={{
                textTransform: "none",
                paddingX: "20px",
              }}
            >
              {isLoading ? "Loading..." : "Reject form GA"}
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default WaitGARejection;
