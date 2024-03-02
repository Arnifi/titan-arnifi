import { Box, FormControlLabel, Checkbox, Typography } from "@mui/material";
import React from "react";
import { Field, FieldProps } from "formik";

interface IRadio {
  name: string;
  customIcon?: boolean;
  selected?: boolean;
  label: string;
}

const FormCheckboxField: React.FC<IRadio> = ({ name, label, customIcon }) => {
  return (
    <Box>
      <Field name={name}>
        {({ field, form }: FieldProps<string>) => {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  checked={Boolean(field.value)}
                  name={name}
                  onChange={(e) => {
                    void form.setFieldValue(name, e.target.checked);
                  }}
                />
              }
              label={
                <Typography color="primary" variant="h5">
                  {label}
                </Typography>
              }
            />
          );
        }}
      </Field>
    </Box>
  );
};

export default FormCheckboxField;
