import {
  Box,
  MenuItem,
  Select,
  Typography,
  Autocomplete,
  TextField,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { Field, FieldProps } from "formik";
import React from "react";
import theme from "@/theme";

interface ISelect {
  name: string;
  options: string[];
  placeholder?: string;
  label?: string;
  disableClearable?: boolean;
  searchableField?: boolean;
  required?: boolean;
}

const FormSelectField: React.FC<ISelect> = ({
  name,
  placeholder,
  label,
  options,
  disableClearable,
  searchableField,
  required,
}) => {
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
        {({ field, meta, form }: FieldProps<string>) => {
          const selectedOptions = options.find(
            (option) => option === field.value
          );
          return (
            <>
              {searchableField !== undefined && searchableField !== null ? (
                <Autocomplete
                  value={selectedOptions ?? selectedOptions}
                  disablePortal={disableClearable}
                  disableClearable={disableClearable}
                  options={options}
                  getOptionLabel={(option) => option}
                  sx={{
                    width: "100%",
                  }}
                  onChange={(_, value) => {
                    void form.setFieldValue(field.name, value ?? value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      sx={{
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                      {...params}
                      name={name}
                      value={field.value}
                      variant="outlined"
                      inputProps={{
                        ...params.inputProps,
                        "aria-label": "Without label",
                      }}
                      placeholder={placeholder}
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                />
              ) : (
                <FormControl
                  sx={{
                    width: "100%",
                  }}
                >
                  <Select
                    required={required}
                    sx={{
                      width: "100%",
                      color: theme.colorConstants.darkGray,
                      fontSize: "14",
                      fontWeight: 500,
                      textTransform: "capitalize",
                    }}
                    {...field}
                    name={name}
                    value={field.value}
                    displayEmpty
                    renderValue={() => {
                      if (
                        field.value === null ||
                        field.value === undefined ||
                        field.value === ""
                      ) {
                        return placeholder;
                      }
                      return field.value;
                    }}
                    inputProps={{ "aria-label": "Without label" }}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={meta.touched && Boolean(meta.error)}
                  >
                    {options?.map((item) => (
                      <MenuItem
                        sx={{
                          color: theme.colorConstants.darkGray,
                          fontSize: "14px",
                          fontWeight: 500,
                          textTransform: "capitalize",
                        }}
                        key={item}
                        value={item}
                      >
                        {item}
                      </MenuItem>
                    ))}
                  </Select>

                  <FormHelperText error>
                    {meta.touched && meta.error}
                  </FormHelperText>
                </FormControl>
              )}
            </>
          );
        }}
      </Field>
    </Box>
  );
};

export default FormSelectField;
