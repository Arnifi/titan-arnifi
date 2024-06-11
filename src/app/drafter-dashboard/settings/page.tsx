import { Box, Typography } from "@mui/material";
import React from "react";

const Setting = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={"70vh"}
    >
      <Typography variant="h2" sx={{ color: "black" }}>
        Setting Page
      </Typography>
    </Box>
  );
};

export default Setting;
