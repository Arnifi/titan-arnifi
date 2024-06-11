import theme from "@/theme";
import { Box, Typography } from "@mui/material";
import React from "react";

const IsFormOpen = () => {
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
        The client is yet to submit the form.
      </Typography>
    </Box>
  );
};

export default IsFormOpen;
