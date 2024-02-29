import { Box, Autocomplete, TextField, MenuItem } from "@mui/material";
import React from "react";
import "react-phone-number-input/style.css";
import { getCountries } from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en";

interface ISelectCountryProps {
  value: string;
  setFn: React.Dispatch<React.SetStateAction<string>>;
}

const CountrySelect: React.FC<ISelectCountryProps> = ({ value, setFn }) => {
  const countryesOptions: string[] = Array.from(
    new Set(getCountries()?.map((country) => en[country]))
  );
  countryesOptions.unshift("All Countries");

  return (
    <Box width="100%">
      <Autocomplete
        sx={{ width: "100%" }}
        options={countryesOptions}
        renderOption={(props, option) => (
          <MenuItem {...props}>{option}</MenuItem>
        )}
        value={value}
        disableClearable
        onChange={(_, value) => {
          setFn(value);
        }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              variant="outlined"
              inputProps={{
                ...params.inputProps,
                "aria-label": "Without label",
              }}
            />
          );
        }}
      />
    </Box>
  );
};

export default CountrySelect;
