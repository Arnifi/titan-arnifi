import theme from "@/theme";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import GlobalButton from "../Buttons/GlobalButton";
import {
  CompanyStatusType,
  CompanyStepTypes,
} from "@/lib/Redux/features/companyApplication/companyApplicationSlice";

interface IProps {
  formStatus: string;
  createHandler: (data: any) => void;
  loading: boolean;
}
const StatusNotFound: React.FC<IProps> = ({
  formStatus,
  createHandler,
  loading,
}) => {
  const [isCreated, setIsCreated] = useState("No");

  const statusCreateHandelar = () => {
    const data = {
      currentStatus: CompanyStatusType.ReviewAtArnifi,
      currentStep: CompanyStepTypes.ReviewAtArnifi,
      message:
        "Your company form is submitted. The application will be reviewed by Arnifi and then will be sent to government Authority for next steps",
    };

    if (formStatus === "done") {
      createHandler(data);
    } else {
      createHandler(null);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "",
      }}
    >
      <Box>
        <Typography
          gutterBottom
          sx={{
            fontSize: "20px",
            fontWeight: 600,
            color: theme.colorConstants?.darkGray,
          }}
        >
          Application Status Not Found!
        </Typography>

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
            Do you want to create a status flow?
          </Typography>

          <RadioGroup
            row
            value={isCreated}
            onChange={(e) => {
              setIsCreated(e?.target?.value);
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
      </Box>

      <Box
        sx={{
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <GlobalButton
          disabled={isCreated === "No"}
          loading={loading}
          onClick={statusCreateHandelar}
          title="Create Status"
        />
      </Box>
    </Box>
  );
};

export default StatusNotFound;
