"use client";
import { IFieldsBlock } from "@/app/api/fields-blocks/fieldsBlock.model";
import { IFormField } from "@/app/api/form-fields/formField.model";
import { IFormStep } from "@/app/api/form-steps/formStep.model";
import { ILegalDocument } from "@/app/api/legal-documents/legalDocument.model";
import FormFieldDrawer from "@/components/Drawers/FormFieldDrawer";
import GlobalError from "@/components/Errors/GlobalError";
import GlobalLoader from "@/components/Loaders/GlobalLoader";
import FormFieldTable from "@/components/Tables/FormFieldTable";
import { useGetFieldsBlockQuery } from "@/lib/Redux/features/fieldsBlock/fieldsBlockApi";
import theme from "@/theme";
import { East, KeyboardReturn } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const FormFields = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const { data, isLoading, isError } = useGetFieldsBlockQuery({
    id: params.id,
  });

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

  console.log(data, isLoading, isError);

  const {
    id: blockId,
    label: blockLabel,
    description: blockDescription,
    fields,
    step,
  } = data?.data as IFieldsBlock;

  const {
    legalDocument,
    label: stepLabel,
    description: stepDescription,
    heading,
  } = step as IFormStep;

  const { type, title, country } = legalDocument as ILegalDocument;

  return (
    <Box>
      <Box
        sx={{
          borderBottom: `1px solid ${theme.colorConstants.primaryDarkBlue}`,
        }}
      >
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

      <Box display="flex" justifyContent="space-between" alignItems="start">
        <Box display="flex" alignItems={"center"}>
          <Box marginY={"20px"}>
            <Typography
              variant="h4"
              sx={{
                color: theme.colorConstants.primaryDarkBlue,
                fontSize: "24px",
              }}
            >
              {stepLabel}
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: theme.colorConstants.primaryDarkBlue,
                fontSize: "16px",
              }}
            >
              {heading}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: theme.colorConstants.primaryDarkBlue,
              }}
            >
              {stepDescription}
            </Typography>
          </Box>

          <Box marginX="50px">
            <East
              sx={{
                fontSize: "50px",
              }}
            />
          </Box>

          <Box marginY={"20px"}>
            <Typography
              variant="h4"
              sx={{
                color: theme.colorConstants.primaryDarkBlue,
                fontSize: "24px",
              }}
            >
              {blockLabel}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: theme.colorConstants.primaryDarkBlue,
              }}
            >
              {blockDescription}
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
            Back
          </Button>
          <Button
            onClick={() => setOpenDrawer(true)}
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            + Create Form Field
          </Button>
        </Stack>
      </Box>

      <Box>
        {fields.length === 0 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="40vh"
          >
            <Typography
              variant="h4"
              sx={{ color: theme.colorConstants.primaryDarkBlue }}
            >
              No Form Fields found! Create New
            </Typography>
          </Box>
        ) : (
          <FormFieldTable data={fields as IFormField[]} />
        )}
      </Box>

      <FormFieldDrawer
        setOpen={setOpenDrawer}
        open={openDrawer}
        blockId={blockId}
      />
    </Box>
  );
};

export default FormFields;
