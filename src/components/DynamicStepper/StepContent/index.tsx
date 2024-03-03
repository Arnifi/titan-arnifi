"use client";
import {
  BlockType,
  IFieldsBlock,
} from "@/app/api/fields-blocks/fieldsBlock.model";
import { IFormStep } from "@/app/api/form-steps/formStep.model";
import { Box, Divider, Paper } from "@mui/material";
import React, { useEffect } from "react";
import SingleContent from "./SingleContent";
import MultipleContent from "./MultipleContent";
import { useFormikContext } from "formik";

const StepContent = ({ data }: { data: IFormStep }) => {
  const { values } = useFormikContext();

  useEffect(() => {
    localStorage.setItem("form-data", JSON.stringify(values));
  }, [values]);

  return (
    <Paper variant="outlined" sx={{ padding: "30px" }}>
      <Box>
        {data?.blocks?.map((block, i) => {
          const { isShow, label, type } = block as IFieldsBlock;
          if (type === BlockType.SINGLE) {
            return (
              <Box key={i}>
                {isShow && (
                  <Divider sx={{ marginY: "20px" }} textAlign="left">
                    {label}
                  </Divider>
                )}
                <SingleContent
                  step={data?.label}
                  data={block as IFieldsBlock}
                />
              </Box>
            );
          } else if (type === BlockType.MULTIPLE) {
            return (
              <Box key={i}>
                <MultipleContent
                  step={data?.label}
                  data={block as IFieldsBlock}
                />
              </Box>
            );
          }
        })}
      </Box>
    </Paper>
  );
};

export default StepContent;
