import { Box, Typography } from "@mui/material";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Field, FieldProps } from "formik";
import theme from "../../../../../Theme";
import dayjs, { Dayjs } from "dayjs";
import { IDateOfBirth } from "../../../interfaces";

interface IDate {
  name: string;
  label?: string;
}

const FormDOBField: React.FC<IDate> = ({ name, label }) => {
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

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Field name={name}>
          {({ field, meta, form }: FieldProps) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const defaultValue: IDateOfBirth = field.value;
            const day = defaultValue.day;
            const month = defaultValue.month;
            const year = defaultValue.year;

            const dateString = new Date(
              parseInt(year),
              parseInt(month) - 1,
              parseInt(day)
            );

            return (
              <DatePicker
                value={dayjs(dateString)}
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
                onChange={(date: Dayjs | null) => {
                  if (date != null) {
                    const day = date.toDate().getDate();
                    const month = date.toDate().getMonth() + 1;
                    const year = date.toDate().getFullYear();
                    void form.setFieldValue(name, {
                      day: String(day),
                      month: String(month),
                      year: String(year),
                    });
                  }
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

export default FormDOBField;
