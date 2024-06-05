import {
  CompanyStatusType,
  CompanyStepTypes,
  ICompanyStatus,
} from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
import { IVisaApplication } from "@/lib/Redux/features/visaApplication/visaApplicationSlice";
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
  loading: boolean;
  statusHandlar: (data: any) => void;
  approve: {
    step: string;
    status: string;
  };
  reject: {
    step: string;
    status: string;
  };
}

const IsPaymentVerified: React.FC<IProps> = ({
  loading,
  statusHandlar,
  approve,
  reject,
}) => {
  const [isVerified, setIsVerified] = useState<string>("Yes");
  const [rejectText, setRejectText] = useState<string>("");

  const handleStatusChange = () => {
    // const data: Partial<ICompanyStatus> = {
    //   currentStatus: CompanyStatusType.RESOLUTIONSIGNED,
    //   currentStep: CompanyStepTypes.RESOLUTIONSIGNED,
    //   message:
    //     "Your application is being processed by government Authority. As a part of process, they have shared a Resolution agreement on email on registered shareholders and authorised dignitaries. Please get those signed asap so as to move your application ahead",
    // };

    const data = {
      currentStatus: approve?.status,
      currentStep: approve?.step,
      message:
        "Your application is being processed by government Authority. As a part of process, they have shared a Resolution agreement on email on registered shareholders and authorised dignitaries. Please get those signed asap so as to move your application ahead",
    };

    statusHandlar(data);
  };

  const rejectHandler = () => {
    const data = {
      currentStatus: reject.status,
      currentStep: reject.step,
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
          fontSize: "18px",
          fontWeight: 600,
          color: theme.colorConstants?.darkGray,
        }}
      >
        Waiting for Payment Verification on GA Response
      </Typography>

      <Box marginTop={"10px"}>
        <Typography
          variant="body1"
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            color: theme.colorConstants.mediumGray,
          }}
        >
          GA Payment Verified and <br /> Approved Application?
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
          <GlobalButton
            title="Process to Next"
            loading={loading}
            onClick={handleStatusChange}
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

          <Box>
            <GlobalButton
              disabled={loading || !rejectText}
              loading={loading}
              title="Reject GA"
              onClick={rejectHandler}
              color="error"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default IsPaymentVerified;
