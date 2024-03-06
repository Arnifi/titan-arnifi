"use client";

import { openSnackbar } from "@/lib/Redux/features/snackbar/snackbarSlice";
import { useAppDispatch } from "@/lib/Redux/store";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={"70vh"}
    >
      <Button
        onClick={() =>
          dispatch(
            openSnackbar({
              isOpen: true,
              message: "its testing purpose",
              type: "error",
            })
          )
        }
      >
        open snackbar
      </Button>
      <Typography variant="h2" sx={{ color: "black" }}>
        Overview Page
      </Typography>
    </Box>
  );
};

export default Dashboard;
