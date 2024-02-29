import theme from "@/theme";
import { ErrorOutline } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";

const GlobalError = ({ message }: { message?: string }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="40vh"
      flexDirection="column"
    >
      <ErrorOutline color="error" sx={{ fontSize: "50px" }} />

      <Typography
        variant="h4"
        sx={{ color: theme.colorConstants.crossRed, padding: "16px" }}
      >
        {message ?? "Something went wrong!"}
      </Typography>
    </Box>
  );
};

export default GlobalError;
