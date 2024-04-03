import theme from "@/theme";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import FormProvaider from "@/components/Form";
import FormInputField from "@/components/Form/AInputField";
import FormSelectField from "@/components/Form/ASelectField";
import * as Yup from "yup";
import { FormikValues, useFormikContext } from "formik";
import FormCheckboxField from "@/components/Form/ACheckboxField";
import { openSnackbar } from "@/lib/Redux/features/snackbar/snackbarSlice";
import { useAppDispatch } from "@/lib/Redux/store";
import { IFormField } from "@/app/api/form-fields/formField.model";
import FormChipInputField from "@/components/Form/AChipInputField";
import {
  useCreateFormFieldMutation,
  useUpdateFormFieldMutation,
} from "@/lib/Redux/features/formField/formFieldApi";

interface IFormFieldDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  values?: IFormField;
  blockId: string;
}

const inputTypes = [
  "text",
  "number",
  "email",
  "select",
  "radio",
  "date",
  "checkbox",
  "textarea",
];

const FormFieldDrawer: React.FC<IFormFieldDrawerProps> = ({
  open,
  setOpen,
  blockId,
  values,
}) => {
  const dispatch = useAppDispatch();
  const [createFormField, { isLoading: createLoading }] =
    useCreateFormFieldMutation();

  const [updateFormField, { isLoading: updateLoading }] =
    useUpdateFormFieldMutation();

  const validationSchema: Yup.Schema<FormikValues> = Yup.object().shape({
    type: Yup.string().required("Type is required"),
    label: Yup.string().required("Label is required"),
    placeholder: Yup.string(),
  });

  const initialValues = {
    block: blockId,
    label: values?.label || "",
    type: values?.type || "",
    placeholder: values?.placeholder || "",
    isRequired: values?.isRequired || false,
    isCountriesOption: values?.isCountriesOption || false,
    isSearchable: values?.isSearchable || false,
    errorMessage: values?.errorMessage || "",
    options: values?.options || [],
    width: values?.width || 6,
  };

  const handleSubmit = async (formValues: FormikValues) => {
    try {
      if (values?.id) {
        await updateFormField({
          id: values?.id,
          data: { ...formValues, width: parseInt(formValues.width) },
        })
          .unwrap()
          .then((res) => {
            dispatch(
              openSnackbar({
                isOpen: true,
                message: res.message,
                type: res.success ? "success" : "error",
              })
            );
            setOpen(false);
          });
      } else {
        await createFormField({
          ...formValues,
          width: parseInt(formValues.width),
        })
          .unwrap()
          .then((res) => {
            dispatch(
              openSnackbar({
                isOpen: true,
                message: res.message,
                type: res.success ? "success" : "error",
              })
            );
            setOpen(false);
          });
      }
    } catch (error) {
      dispatch(
        openSnackbar({
          isOpen: true,
          message: "something went wrong",
          type: "error",
        })
      );
    }
  };

  const FieldInputFields: React.FC = () => {
    const { values }: { values: FormikValues } = useFormikContext();
    return (
      <Box>
        <Box paddingTop={2}>
          <FormInputField
            name="label"
            label="Field Label"
            placeholder="Enter Field Label"
            required
          />
        </Box>

        <Box paddingTop={2}>
          <FormSelectField
            name="type"
            label="Select Input Type"
            placeholder="Select Type"
            options={inputTypes}
            required
          />
        </Box>

        {values.type === "select" && (
          <Box>
            <FormCheckboxField
              name="isCountriesOption"
              label="Is Country Options"
            />
          </Box>
        )}

        {(values.type === "select" && !values.isCountriesOption) ||
        values.type === "radio" ? (
          <Box paddingTop={2}>
            <FormChipInputField
              name="options"
              label="Add Field Options"
              placeholder="Enter Option"
            />
          </Box>
        ) : null}

        {values?.type !== "radio" && values?.type !== "date" && (
          <Box paddingTop={2}>
            <FormInputField
              name="placeholder"
              label="Field Placeholder"
              placeholder="Enter Field Placeholder"
              required
            />
          </Box>
        )}

        <Box paddingTop={2}>
          <FormSelectField
            name="width"
            label="Select Field Width"
            placeholder="Select With"
            options={["1", "2", "3", "4", "6", "8", "9", "12"]}
            required
          />
        </Box>

        <Box>
          <FormCheckboxField name="isRequired" label="is Required" />
        </Box>
        {values.isRequired && (
          <Box paddingTop={2}>
            <FormInputField
              name="errorMessage"
              label="Field Error Message"
              placeholder="Enter Error Message"
              required
            />
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{ sx: { width: "500px" } }}
    >
      <Box>
        <Box
          height={"85px"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          padding={2}
          sx={{ bgcolor: theme.colorConstants.backGray }}
        >
          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: 700,
              color: theme.colorConstants.white,
            }}
            variant="h3"
          >
            {values?.id ? "Update Form Field Info" : "Create Form Field"}
          </Typography>
          <IconButton
            onClick={() => setOpen(false)}
            color="error"
            sx={{
              borderRadius: "50%",
              border: "2px solid red",
            }}
          >
            <Close />
          </IconButton>
        </Box>

        <Box padding={5}>
          <FormProvaider
            initialValues={initialValues}
            submitHandlar={handleSubmit}
            validationSchema={validationSchema}
          >
            <FieldInputFields />

            <Stack
              marginTop={2}
              padding={2}
              justifyContent={"center"}
              spacing={2}
              direction="row"
            >
              <Button
                onClick={() => setOpen(false)}
                sx={{
                  textTransform: "none",
                  width: "200px",
                }}
                color="error"
                variant="contained"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                sx={{
                  textTransform: "none",
                  width: "200px",
                }}
                variant="contained"
              >
                {values?.id
                  ? updateLoading
                    ? "Updating..."
                    : "Update"
                  : createLoading
                  ? "Creating..."
                  : "Create +"}
              </Button>
            </Stack>
          </FormProvaider>
        </Box>
      </Box>
    </Drawer>
  );
};

export default FormFieldDrawer;
