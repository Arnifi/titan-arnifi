import {
  Box,
  Grid,
  Autocomplete,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import React from "react";
import "react-phone-number-input/style.css";
import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import { Field, FieldProps } from "formik";
import theme from "@/theme";

interface IPhoneNumber {
  name: string;
  label?: string;
  placeholder?: string;
}

const FormPhoneNumberField: React.FC<IPhoneNumber> = ({
  name,
  label,
  placeholder,
}) => {
  const allCountries = getCountries();

  const countryCodes = Array.from(
    new Set(
      allCountries?.map((country) => `+${getCountryCallingCode(country)}`)
    )
  );

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

      <Grid container spacing={1}>
        <Field name={`${name}.countryCode`}>
          {({ field, form }: FieldProps<string>) => (
            <Grid item xs={4}>
              <Autocomplete
                {...field}
                sx={{
                  height: "45px",
                  fontSize: "14px",
                  fontWeight: 500,
                  "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-fullWidth.MuiAutocomplete-inputRoot.css-ghallm-MuiInputBase-root-MuiOutlinedInput-root":
                    {
                      height: "45px",
                      padding: "0px 0px 0px 15px",
                    },
                }}
                options={countryCodes}
                renderOption={(props, option) => (
                  <MenuItem sx={{ fontWeight: 500 }} {...props}>
                    {option}
                  </MenuItem>
                )}
                defaultValue={"+880"}
                disableClearable
                onChange={(_, value) => {
                  void form.setFieldValue(`${name}.countryCode`, value);
                }}
                renderInput={(params) => {
                  return (
                    <TextField
                      sx={{
                        height: "45px",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                      {...params}
                      name={`${name}.countryCode`}
                      variant="outlined"
                      inputProps={{
                        ...params.inputProps,
                        "aria-label": "Without label",
                      }}
                    />
                  );
                }}
              />
            </Grid>
          )}
        </Field>

        <Field name={`${name}.number`}>
          {({ field, meta }: FieldProps<string>) => (
            <Grid item xs={8}>
              <TextField
                {...field}
                name={`${name}.number`}
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                    height: "45px",
                    padding: "0px 0px 0px 15px",
                  },
                }}
                variant="outlined"
                onChange={field.onChange}
                placeholder={placeholder}
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error}
              />
            </Grid>
          )}
        </Field>
      </Grid>
    </Box>
  );
};

export default FormPhoneNumberField;
