import { Box, Typography } from "@mui/material";
import React from "react";

const Dashboard = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={"70vh"}
    >
      <Typography variant="h2" sx={{ color: "black" }}>
        Overview Page
      </Typography>
    </Box>
  );
};

export default Dashboard;
