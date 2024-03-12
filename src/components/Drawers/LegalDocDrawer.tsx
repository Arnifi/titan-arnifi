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
import FormTextArea from "@/components/Form/ATextArea";
import { FormikValues } from "formik";
import * as Yup from "yup";
import FormCountrySelectField from "@/components/Form/ACountrySelectField";
import {
  ILegalDocument,
  documentsTypes,
} from "@/app/api/legal-documents/legalDocument.model";
import {
  useCreateNewDocumentMutation,
  useUpdateDocumentMutation,
} from "@/lib/Redux/features/legalDocument/legalDocumentApi";
import { openSnackbar } from "@/lib/Redux/features/snackbar/snackbarSlice";
import { useAppDispatch } from "@/lib/Redux/store";

interface ILegalDocDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  values?: ILegalDocument;
}

const LegalDocDrawer: React.FC<ILegalDocDrawerProps> = ({
  open,
  setOpen,
  values,
}) => {
  const [createNewDocument, { isLoading: createLoading }] =
    useCreateNewDocumentMutation();

  const [updateDocument, { isLoading: updateLoading }] =
    useUpdateDocumentMutation();

  const dispatch = useAppDispatch();

  const validationSchema: Yup.Schema<FormikValues> = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    type: Yup.string().required("Type is required"),
    country: Yup.string().required("Country is required"),
    metaData: Yup.string().required("Description is required"),
  });

  const initialValues = {
    title: values?.title || "",
    type: values?.type || "",
    country: values?.country || "",
    metaData: values?.metaData || "",
  };

  const handleSubmit = async (formValues: FormikValues) => {
    try {
      if (values?.id) {
        await updateDocument({ id: values?.id, data: formValues })
          .unwrap()
          .then((res) => {
            dispatch(
              openSnackbar({
                isOpen: true,
                message: res?.message || "Document updated successfully",
                type: res?.success ? "success" : "error",
              })
            );
            setOpen(false);
          });
      } else {
        await createNewDocument(formValues)
          .unwrap()
          .then((res) => {
            dispatch(
              openSnackbar({
                isOpen: true,
                message: res?.message || "Document Create successfully",
                type: res?.success ? "success" : "error",
              })
            );
            setOpen(false);
          });
      }
    } catch (error) {
      console.error(error);
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
            {values?.id
              ? "Update Legal Document Info"
              : "Create New Legal Document"}
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
                name="title"
                label="Legal Document Title"
                placeholder="Enter legal title"
                required
              />
            </Box>

            <Box paddingTop={2}>
              <FormCountrySelectField
                name="country"
                label="Select Country"
                placeholder="Select Country"
                required
              />
            </Box>

            <Box paddingTop={2}>
              <FormSelectField
                name="type"
                label="Legal Document Type"
                placeholder="Select Type"
                options={documentsTypes}
                required
              />
            </Box>

            <Box paddingTop={2}>
              <FormTextArea
                name="metaData"
                label="Description"
                placeholder="Type Description..."
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

export default LegalDocDrawer;
