import {
  CompanyStatusType,
  CompanyStepTypes,
  ICompanyStatus,
} from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
import { IVisaApplicationStatus } from "@/lib/Redux/features/visaApplication/visaApplicationSlice";
import theme from "@/theme";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import GlobalButton from "../Buttons/GlobalButton";

interface IProps {
  agentComment: string;
  loading: boolean;
  statusHandlar: (
    updateStatus: Partial<ICompanyStatus | IVisaApplicationStatus>
  ) => void;
}

const InreviewAction: React.FC<IProps> = ({
  loading,
  statusHandlar,
  agentComment,
}) => {
  const [isReject, setIsReject] = useState("No");
  const [rejectText, setRejectText] = useState<string>("");

  const rejectHandler = () => {
    const data: Partial<ICompanyStatus | IVisaApplicationStatus> = {
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
    <Box>
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
          Please review the application
        </Typography>

        <Typography
          sx={{
            fontSize: "16px",
            marginY: "10px",
            fontWeight: 500,
            color: theme.colorConstants?.mediumGray,
          }}
        >
          Below are the important points to check
        </Typography>

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
            <GlobalButton
              title="Approve and Apply GA"
              onClick={approveHandler}
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
              color="error"
              title="Reject"
              onClick={rejectHandler}
              loading={loading}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default InreviewAction;
