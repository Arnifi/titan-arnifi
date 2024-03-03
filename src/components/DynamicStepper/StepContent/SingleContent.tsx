import { IFieldsBlock } from "@/app/api/fields-blocks/fieldsBlock.model";
import { IFieldType, IFormField } from "@/app/api/form-fields/formField.model";
import FormCheckboxField from "@/components/Form/ACheckboxField";
import FormCountrySelectField from "@/components/Form/ACountrySelectField";
import FormInputField from "@/components/Form/AInputField";
import FormRadioField from "@/components/Form/ARadioField";
import FormSelectField from "@/components/Form/ASelectField";
import { Box, Grid } from "@mui/material";
import React from "react";

const SingleContent = ({
  data,
  step,
}: {
  data: IFieldsBlock;
  step: string;
}) => {
  return (
    <Box>
      <Grid container spacing={2}>
        {data?.fields?.map((field, i) => {
          const {
            label,
            type,
            placeholder,
            options,
            isRequired,
            isCountriesOption,
            width,
          } = field as IFormField;
          return (
            <Grid item xs={width} key={i}>
              {type === IFieldType.TEXT ||
              type === IFieldType.EMAIL ||
              type === IFieldType.NUMBER ? (
                <FormInputField
                  name={`${step}.${label}`}
                  label={label}
                  placeholder={placeholder}
                  required={isRequired}
                />
              ) : type === IFieldType.SELECT && !isCountriesOption ? (
                <FormSelectField
                  name={`${step}.${label}`}
                  label={label}
                  placeholder={placeholder}
                  required={isRequired}
                  options={options as string[]}
                />
              ) : type === IFieldType.SELECT && isCountriesOption ? (
                <FormCountrySelectField
                  name={`${step}.${label}`}
                  label={label}
                  required={isRequired}
                  placeholder={placeholder}
                />
              ) : type === IFieldType.CHECKBOX ? (
                <FormCheckboxField name={`${step}.${label}`} label={label} />
              ) : type === IFieldType.RADIO ? (
                <FormRadioField
                  name={`${step}.${label}`}
                  label={label}
                  options={options as string[]}
                />
              ) : null}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default SingleContent;
