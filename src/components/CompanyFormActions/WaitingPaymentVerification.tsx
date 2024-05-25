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
}
const WaitingPaymentVerification: React.FC<IProps> = ({
  statusHandlar,
  isLoading,
}) => {
  const [isVerified, setIsVerified] = useState<string>("Yes");
  const [rejectText, setRejectText] = useState<string>("");

  const handleStatusChange = () => {
    const data: Partial<ICompanyStatus> = {
      currentStatus: CompanyStatusType.RESOLUTIONSIGNED,
      currentStep: CompanyStepTypes.RESOLUTIONSIGNED,
      message:
        "Your application is being processed by government Authority. As a part of process, they have shared a Resolution agreement on email on registered shareholders and authorised dignitaries. Please get those signed asap so as to move your application ahead",
    };

    statusHandlar(data);
  };

  const rejectHandler = () => {
    const data: Partial<ICompanyStatus> = {
      currentStatus: CompanyStatusType.REJECTEDGA,
      currentStep: CompanyStepTypes.REJECTEDGA,
      message: `Your application has been sent back by government Authority due to ${rejectText}. In the comments field, please add the details as per the comments received.`,
      commentsFormGA: rejectText,
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
          Waiting for Payment Verification on GA Response
        </Typography>

        <Box>
          <Typography
            variant="body1"
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: theme.colorConstants.mediumGray,
            }}
          >
            GA Payment Verified?
          </Typography>

          <RadioGroup
            row
            value={isVerified}
            onChange={(e) => {
              setIsVerified(e?.target?.value);
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

        {isVerified === "Yes" ? (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={handleStatusChange}
              disabled={isLoading}
              variant="contained"
              size="small"
              sx={{
                textTransform: "none",
                paddingX: "20px",
              }}
            >
              {isLoading ? "Loading..." : "Process to Next"}
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
                textTransform: "none",
                paddingX: "30px",
              }}
            >
              {isLoading ? "Loading..." : "Reject GA"}
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default WaitingPaymentVerification;
