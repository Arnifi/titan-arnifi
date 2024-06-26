"use client";

import { documentsTypes } from "@/app/api/legal-documents/legalDocument.model";
import LegalDocDrawer from "@/components/Drawers/LegalDocDrawer";
import GlobalError from "@/components/Errors/GlobalError";
import CountrySelect from "@/components/Form/ACountrySelect";
import GlobalLoader from "@/components/Loaders/GlobalLoader";
import LegalDocTable from "@/components/Tables/LegalDocTable";
import { useDebounced } from "@/hooks/useDebounced";
import { useGetAllDocumentsQuery } from "@/lib/Redux/features/legalDocument/legalDocumentApi";
import theme from "@/theme";
import {
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const LegalDocuments = () => {
  const [legalType, setLegalType] = useState<string>("All Type");
  const [selectedCountry, setSelectedCountry] =
    useState<string>("All Countries");
  const [search, setSearch] = useState<string>("");
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const searchParams: Record<string, string> = {};

  const debouncedTerm = useDebounced({
    searchQuery: search,
    delay: 600,
  });

  if (legalType !== "All Type") {
    searchParams["type"] = legalType;
  }

  if (selectedCountry !== "All Countries") {
    searchParams["country"] = selectedCountry;
  }

  if (debouncedTerm) {
    searchParams["search"] = debouncedTerm;
  }

  const { data, isLoading, isError } = useGetAllDocumentsQuery({
    ...searchParams,
  });

  return (
    <Box>
      <Box>
        <Typography
          sx={{ color: theme.colorConstants.primaryDarkBlue }}
          variant="h3"
        >
          Legal Documents
        </Typography>

        <Card sx={{ marginY: "50px", padding: "16px" }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                sx={{
                  width: "100%",
                  fontSize: "16px",
                  color: theme.colorConstants.mediumGray,
                }}
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
                label="Search By Title"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={3}>
              <Select
                onChange={(e) => setLegalType(e.target.value)}
                sx={{
                  width: "100%",
                }}
                value={legalType}
              >
                <MenuItem value="All Type">All Type</MenuItem>
                {documentsTypes.map((type, i) => (
                  <MenuItem key={i} value={type}>
                    <Typography
                      sx={{
                        marginLeft: "5px",
                        fontSize: "16px",
                        color: theme.colorConstants.mediumGray,
                        textTransform: "capitalize",
                      }}
                      variant="body1"
                    >
                      {type}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={3}>
              <CountrySelect
                value={selectedCountry}
                setFn={setSelectedCountry}
              />
            </Grid>

            <Grid item xs={3}>
              <Button
                onClick={() => setOpenDrawer(true)}
                variant="contained"
                sx={{ textTransform: "none", height: "100%", width: "100%" }}
              >
                + Create New
              </Button>
            </Grid>
          </Grid>
        </Card>

        <Box>
          {isLoading ? (
            <GlobalLoader />
          ) : isError || !data?.success ? (
            <GlobalError />
          ) : data?.data?.length > 0 ? (
            <LegalDocTable data={data?.data} />
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              height="40vh"
              alignItems="center"
            >
              <Typography variant="h3">
                No Documents found! Create New
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <LegalDocDrawer open={openDrawer} setOpen={setOpenDrawer} />
    </Box>
  );
};

export default LegalDocuments;
