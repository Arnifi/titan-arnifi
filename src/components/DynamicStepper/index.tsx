"use client";
import { IFormStep } from "@/app/api/form-steps/formStep.model";
import {
  Box,
  Button,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FormProvaider from "../Form";
import { FormikValues } from "formik";
import theme from "@/theme";
import StepContent from "./StepContent";

const DynamicStepper = ({ data }: { data: IFormStep[] }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [storedFormData] = useState<FormikValues>(() => {
    const storedData = localStorage.getItem("form-data");
    return storedData ? JSON.parse(storedData) : {};
  });
  const handleSubmit = (formValues: FormikValues) => {
    if (activeStep === data?.length) {
      console.log(formValues, "formValues");
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <Paper sx={{ padding: "50px", bgcolor: "#EEEDEB", marginY: "50px" }}>
      <Box>
        <Stepper activeStep={activeStep} alternativeLabel>
          {data.map((step: IFormStep) => (
            <Step key={step.id}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}

          <Step key={"review-step"}>
            <StepLabel>{"Review and Submit"}</StepLabel>
          </Step>
        </Stepper>

        <Box marginY={"50px"}>
          <Box>
            <Typography
              gutterBottom
              sx={{
                fontWeight: 500,
                fontSize: "24px",
                color: theme.colorConstants.darkBlue,
              }}
              variant="h3"
            >
              {data[activeStep]?.heading}
            </Typography>
            <Typography
              gutterBottom
              sx={{
                color: theme.colorConstants.darkBlue,
                fontSize: "18px",
                maxWidth: "1000px",
              }}
              variant="body1"
            >
              {data[activeStep]?.description}
            </Typography>
          </Box>

          <FormProvaider
            initialValues={storedFormData}
            submitHandlar={handleSubmit}
          >
            <Box>
              <StepContent data={data[activeStep]} />
            </Box>

            <Box marginTop={"20px"}>
              <Stack direction={"row"} spacing={2} justifyContent={"flex-end"}>
                <Button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep(activeStep - 1)}
                  variant="contained"
                >
                  Preview
                </Button>
                <Button type="submit" variant="contained">
                  Next
                </Button>
              </Stack>
            </Box>
          </FormProvaider>
        </Box>
      </Box>
    </Paper>
  );
};

export default DynamicStepper;
