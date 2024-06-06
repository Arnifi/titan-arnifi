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
}

const IsApplyGA: React.FC<IProps> = ({ loading, statusHandlar, approve }) => {
  const [isApprove, setIsApprove] = useState<string>("No");

  const makePaymentHandler = () => {
    const data = {
      currentStatus: approve?.status,
      currentStep: approve?.step,
    };

    statusHandlar(data);
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "left",
          flexDirection: "column",
        }}
      >
        <Typography
          gutterBottom
          sx={{
            fontSize: "20px",
            fontWeight: 600,
            color: theme.colorConstants?.darkGray,
          }}
        >
          Have you applied on the portal?
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

      <Box>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <GlobalButton
            disabled={isApprove === "No"}
            title="Move to next step"
            onClick={makePaymentHandler}
            loading={loading}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default IsApplyGA;
