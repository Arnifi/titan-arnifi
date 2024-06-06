import {
  CompanyStatusType,
  CompanyStepTypes,
  ICompanyStatus,
} from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
import { IVisaApplication } from "@/lib/Redux/features/visaApplication/visaApplicationSlice";
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
  userComment: string;
  loading: boolean;
  statusHandlar: (
    updateStatus: Partial<ICompanyStatus | IVisaApplication>
  ) => void;
}

const WaitGARejection: React.FC<IProps> = ({
  message,
  userComment,
  loading,
  statusHandlar,
}) => {
  const [isApproveGA, setIsApproveGA] = useState<string>("No");
  const [rejectText, setRejectText] = useState<string>("");

  const handleNext = () => {
    const data: Partial<ICompanyStatus> = {
      currentStatus: CompanyStatusType.RESOLUTIONSIGNED,
      currentStep: CompanyStepTypes.RESOLUTIONSIGNED,
      message:
        "Your application is being processed by government Authority. As a part of process, they have shared a Resolution agreement on email on registered shareholders and authorised dignitaries. Please get those signed asap so as to move your application ahead",
    };
    statusHandlar(data);
  };

  const handleReject = () => {
    const data: Partial<ICompanyStatus> = {
      currentStatus: CompanyStatusType.REJECTEDGA,
      currentStep: CompanyStepTypes.REJECTEDGA,
      userComment: "",
      message: `Your application has been sent back by government Authority due to ${rejectText}. In the comments field, please add the details as per the comments received.`,
      commentsFormGA: rejectText,
    };
    statusHandlar(data);
  };
  return (
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

      <Box sx={{ marginTop: "10px", display: "flex", flexDirection: "column" }}>
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
          <GlobalButton
            disabled={loading}
            title="Approve and Next"
            onClick={handleNext}
            loading={loading}
          />
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

          <GlobalButton
            title="Reject form GA"
            color="error"
            disabled={loading || !rejectText}
            onClick={handleReject}
            loading={loading}
          />
        </Box>
      )}
    </Box>
  );
};

export default WaitGARejection;
