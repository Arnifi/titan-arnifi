import { IFieldsBlock } from "@/app/api/fields-blocks/fieldsBlock.model";
import { IFieldType, IFormField } from "@/app/api/form-fields/formField.model";
import FormCheckboxField from "@/components/Form/ACheckboxField";
import FormCountrySelectField from "@/components/Form/ACountrySelectField";
import FormDateField from "@/components/Form/ADateField";
import FormInputField from "@/components/Form/AInputField";
import FormRadioField from "@/components/Form/ARadioField";
import FormSelectField from "@/components/Form/ASelectField";
import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const MultipleContent = ({
  data,
  step,
}: {
  data: IFieldsBlock;
  step: string;
}) => {
  const [storedData] = useState(() => {
    const storedData = localStorage.getItem("form-data");
    return storedData ? JSON.parse(storedData) : {};
  });
  const [stepStoreData, setStepStoredData] = useState(storedData[step] || []);

  const removeHandelar = (index: number) => {
    const remain = stepStoreData?.filter((_: any, i: number) => i !== index);
    setStepStoredData(remain);
    localStorage.setItem(
      "form-data",
      JSON.stringify({ ...storedData, [step]: remain })
    );
  };

  return (
    <Box>
      <Paper sx={{ padding: "30px" }} variant="outlined">
        {Array.from({ length: stepStoreData?.length || 1 }).map((_, index) => (
          <Box key={index} marginBottom={"30px"}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h5">
                {data?.label} - {index + 1}
              </Typography>

              {index > 0 && (
                <IconButton
                  onClick={() => removeHandelar(index)}
                  size="small"
                  color="error"
                >
                  <Delete />
                </IconButton>
              )}
            </Box>
            <Divider sx={{ marginY: "10px" }} />

            <Box>
              <Grid container spacing={2}>
                {data?.fields?.map((field, i) => {
                  const {
                    label,
                    type,
                    placeholder,
                    options,
                    isRequired,
                    isCountriesOption,
                    width,
                  } = field as IFormField;
                  return (
                    <Grid item xs={width} key={i}>
                      {type === IFieldType.TEXT ||
                      type === IFieldType.EMAIL ||
                      type === IFieldType.NUMBER ? (
                        <FormInputField
                          name={`${step}.${index}.${label}`}
                          label={label}
                          placeholder={placeholder}
                          required={isRequired}
                        />
                      ) : type === IFieldType.SELECT && !isCountriesOption ? (
                        <FormSelectField
                          name={`${step}.${index}.${label}`}
                          label={label}
                          placeholder={placeholder}
                          required={isRequired}
                          options={options as string[]}
                        />
                      ) : type === IFieldType.SELECT && isCountriesOption ? (
                        <FormCountrySelectField
                          name={`${step}.${index}.${label}`}
                          label={label}
                          required={isRequired}
                          placeholder={placeholder}
                        />
                      ) : type === IFieldType.CHECKBOX ? (
                        <FormCheckboxField name={label} label={label} />
                      ) : type === IFieldType.RADIO ? (
                        <FormRadioField
                          name={`${step}.${index}.${label}`}
                          label={label}
                          options={options as string[]}
                        />
                      ) : type === IFieldType.DATE ? (
                        <FormDateField
                          name={`${step}.${index}.${label}`}
                          label={label}
                          required={isRequired}
                        />
                      ) : null}
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Box>
        ))}
      </Paper>

      <Stack marginY={2} justifyContent={"flex-end"} direction={"row"}>
        <Button
          onClick={() => {
            setStepStoredData([...stepStoreData, {}]);
          }}
          sx={{ textTransform: "capitalize" }}
          variant="contained"
          size={"small"}
        >
          Add New {data?.label}
        </Button>
      </Stack>
    </Box>
  );
};

export default MultipleContent;
