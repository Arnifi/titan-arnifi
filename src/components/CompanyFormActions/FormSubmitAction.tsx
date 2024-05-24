import theme from "@/theme";
import { Box, Button, Paper, Typography } from "@mui/material";
import { FormikValues } from "formik";
import React from "react";

const FormSubmitAction = () => {
  const statusChangeHandler = (values: FormikValues): void => {
    console.log("values", values);
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        marginTop: "20px",
        padding: "20px",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: theme.colorConstants?.mediumGray,
          }}
        >
          User Company Form Submit Successfully!
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            onClick={statusChangeHandler}
            variant="contained"
            size="small"
            sx={{
              marginTop: "10px",
              textTransform: "none",
            }}
          >
            Move to Inreview
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default FormSubmitAction;
