"use client";

import { IFieldsBlock } from "@/app/api/fields-blocks/fieldsBlock.model";
import { IFormStep } from "@/app/api/form-steps/formStep.model";
import { ILegalDocument } from "@/app/api/legal-documents/legalDocument.model";
import FieldBlockDrawer from "@/components/Editors/Drawers/FieldBlockDrawer";
import GlobalError from "@/components/Errors/GlobalError";
import GlobalLoader from "@/components/Loaders/GlobalLoader";
import FieldBlockTable from "@/components/Tables/FieldsBlockTable";
import { useGetFormStepQuery } from "@/lib/Redux/features/formStep/formStepApi";
import theme from "@/theme";
import { KeyboardReturn } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const FieldBlock = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const { data, isLoading, isError } = useGetFormStepQuery({ id: params.id });

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

  const { id, label, description, heading, legalDocument, blocks } =
    data?.data as IFormStep;

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
        <Box marginY={"20px"}>
          <Typography
            variant="h3"
            sx={{
              color: theme.colorConstants.primaryDarkBlue,
            }}
          >
            {label}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: theme.colorConstants.primaryDarkBlue,
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
            {description}
          </Typography>
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
            + Create Fields Block
          </Button>
        </Stack>
      </Box>

      <Box>
        {blocks.length === 0 ? (
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
              No Fields Blocks found! Create New
            </Typography>
          </Box>
        ) : (
          <FieldBlockTable data={blocks as IFieldsBlock[]} />
        )}
      </Box>

      <FieldBlockDrawer open={openDrawer} setOpen={setOpenDrawer} stepID={id} />
    </Box>
  );
};

export default FieldBlock;
