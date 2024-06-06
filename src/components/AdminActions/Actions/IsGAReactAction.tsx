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
  statusHandlar: (updateStatus: any) => void;
  approve: {
    step: string;
    status: string;
  };
}

const IsGAReactAction: React.FC<IProps> = ({
  message,
  userComment,
  loading,
  statusHandlar,
  approve,
}) => {
  const [isUpdateOnPortal, setIsUpdateOnPortal] = useState<string>("No");

  const handleNext = () => {
    const data = {
      currentStatus: approve?.status,
      currentStep: approve?.step,
    };
    statusHandlar(data);
  };

  return (
    <Box
      display="flex"
      justifyContent={"space-between"}
      flexDirection={"column"}
      height={"100%"}
    >
      <Box>
        <Typography
          gutterBottom
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            color: theme.colorConstants?.mediumGray,
          }}
        >
          Waiting for client to respond on the comments
        </Typography>

        <Box>
          <Typography
            variant="body1"
            sx={{
              marginLeft: "10px",
              fontSize: "12px",
              color: theme.colorConstants?.mediumGray,
            }}
          >
            Rejection reason
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
              marginLeft: "10px",
              fontSize: "12px",
              color: theme.colorConstants?.mediumGray,
            }}
          >
            Client&apos;s Comment
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
              {/* {message} */}
              Client comment
            </Typography>
          </Card>
        </Box>
        {/* 
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
      )} */}

        {/* {isUpdateGA === "Yes" && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <GlobalButton
            title="Next step"
            onClick={handleNext}
            loading={loading}
          />
        </Box>
      )} */}
      </Box>

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
            Have you uploaded the comments on portal?
          </Typography>

          <RadioGroup
            row
            value={isUpdateOnPortal}
            onChange={(e) => {
              setIsUpdateOnPortal(e?.target?.value);
            }}
          >
            {["Yes", "No"].map((item) => (
              <FormControlLabel
                // disabled={isPaymentSuccess === "Yes"}
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

        <Box display={"flex"} justifyContent={"end"}>
          <GlobalButton
            title="Move to next step"
            loading={loading}
            onClick={handleNext}
            disabled={isUpdateOnPortal === "No"}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default IsGAReactAction;
