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
import * as Yup from "yup";
import { FormikValues } from "formik";
import { IFormStep } from "@/app/api/form-steps/formStep.model";
import {
  useCreateNewFormStepMutation,
  useUpdateFormStepMutation,
} from "@/lib/Redux/features/formStep/formStepApi";
import { useAppDispatch } from "@/lib/Redux/store";
import { openSnackbar } from "@/lib/Redux/features/snackbar/snackbarSlice";

interface IFormStepDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  values?: IFormStep;
  legalID: string;
}

const FormStepDrawer: React.FC<IFormStepDrawerProps> = ({
  open,
  setOpen,
  legalID,
  values,
}) => {
  const [createNewFormStep, { isLoading: createLoading }] =
    useCreateNewFormStepMutation();
  const [updateFormStep, { isLoading: updateLoading }] =
    useUpdateFormStepMutation();

  const dispatch = useAppDispatch();

  const validationSchema: Yup.Schema<FormikValues> = Yup.object().shape({
    label: Yup.string().required("Label is required"),
  });

  const initialValues = {
    legalDocument: legalID,
    label: values?.label || "",
    heading: values?.heading || "",
    description: values?.description || "",
  };

  const handleSubmit = async (formValues: FormikValues) => {
    try {
      if (values?.id) {
        await updateFormStep({
          id: values?.id,
          data: { ...formValues },
        })
          .unwrap()
          .then((res) => {
            dispatch(
              openSnackbar({
                isOpen: true,
                message: res?.message || "Form Step updated successfully",
                type: res?.success ? "success" : "error",
              })
            );
            setOpen(false);
          });
      } else {
        await createNewFormStep(formValues)
          .unwrap()
          .then((res) => {
            dispatch(
              openSnackbar({
                isOpen: true,
                message: res?.message || "Form Step Create successfully",
                type: res?.success ? "success" : "error",
              })
            );
            setOpen(false);
          });
      }
    } catch (error) {
      dispatch(
        openSnackbar({
          isOpen: true,
          message: "Something went wrong",
          type: "error",
        })
      );
    }
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
            {values?.id ? "Update Form Step Info" : "Create New Form Step"}
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
            <Box paddingTop={2}>
              <FormInputField
                name="label"
                label="Step Label"
                placeholder="Enter Step Label"
                required
              />
            </Box>

            <Box paddingTop={2}>
              <FormInputField
                name="heading"
                label="Step Heading"
                placeholder="Enter Step Heading"
              />
            </Box>

            <Box paddingTop={2}>
              <FormInputField
                name="description"
                label="Step description"
                placeholder="Enter Step description"
              />
            </Box>

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

export default FormStepDrawer;
