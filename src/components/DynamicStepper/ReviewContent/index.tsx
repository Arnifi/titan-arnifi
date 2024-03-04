"use client";

import {
  BlockType,
  IFieldsBlock,
} from "@/app/api/fields-blocks/fieldsBlock.model";
import { IFieldType, IFormField } from "@/app/api/form-fields/formField.model";
import { IFormStep } from "@/app/api/form-steps/formStep.model";
import theme from "@/theme";
import { Box, Card, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FormikValues, useFormikContext } from "formik";
import React from "react";

const ReviewContent = ({ data }: { data: IFormStep[] }) => {
  const { values }: { values: FormikValues } = useFormikContext();

  return (
    <Paper variant="outlined" sx={{ padding: "30px" }}>
      <Box>
        <Typography
          variant="h5"
          sx={{ color: theme.colorConstants.darkBlue, fontSize: "20px" }}
        >
          Review
        </Typography>
      </Box>

      {data.map((step: IFormStep, i: number) => (
        <Card key={i} sx={{ padding: "30px", marginTop: "20px" }}>
          <Typography gutterBottom variant="h4">
            {step.label}
          </Typography>

          {step?.blocks?.map((block, i) => {
            const { isShow, label, type, fields } = block as IFieldsBlock;
            return type === BlockType.SINGLE ? (
              <Box key={i}>
                <Box sx={{ marginY: "16px" }}>
                  {isShow && (
                    <Typography variant="h5" sx={{ color: "black" }}>
                      {label}
                    </Typography>
                  )}
                </Box>
                {fields?.map((field, i) => {
                  const { label } = field as IFormField;
                  return (
                    <Box display="flex" key={i}>
                      <Typography
                        sx={{
                          color: theme.colorConstants.lightPurple,
                          width: "200px",
                        }}
                      >
                        {label}:
                      </Typography>
                      <Typography sx={{ color: "black", fontWeight: 600 }}>
                        {values[step?.label][label]}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            ) : (
              <Box key={i}>
                {values[step?.label]?.map((fieldValue: any, i: number) => {
                  return (
                    <Box key={i}>
                      <Box
                        sx={{
                          width: "30px",
                          height: "30px",
                          backgroundColor: "#E0E0E0",
                          color: "white",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "50%",
                          marginTop: "16px",
                        }}
                      >
                        <Typography variant="h4" sx={{ color: "black" }}>
                          {i + 1}
                        </Typography>
                      </Box>

                      <Box>
                        {fields?.map((field, i) => {
                          const { label, type } = field as IFormField;
                          return (
                            <Box display="flex" key={i}>
                              <Typography
                                sx={{
                                  color: theme.colorConstants.lightPurple,
                                  width: "200px",
                                }}
                              >
                                {label}:
                              </Typography>
                              <Typography
                                sx={{ color: "black", fontWeight: 600 }}
                              >
                                {type === IFieldType.DATE
                                  ? dayjs(fieldValue[label]).format(
                                      "DD/MM/YYYY"
                                    )
                                  : fieldValue[label]}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </Card>
      ))}
    </Paper>
  );
};

export default ReviewContent;
