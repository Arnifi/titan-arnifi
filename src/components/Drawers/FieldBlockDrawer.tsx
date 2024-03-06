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
import { FormikValues } from "formik";
import FormCheckboxField from "@/components/Form/ACheckboxField";
import { IFieldsBlock } from "@/app/api/fields-blocks/fieldsBlock.model";
import {
  useCreateFieldsBlockMutation,
  useUpdateFieldsBlockMutation,
} from "@/lib/Redux/features/fieldsBlock/fieldsBlockApi";
import { openSnackbar } from "@/lib/Redux/features/snackbar/snackbarSlice";
import { useAppDispatch } from "@/lib/Redux/store";

interface IFieldBlockDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  values?: IFieldsBlock;
  stepID: string;
}

const FieldBlockDrawer: React.FC<IFieldBlockDrawerProps> = ({
  open,
  setOpen,
  stepID,
  values,
}) => {
  const dispatch = useAppDispatch();
  const [createFieldsBlock, { isLoading: createLoading }] =
    useCreateFieldsBlockMutation();

  const [updateFieldsBlock, { isLoading: updateLoading }] =
    useUpdateFieldsBlockMutation();

  const validationSchema: Yup.Schema<FormikValues> = Yup.object().shape({
    type: Yup.string().required("Type is required"),
    label: Yup.string().required("Label is required"),
  });

  const initialValues = {
    step: stepID,
    label: values?.label || "",
    type: values?.type || "",
    isShow: values?.isShow || false,
    description: values?.description || "",
  };

  const handleSubmit = async (formValues: FormikValues) => {
    try {
      if (values?.id) {
        await updateFieldsBlock({ id: values?.id, data: formValues })
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
        await createFieldsBlock(formValues)
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
            {values?.id
              ? "Update Fields Block Info"
              : "Create New Fields Block"}
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
            <Box>
              <Box paddingTop={2}>
                <FormSelectField
                  name="type"
                  label="Select Fields Block Type"
                  placeholder="Select"
                  options={["Single", "Multiple"]}
                  required
                />
              </Box>

              <Box paddingTop={2}>
                <FormInputField
                  name="label"
                  label="Fields Block Label"
                  placeholder="Enter Block Label"
                  required
                />
              </Box>

              <Box paddingTop={2}>
                <FormCheckboxField name="isShow" label="Is Show" />
              </Box>
              <Box paddingTop={2}>
                <FormInputField
                  name="description"
                  label="Fields Block description"
                  placeholder="Enter Block description"
                />
              </Box>
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

export default FieldBlockDrawer;
