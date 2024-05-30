import {
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

const IsGAReactAction: React.FC<IProps> = ({
  message,
  userComment,
  loading,
  statusHandlar,
}) => {
  const [isSendEmail, setIsSendEmail] = useState<string>("No");
  const [emailText, setEmailText] = useState<string>("");
  const [isUpdateGA, setUpdateGA] = useState<string>("No");

  const handleNext = () => {
    const data: Partial<ICompanyStatus> = {
      currentStep: CompanyStepTypes.WAITINGUPDATEREJECTION,
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

      {userComment && (
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
      )}

      {!userComment ? (
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

          <GlobalButton
            color="error"
            title="Send Email"
            onClick={() => {}}
            loading={loading}
          />
        </Box>
      )}

      {isUpdateGA === "Yes" && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <GlobalButton
            title="Next step"
            onClick={handleNext}
            loading={loading}
          />
        </Box>
      )}
    </Box>
  );
};

export default IsGAReactAction;
