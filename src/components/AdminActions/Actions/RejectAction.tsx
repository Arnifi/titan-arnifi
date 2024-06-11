import theme from "@/theme";
import { Box, Card, Typography } from "@mui/material";
import React from "react";

interface IProps {
  message: string;
}

const RejectAction: React.FC<IProps> = ({ message }) => {
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
        Application Reject by Arnifi Agent
      </Typography>

      <Box>
        <Typography
          variant="body1"
          sx={{
            fontSize: "12px",
            color: theme.colorConstants?.mediumGray,
          }}
        >
          Rejection comments
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

      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 600,
          color: theme.colorConstants?.mediumGray,
        }}
      >
        Wait for the user to resubmit the form.
      </Typography>
    </Box>
  );
};

export default RejectAction;
