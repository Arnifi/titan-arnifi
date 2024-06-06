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
  statusHandlar: (updateStatus: any) => void;
  approve: {
    step: string;
    status: string;
  };
  reject: {
    step: string;
    status: string;
  };
}

const IsWaitingForUpdateFormGA: React.FC<IProps> = ({
  loading,
  statusHandlar,
  approve,
  reject,
}) => {
  const [isApplicationReject, setIsApplicationReject] = useState<string>("");
  const [isEsigning, setIsEsigning] = useState<string>("");
  const [rejectText, setRejectText] = useState<string>("");
  const [moveToReject, setMoveToReject] = useState<boolean>(false);

  const approveHandler = () => {
    const data = {
      currentStep: approve.step,
      currentStatus: approve.status,
    };
    statusHandlar(data);
  };

  const rejectHandler = () => {
    const data = {
      currentStatus: reject.status,
      currentStep: reject.step,
      message: `Your application has been rejected by Arnifi agent due to '${rejectText}'. Resubmit the application form.
      `,
      agentComment: rejectText,
    };
    statusHandlar(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box>
        <Box>
          <Typography
            variant="body1"
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: theme.colorConstants.mediumGray,
            }}
          >
            Have the application been sent back by the government?
          </Typography>

          <RadioGroup
            row
            value={isApplicationReject}
            onChange={(e) => {
              setIsApplicationReject(e?.target?.value);
            }}
          >
            {["Yes", "No"].map((item) => (
              <FormControlLabel
                // disabled={isApplicationReject !== ""}
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

        {isApplicationReject === "No" && (
          <Box marginTop={"10px"}>
            <Typography
              variant="body1"
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: theme.colorConstants.mediumGray,
              }}
            >
              Have the company Resolution been sent back the Government for
              Esigning?
            </Typography>

            <RadioGroup
              row
              value={isEsigning}
              onChange={(e) => {
                setIsEsigning(e?.target?.value);
              }}
            >
              {["Yes", "No"].map((item) => (
                <FormControlLabel
                  // disabled={isEsigning !== ""}
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
      </Box>

      {moveToReject ? (
        <Box width={"100%"}>
          <Typography
            gutterBottom
            variant="body1"
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: theme.colorConstants.mediumGray,
              marginLeft: "10px",
            }}
          >
            Add the rejection reason
          </Typography>

          <textarea
            style={{ width: "100%", padding: "5px", fontFamily: "Inter" }}
            rows={4}
            placeholder="Write reason for reject"
            onChange={(e) => setRejectText(e.target.value)}
            value={rejectText}
          ></textarea>

          <Box display={"flex"} justifyContent={"end"}>
            <GlobalButton
              loading={loading}
              disabled={!rejectText}
              title="Reject"
              color="error"
              onClick={rejectHandler}
            />
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          {isApplicationReject === "Yes" ? (
            <GlobalButton
              color="error"
              loading={false}
              title="Move to Reject"
              onClick={() => setMoveToReject(true)}
            />
          ) : (
            <GlobalButton
              loading={loading}
              disabled={loading || isEsigning !== "Yes"}
              title="Move to Next Step"
              onClick={approveHandler}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default IsWaitingForUpdateFormGA;
