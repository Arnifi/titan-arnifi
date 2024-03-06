import theme from "@/theme";
import {
  Box,
  InputAdornment,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { Field, FieldProps } from "formik";
import React from "react";

export enum IInputType {
  TEXT = "text",
  NUMBER = "number",
  EMAIL = "email",
}

interface ITexArea {
  name: string;
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  inline?: boolean;
}

const FormTextArea: React.FC<ITexArea> = ({
  name,
  label,
  placeholder,
  icon,
  inline,
}) => {
  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection={{ xs: "column", md: inline ?? false ? "row" : "column" }}
    >
      <Typography
        variant="body1"
        marginBottom={inline ?? false ? "0px" : "10px"}
        paddingY={inline ?? false ? "15px" : "0px"}
        sx={{
          color: theme.colorConstants.lightPurple,
          fontWeight: 500,
          width: "200px",
        }}
      >
        {label}
      </Typography>

      <Field name={name}>
        {({ field, meta }: FieldProps) => (
          <TextareaAutosize
            {...field}
            aria-label={label}
            placeholder={placeholder}
            minRows={4}
            style={{ resize: "none", padding: "10px" }}
          />
        )}
      </Field>
    </Box>
  );
};

export default FormTextArea;
