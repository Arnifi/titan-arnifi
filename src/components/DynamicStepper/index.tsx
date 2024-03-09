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
import ReviewContent from "./ReviewContent";
import { ILegalDocument } from "@/app/api/legal-documents/legalDocument.model";
import generateTemplate from "@/utils/client/generateTemplate";
import prientAsPDF from "@/utils/client/prientPDF";

const DynamicStepper = ({ data }: { data: ILegalDocument }) => {
  const [pdfLoading, setPdfLoading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(() => {
    const storedData = localStorage.getItem("form-step");
    return storedData ? JSON.parse(storedData) : 0;
  });

  const formSteps = data?.steps as IFormStep[];

  const [storedFormData] = useState<FormikValues>(() => {
    const storedData = localStorage.getItem("form-data");
    return storedData !== null && storedData !== undefined
      ? JSON.parse(storedData)
      : {};
  });

  const handleSubmit = async (formValues: FormikValues) => {
    if (activeStep === formSteps?.length) {
      setPdfLoading(true);
      const template = generateTemplate(data as ILegalDocument, formValues);
      await prientAsPDF(template, data?.title + ".pdf", setPdfLoading);
    } else {
      setActiveStep(activeStep + 1);
      localStorage.setItem("form-step", JSON.stringify(activeStep + 1));
    }
  };

  return (
    <Paper sx={{ padding: "50px", bgcolor: "#EEEDEB", marginY: "50px" }}>
      <Box>
        <Stepper activeStep={activeStep} alternativeLabel>
          {formSteps?.map((step: IFormStep) => (
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
              {formSteps[activeStep]?.heading}
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
              {formSteps[activeStep]?.description}
            </Typography>
          </Box>

          <FormProvaider
            initialValues={storedFormData}
            submitHandlar={handleSubmit}
          >
            <Box>
              {activeStep === formSteps?.length ? (
                <ReviewContent data={formSteps as IFormStep[]} />
              ) : (
                <StepContent data={formSteps[activeStep]} />
              )}
            </Box>

            <Box marginTop={"20px"}>
              <Stack direction={"row"} spacing={2} justifyContent={"flex-end"}>
                <Button
                  sx={{ textTransform: "none" }}
                  disabled={activeStep === 0}
                  onClick={() => {
                    setActiveStep(activeStep - 1);
                    localStorage.setItem(
                      "form-step",
                      JSON.stringify(activeStep - 1)
                    );
                  }}
                  variant="contained"
                >
                  Preview
                </Button>

                <Button
                  sx={{ textTransform: "none" }}
                  color={activeStep === formSteps?.length ? "error" : "primary"}
                  type="submit"
                  variant="contained"
                >
                  {activeStep === formSteps?.length
                    ? pdfLoading
                      ? "Please Wait"
                      : "Prient PDF"
                    : "Next"}
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
