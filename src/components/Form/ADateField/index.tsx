import { Box, Typography } from "@mui/material";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Field, FieldProps } from "formik";
import dayjs from "dayjs";
import theme from "@/Theme";

interface IDate {
  name: string;
  label?: string;
  required?: boolean;
}

const FormDateField: React.FC<IDate> = ({ name, label, required }) => {
  return (
    <Box maxWidth={"480px"}>
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

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Field name={name}>
          {({ field, meta, form }: FieldProps) => {
            return (
              <DatePicker
                value={dayjs(field.value as Date)}
                views={["day", "month", "year"]}
                format="DD/MM/YYYY"
                sx={{
                  width: "100%",
                  fontSize: "14px",
                  fontWeight: 500,

                  "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                    height: "45px",
                    padding: "0px 0px 0px 15px",
                  },
                }}
                onChange={(date) => {
                  void form.setFieldValue(name, date);
                }}
                slotProps={{
                  textField: {
                    helperText: meta.touched && meta.error,
                    error: meta.touched && Boolean(meta.error),
                  },
                }}
              />
            );
          }}
        </Field>
      </LocalizationProvider>
    </Box>
  );
};

export default FormDateField;
