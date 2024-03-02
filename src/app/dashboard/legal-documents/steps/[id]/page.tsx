"use client";
import { IFormStep } from "@/app/api/form-steps/formStep.model";
import { ILegalDocument } from "@/app/api/legal-documents/legalDocument.model";
import FormStepDrawer from "@/components/Drawers/FormStepDrawer";
import GlobalError from "@/components/Errors/GlobalError";
import GlobalLoader from "@/components/Loaders/GlobalLoader";
import FormStepTable from "@/components/Tables/FormStepTable";
import { useGetLegalDocumentQuery } from "@/lib/Redux/features/legalDocument/legalDocumentApi";
import theme from "@/theme";
import { KeyboardReturn } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const FormSteps = ({ params }: { params: { id: string } }) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const router = useRouter();

  const { data, isLoading } = useGetLegalDocumentQuery({
    id: params.id,
  });

  if (isLoading) {
    return <GlobalLoader height={"70vh"} />;
  }

  if (!data?.success) {
    return (
      <GlobalError
        height={"70vh"}
        message={data?.message || "Something went wrong"}
      />
    );
  }

  const { title, type, country, steps } = data?.data as ILegalDocument;

  const handleReturn = () => {
    router.back();
  };

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

      <Stack
        sx={{
          marginY: "20px",
        }}
        direction="row"
        spacing={2}
        justifyContent="flex-end"
      >
        <Button
          onClick={handleReturn}
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
          + Create New Step
        </Button>
      </Stack>

      <Box>
        {isLoading ? (
          <GlobalLoader />
        ) : steps?.length > 0 ? (
          <FormStepTable data={steps as IFormStep[]} />
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            height="40vh"
            alignItems="center"
          >
            <Typography variant="h3">No steps found! Create New</Typography>
          </Box>
        )}
      </Box>
      <FormStepDrawer
        open={openDrawer}
        setOpen={setOpenDrawer}
        legalID={params?.id}
      />
    </Box>
  );
};

export default FormSteps;
