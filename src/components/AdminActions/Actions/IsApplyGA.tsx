import {
  CompanyStatusType,
  CompanyStepTypes,
  ICompanyStatus,
} from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
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
import { IVisaApplication } from "@/lib/Redux/features/visaApplication/visaApplicationSlice";

interface IProps {
  loading: boolean;
  statusHandlar: (data: Partial<ICompanyStatus | IVisaApplication>) => void;
}

const IsApplyGA: React.FC<IProps> = ({ loading, statusHandlar }) => {
  const [isApprove, setIsApprove] = useState<string>("Yes");
  const [rejectText, setRejectText] = useState<string>("");

  const rejectHandler = () => {
    const data: Partial<ICompanyStatus> = {
      currentStatus: CompanyStatusType.REJECTEDARNIFI,
      currentStep: CompanyStepTypes.REJECTEDARNIFI,
      message: `Your application has been rejected by Arnifi agent due to ${rejectText}. Resubmit the application form.`,
    };
    statusHandlar(data);
  };

  const makePaymentHandler = () => {
    const data: Partial<ICompanyStatus> = {
      currentStatus: CompanyStatusType.INREVIEWARNIFI,
      currentStep: CompanyStepTypes?.MAKEPAYMENT,
    };

    statusHandlar(data);
  };

  return (
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
            fontSize: "12px",
            fontWeight: 500,
            color: theme.colorConstants?.mediumGray,
            marginRight: "16px",
          }}
        >
          Application Approve for government?
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
          <GlobalButton
            title="Make Payment and Next"
            onClick={makePaymentHandler}
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
            title="Reject by Agent"
            onClick={rejectHandler}
            loading={loading}
            color="error"
          />
        </Box>
      )}
    </Box>
  );
};

export default IsApplyGA;
