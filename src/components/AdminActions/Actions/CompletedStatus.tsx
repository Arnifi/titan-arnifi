import theme from "@/theme";
import { Box, Typography } from "@mui/material";
import React from "react";

interface IProps {
  message: string;
  title: string;
}

const CompletedStatus: React.FC<IProps> = ({ message, title }) => {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 600,
          color: theme.colorConstants?.mediumGray,
        }}
      >
        {title}
      </Typography>

      <Box sx={{ marginTop: "10px" }}>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            color: theme.colorConstants?.mediumGray,
          }}
        >
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default CompletedStatus;
