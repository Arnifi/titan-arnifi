"use client";

import { ILegalDocument } from "@/app/api/legal-documents/legalDocument.model";
import { ITemplate } from "@/app/api/templates/templates.model";
import GlobalError from "@/components/Errors/GlobalError";
import FormProvaider from "@/components/Form";
import GlobalLoader from "@/components/Loaders/GlobalLoader";
import ArnifiRichEditor from "@/components/TemplateEditor";
import { useGetLegalDocumentQuery } from "@/lib/Redux/features/legalDocument/legalDocumentApi";
import { openSnackbar } from "@/lib/Redux/features/snackbar/snackbarSlice";
import {
  useCreateNewTemplateMutation,
  useUpdateTemplateMutation,
} from "@/lib/Redux/features/template/templateApi";
import { useAppDispatch } from "@/lib/Redux/store";
import theme from "@/theme";
import { KeyboardReturn } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FormikValues } from "formik";
import { useRouter } from "next/navigation";
import React from "react";

const LegalTemplate = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useGetLegalDocumentQuery({
    id: params.id,
  });

  const [createNewTemplate, { isLoading: createLoading }] =
    useCreateNewTemplateMutation();

  const [updateTemplate, { isLoading: updateLoading }] =
    useUpdateTemplateMutation();

  if (isLoading) {
    return <GlobalLoader height={"70vh"} />;
  }

  if (!data?.success || isError) {
    return (
      <GlobalError
        height={"70vh"}
        message={data?.message || "Something went wrong"}
      />
    );
  }

  const {
    id: documentID,
    title,
    type,
    country,
    template,
  } = data?.data as ILegalDocument;
  const { id: templateID, htmlTemp } = template as ITemplate;

  const handleSubmit = async (formValues: FormikValues) => {
    try {
      if (templateID) {
        await updateTemplate({
          id: templateID,
          data: formValues,
        })
          .unwrap()
          .then((res) => {
            dispatch(
              openSnackbar({
                isOpen: true,
                message: res?.message,
                type: res.success ? "success" : "error",
              })
            );
          });
      } else {
        await createNewTemplate({ ...formValues, document: documentID })
          .unwrap()
          .then((res) => {
            dispatch(
              openSnackbar({
                isOpen: true,
                message: res?.message,
                type: res.success ? "success" : "error",
              })
            );
          });
      }
    } catch (error) {
      dispatch(
        openSnackbar({
          isOpen: true,
          message: "Something went wrong.",
          type: "error",
        })
      );
    }
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          borderBottom: `1px solid ${theme.colorConstants.primaryDarkBlue}`,
        }}
      >
        <Box>
          <Typography
            sx={{
              color: theme.colorConstants.primaryDarkBlue,
              textTransform: "capitalize",
            }}
            variant="h3"
          >
            <strong>{title}</strong>
          </Typography>

          <Box
            display="flex"
            sx={{
              marginBottom: "20px",
            }}
          >
            <Typography
              sx={{
                marginRight: "20px",
                textTransform: "capitalize",
                color: theme.colorConstants.primaryDarkBlue,
              }}
              variant="h5"
            >
              Country: <strong>{country}</strong>
            </Typography>
            <Typography
              sx={{
                textTransform: "capitalize",
                color: theme.colorConstants.primaryDarkBlue,
              }}
              variant="h5"
            >
              Type: <strong>{type}</strong>
            </Typography>
          </Box>
        </Box>

        <Stack
          sx={{
            marginY: "20px",
          }}
          direction="row"
          spacing={2}
          justifyContent="flex-end"
        >
          <Button
            onClick={() => router.back()}
            startIcon={<KeyboardReturn />}
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Return to Legal Documents
          </Button>
        </Stack>
      </Box>

      <FormProvaider
        initialValues={{ htmlTemp: htmlTemp || "" }}
        submitHandlar={handleSubmit}
      >
        <Box sx={{ padding: "50px", minHeight: "70vh", bgcolor: "#f5f5f5" }}>
          <ArnifiRichEditor document={data?.data as ILegalDocument} />
        </Box>

        <Stack
          sx={{
            marginY: "20px",
          }}
          direction="row"
          spacing={2}
          justifyContent="flex-end"
        >
          <Button
            type="submit"
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            {templateID
              ? updateLoading
                ? "Updating..."
                : "Update Template"
              : createLoading
              ? "Creating..."
              : "Create Template"}
          </Button>
        </Stack>
      </FormProvaider>
    </Box>
  );
};

export default LegalTemplate;
