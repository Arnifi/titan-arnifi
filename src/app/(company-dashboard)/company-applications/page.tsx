"use client";

import CompanyFormsTable from "@/components/Tables/CompanyFormsTable";
import theme from "@/theme";
import { Search } from "@mui/icons-material";
import {
  Box,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const CompanyApplications: React.FC = () => {
  const options = [
    "Option - 1",
    "Option - 2",
    "Option - 3",
    "Option - 4",
    "Option - 5",
  ];
  return (
    <Box>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "26px",
          color: theme.colorConstants.darkBlue,
        }}
      >
        Company Applications
      </Typography>

      <Box marginTop={"50px"} marginBottom={"20px"}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "400",
              color: theme.colorConstants.mediumGray,
            }}
          >
            Current Step
          </Typography>

          <Select
            sx={{
              marginX: "20px",
              width: "250px",
              height: "40px",
              color: theme.colorConstants.darkGray,
              fontSize: "14",
              fontWeight: 500,
              textTransform: "capitalize",
            }}
            displayEmpty
            renderValue={() => {
              return "Option - 1";
            }}
            inputProps={{ "aria-label": "Without label" }}
            // onChange={field.onChange}
            // onBlur={field.onBlur}
            // error={meta.touched && Boolean(meta.error)}
            MenuProps={{ disableScrollLock: true }}
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

          <TextField
            type={"text"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">{<Search />}</InputAdornment>
              ),
            }}
            sx={{
              width: "300px",
              fontSize: "14px",
              fontWeight: 500,
              "& .MuiOutlinedInput-root": {
                height: "40px",
              },
            }}
            variant="outlined"
            placeholder={"Search by Company Name"}
          />
        </Box>
      </Box>

      <Box
        sx={{
          marginBottom: "50px",
        }}
      >
        <CompanyFormsTable />
      </Box>
    </Box>
  );
};

export default CompanyApplications;
