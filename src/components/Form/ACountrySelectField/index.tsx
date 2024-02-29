import theme from "@/Theme";
import {
  Autocomplete,
  Box,
  FormHelperText,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Field, FieldProps } from "formik";
import React from "react";
import { getCountries } from "react-phone-number-input";
import en from "react-phone-number-input/locale/en";

interface ICountrySelect {
  name: string;
  icon?: React.ReactNode;
  placeholder?: string;
  label?: string;
  required: boolean;
}

const countryesOptions: string[] = Array.from(
  new Set(getCountries()?.map((countryCode) => en[countryCode]))
);

const FormCountrySelectField: React.FC<ICountrySelect> = ({ name, label }) => {
  return (
    <Box>
      <Typography
        variant="body1"
        marginBottom={"10px"}
        sx={{
          color: theme.colorConstants.lightPurple,
          fontWeight: 500,
          width: "200px",
        }}
      >
        {label ?? label}
      </Typography>

      <Field name={name}>
        {({ field, meta, form }: FieldProps) => {
          return (
            <>
              <Autocomplete
                sx={{ width: "100%" }}
                options={countryesOptions}
                renderOption={(props, option) => (
                  <MenuItem {...props}>{option}</MenuItem>
                )}
                value={field.value}
                disableClearable
                onChange={(_, value) => {
                  void form.setFieldValue(name, value);
                }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      placeholder={"Select Country"}
                      variant="outlined"
                      inputProps={{
                        ...params.inputProps,
                        "aria-label": "Without label",
                      }}
                    />
                  );
                }}
              />
              <FormHelperText error>
                {meta.touched && meta.error}
              </FormHelperText>
            </>
          );
        }}
      </Field>
    </Box>
  );
};

export default FormCountrySelectField;
