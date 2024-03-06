import {
  Box,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Field, FieldProps } from "formik";
import React from "react";
import theme from "@/theme";

interface IRadio {
  options: string[];
  name: string;
  label?: string | boolean;
}

const FormRadioField: React.FC<IRadio> = ({ name, label, options }) => {
  return (
    <Box>
      <Typography
        variant="body1"
        sx={{
          color: theme.colorConstants.lightPurple,
          fontWeight: 500,
          marginBottom: "10px",
        }}
      >
        {label ?? label}
      </Typography>

      <Field name={name}>
        {({ field, meta }: FieldProps<string>) => (
          <>
            <RadioGroup
              style={{ minHeight: "45px" }}
              row
              {...field}
              onChange={field.onChange}
            >
              {options.map((item) => (
                <FormControlLabel
                  key={item}
                  value={item}
                  control={<Radio />}
                  label={
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: theme.colorConstants.darkGray,
                      }}
                    >
                      {item}
                    </Typography>
                  }
                />
              ))}
            </RadioGroup>
            <FormHelperText error>{meta.touched && meta.error}</FormHelperText>
          </>
        )}
      </Field>
    </Box>
  );
};

export default FormRadioField;
