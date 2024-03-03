"use client";

import React from "react";
import { useGetLegalDocumentQuery } from "@/lib/Redux/features/legalDocument/legalDocumentApi";
import { useRouter } from "next/navigation";
import GlobalLoader from "@/components/Loaders/GlobalLoader";
import GlobalError from "@/components/Errors/GlobalError";
import { ILegalDocument } from "@/app/api/legal-documents/legalDocument.model";
import { Box, Button, Stack, Typography } from "@mui/material";
import theme from "@/theme";
import { KeyboardReturn } from "@mui/icons-material";

const StepperForm = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const { data, isLoading, isError } = useGetLegalDocumentQuery({
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

  const { title, type, country, steps } = data?.data as ILegalDocument;

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
    </Box>
  );
};

export default StepperForm;
