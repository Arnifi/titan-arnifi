import {
  Box,
  Autocomplete,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";
import "react-phone-number-input/style.css";
import { getCountries } from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en";
import theme from "@/theme";

interface ISelectCountryProps {
  value: string;
  setFn: React.Dispatch<React.SetStateAction<string>>;
}

const CountrySelect: React.FC<ISelectCountryProps> = ({ value, setFn }) => {
  const countryesOptions: Array<{ title: string; flagURL: string }> =
    getCountries()?.map((countryCode) => {
      return {
        title: en[countryCode],
        flagURL: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`,
      };
    });

  countryesOptions.unshift({
    title: "All Countries",
    flagURL: "",
  });

  const selectedCountry = countryesOptions.find(
    (country) => country.title === value
  );

  return (
    <Box width="100%">
      <Autocomplete
        sx={{ width: "100%" }}
        options={countryesOptions}
        getOptionLabel={(option) => option.title}
        renderOption={(props, option) => (
          <MenuItem {...props}>
            <Box display={"flex"} alignItems={"center"}>
              {option.flagURL ? (
                <Box
                  component={"img"}
                  src={option.flagURL}
                  sx={{ width: "24px", height: "18px" }}
                />
              ) : null}

              <Typography
                sx={{
                  marginLeft: "5px",
                  color: theme.colorConstants.mediumGray,
                  fontSize: "14px",
                }}
              >
                {option.title}
              </Typography>
            </Box>
          </MenuItem>
        )}
        value={selectedCountry}
        disableClearable
        onChange={(_, value) => {
          setFn(value.title);
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
