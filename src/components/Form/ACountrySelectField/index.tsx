import theme from "@/theme";
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

const FormCountrySelectField: React.FC<ICountrySelect> = ({
  name,
  label,
  placeholder,
}) => {
  const countryesOptions: Array<{ title: string; flagURL: string }> =
    getCountries()?.map((countryCode) => {
      return {
        title: en[countryCode],
        flagURL: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`,
      };
    });

  return (
    <Box maxWidth={"500px"}>
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
          const defaultValue = countryesOptions?.find(
            (option) => option.title === field.value
          );
          return (
            <>
              <Autocomplete
                aria-required
                sx={{ width: "100%" }}
                options={countryesOptions}
                getOptionLabel={(option) => option.title}
                renderOption={(props, option) => (
                  <MenuItem {...props}>
                    <Box display="flex">
                      <Box
                        sx={{
                          height: "18px",
                          width: "24px",
                        }}
                        component={"img"}
                        src={option.flagURL}
                      />
                      <Typography
                        sx={{
                          marginLeft: "5px",
                          fontSize: "16px",
                          color: theme.colorConstants.mediumGray,
                        }}
                        variant="body1"
                      >
                        {option?.title}
                      </Typography>
                    </Box>
                  </MenuItem>
                )}
                value={defaultValue}
                disableClearable
                onChange={(_, value) => {
                  const selectedCountry: string = value.title;
                  void form.setFieldValue(name, selectedCountry);
                }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      placeholder={placeholder}
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
