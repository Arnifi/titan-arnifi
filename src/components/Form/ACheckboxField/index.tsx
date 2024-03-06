import { Box, FormControlLabel, Checkbox, Typography } from "@mui/material";
import React from "react";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Field, FieldProps } from "formik";
import theme from "@/theme";

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
          // const fieldValue =
          //   typeof field.value === "boolean" ? field.value : false;

          // if (customIcon === true) {
          //   return (
          //     <FormControlLabel
          //       control={
          //         <Checkbox
          //           {...field}
          //           name={name}
          //           icon={<AddCircleOutline />}
          //           checkedIcon={
          //             <RemoveCircleOutline
          //               sx={{ color: theme.colorConstants.crossRed }}
          //             />
          //           }
          //           onChange={field.onChange}
          //         />
          //       }
          //       label={
          //         <Typography
          //           // color={
          //           //   fieldValue ? theme.colorConstants.crossRed : "primary"
          //           // }
          //           variant="h5"
          //         >
          //           {/* {fieldValue ?? fieldValue
          //             ? `Remove ${label}`
          //             : `Add ${label}`} */}
          //         </Typography>
          //       }
          //     />
          //   );
          // } else {
          //   return (
          //     <FormControlLabel
          //       control={
          //         <Checkbox {...field} name={name} onChange={field.onChange} />
          //       }
          //       label={
          //         <Typography color="primary" variant="h5">
          //           {label}
          //         </Typography>
          //       }
          //     />
          //   );
          // }

          return (
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
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
