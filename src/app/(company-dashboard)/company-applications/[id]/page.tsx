"use client";

import CompanyFormsTable from "@/components/Tables/CompanyFormsTable";
import {
  CompanyStatusType,
  ICompanyApplication,
} from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
import { useAppSelector } from "@/lib/Redux/store";
import theme from "@/theme";
import { Search } from "@mui/icons-material";
import {
  Box,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const CompanyApplicationDetails = ({ params }: { params: { id: string } }) => {
  console.log(params.id);

  const selectedApplication = useAppSelector((state) => {
    return state.companyApplications?.applications?.find(
      (item) => item?.id === Number(params.id)
    );
  });

  console.log(selectedApplication);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box
            sx={{
              bgcolor: "red",
            }}
          >
            review container
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              bgcolor: "green",
            }}
          >
            admin actions
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyApplicationDetails;
