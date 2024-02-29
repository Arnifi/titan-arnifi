import {
  Box,
  MenuItem,
  Select,
  Typography,
  FormControl,
  FormHelperText,
  Grid,
  Card,
} from "@mui/material";
import { HighlightOff } from "@mui/icons-material";
import { Field, FieldProps, FormikProps } from "formik";
import React from "react";
import theme from "@/Theme";

export interface IChipSelectOptions {
  name: string;
  code: string | number;
}

interface ISelect {
  name: string;
  placeholder?: string;
  label?: string;
  options: IChipSelectOptions[];
}

const FormChipSelectField: React.FC<ISelect> = ({
  name,
  placeholder,
  label,
  options,
}) => {
  const ContentCard: React.FC<{
    data: IChipSelectOptions;
    fieldValue: IChipSelectOptions[];
    form: FormikProps<ISetupFormValues>;
  }> = ({ data, fieldValue, form }) => {
    const removeHandelar = (): void => {
      const remainValues = fieldValue.filter((item) => item.name !== data.name);
      void form.setFieldValue(name, remainValues);
    };

    return (
      <Card
        variant="outlined"
        sx={{
          margin: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: {
            xs: "12px 20px",
            border: "none",
          },

          borderRadius: "5px",
          textTransform: "capitalize",
          background: "rgba(57, 85, 217, 0.08)",
        }}
      >
        <Typography
          color={theme.palette.secondary.main}
          variant="h5"
          sx={{
            fontSize: {
              xs: "12px",
              md: "16px",
            },
          }}
        >
          {data.name}
        </Typography>

        <HighlightOff
          onClick={removeHandelar}
          sx={{
            marginLeft: "10px",
            cursor: "pointer",
            "&:hover": {
              color: "red",
              transition: "color 200ms",
            },
          }}
        />
      </Card>
    );
  };

  const addHandlar = (
    selectValue: IChipSelectOptions,
    fieldValue: IChipSelectOptions[],
    form: FormikProps<ISetupFormValues>
  ): void => {
    if (!fieldValue.some((option) => option.name === selectValue.name)) {
      const updatedValue = [...fieldValue, selectValue];
      void form.setFieldValue(name, updatedValue);
    }
  };

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
          const fieldValue: IChipSelectOptions[] = Array.isArray(field.value)
            ? field.value
            : [];

          const renderValue =
            fieldValue?.length > 0 && fieldValue[fieldValue.length - 1].name;

          return (
            <Grid container spacing={{ xs: 1, md: 2 }}>
              <Grid item xs={12} sm={12} md={8}>
                <FormControl
                  sx={{
                    width: "100%",
                  }}
                >
                  <Select
                    value={fieldValue?.length > 0 ? renderValue : ""}
                    sx={{
                      width: "100%",
                      height: "45px",
                      color: theme.colorConstants.darkGray,
                      fontSize: "14px",
                      fontWeight: 500,
                      ".MuiOutlinedInput-notchedOutline": {
                        border: "none",
                        boxShadow:
                          "0px 2px 4px 0px rgba(96, 97, 112, 0.16), 0px 0px 1px 0px rgba(40, 41, 61, 0.04)",
                      },
                    }}
                    name={name}
                    displayEmpty
                    renderValue={() => {
                      if (fieldValue?.length > 0) {
                        return renderValue;
                      }
                      return placeholder;
                    }}
                    inputProps={{
                      "aria-label": "Without label",
                    }}
                    onChange={(e) => {
                      const selectName = e.target.value;

                      const selectedValue = options.find(
                        (item) => item.name === selectName
                      ) as IChipSelectOptions;

                      addHandlar(selectedValue, fieldValue, form);
                    }}
                    error={meta.touched && Boolean(meta.error)}
                  >
                    {options?.map((item, i) => (
                      <MenuItem
                        key={i}
                        value={item.name}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          color={theme.palette.secondary.main}
                        >
                          {item.name}
                        </Typography>

                        <Typography
                          variant="subtitle1"
                          color={theme.palette.secondary.main}
                        >
                          {item.code}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>

                  <FormHelperText error>
                    {meta.touched && meta.error}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                {fieldValue?.length > 0 && (
                  <Box display={"flex"} flexWrap={"wrap"}>
                    {fieldValue.map((item, i) => (
                      <ContentCard
                        data={item}
                        fieldValue={fieldValue}
                        form={form}
                        key={i}
                      />
                    ))}
                  </Box>
                )}
              </Grid>
            </Grid>
          );
        }}
      </Field>
    </Box>
  );
};

export default FormChipSelectField;
