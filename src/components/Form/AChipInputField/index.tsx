import theme from "@/theme";
import { Box, Button, Chip, Stack, TextField, Typography } from "@mui/material";
import { Field, FieldProps } from "formik";
import React, { useState } from "react";

interface IFormChipInputField {
  name: string;
  placeholder?: string;
  label?: string;
}
const FormChipInputField: React.FC<IFormChipInputField> = ({
  placeholder,
  label,
  name,
}) => {
  const [chip, setChip] = useState<string>("");

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
        {({ field, form }: FieldProps) => (
          <Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <TextField
                onChange={(e) => setChip(e.target.value)}
                value={chip}
                type={"text"}
                sx={{
                  width: "100%",
                  fontSize: "14px",
                }}
                variant="outlined"
                placeholder={placeholder}
              />

              <Button
                disabled={!chip}
                onClick={() => {
                  if (chip) {
                    const newOptions = [...field.value, chip];
                    setChip("");
                    form.setFieldValue(name, newOptions);
                  }
                }}
                variant="contained"
                sx={{
                  height: "50px",
                  width: "50px",
                }}
              >
                Add
              </Button>
            </Box>
            <Box>
              <Stack direction="row" flexWrap="wrap">
                {field.value.map((chip: string, i: number) => (
                  <Chip
                    sx={{ margin: "5px" }}
                    key={i}
                    label={chip}
                    onDelete={() => {
                      const remainOptions = field.value.filter(
                        (option: string) => option !== chip
                      );
                      void form.setFieldValue(name, remainOptions);
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </Box>
        )}
      </Field>
    </Box>
  );
};

export default FormChipInputField;
