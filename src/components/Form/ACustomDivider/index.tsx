import { Box, Typography } from "@mui/material";
import React from "react";
import theme from "../../../../../Theme";

interface DividerProps {
  text: string;
  icon?: React.ReactElement;
}

const CustomDivider: React.FC<DividerProps> = ({ text, icon }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {icon ?? icon}

      <Typography
        variant="body2"
        sx={{
          pr: 2,
          fontSize: "14px",
          fontWeight: 700,
          textTransform: "uppercase",
          color: theme.colorConstants.black,
        }}
      >
        {text}
      </Typography>
      <Box sx={{ flexGrow: 1, borderBottom: "1px solid #ccc" }} />
    </Box>
  );
};

export default CustomDivider;
