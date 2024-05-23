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

const CompanyApplications: React.FC = () => {
  const [search, setSearch] = useState<string>("");

  const allApplications = useAppSelector(
    (state) => state.companyApplications?.applications
  );

  const [companyApplications, setCompanyApplications] =
    useState<ICompanyApplication[]>(allApplications);

  const searchAbleApplications: ICompanyApplication[] =
    companyApplications?.filter((item) => {
      const searchInLowerCase = search.toLocaleLowerCase();

      const nameOption1 =
        item.companyDetails?.companyNames?.option1?.toLocaleLowerCase() || "";
      const nameOption2 =
        item.companyDetails?.companyNames?.option2?.toLocaleLowerCase() || "";
      const nameOption3 =
        item.companyDetails?.companyNames?.option3?.toLocaleLowerCase() || "";

      return (
        nameOption1.includes(searchInLowerCase) ||
        nameOption2.includes(searchInLowerCase) ||
        nameOption3.includes(searchInLowerCase)
      );
    });

  const allCompanyStatus = [
    CompanyStatusType.OPEN,
    CompanyStatusType.SUBMITTED,
    CompanyStatusType.INREVIEWARNIFI,
    CompanyStatusType.REJECTEDARNIFI,
    CompanyStatusType.WAITINGGA,
    CompanyStatusType.REJECTEDGA,
    CompanyStatusType.RESOLUTIONSIGNED,
    CompanyStatusType.MOAAOASIGNED,
    CompanyStatusType.COMPLETED,
  ];

  const statusWiseApplications = allCompanyStatus?.map((status) => {
    const applications = allApplications?.filter(
      (item) => item.company_status?.currentStatus === status
    );
    return {
      leble: status,
      applications,
      count: applications.length,
    };
  });

  return (
    <Box>
      <Box
        sx={{
          marginY: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "26px",
            color: theme.colorConstants.darkBlue,
          }}
        >
          Company Applications
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              color: theme.colorConstants.darkGray,
            }}
          >
            Current Step
          </Typography>

          <Select
            sx={{
              marginX: "20px",
              width: "250px",
              height: "40px",
              color: theme.colorConstants.darkGray,
              fontSize: "14",
              fontWeight: 500,
              textTransform: "capitalize",
            }}
            displayEmpty
            renderValue={(e: unknown) => {
              if (e === undefined || e === "all") {
                return `All Applications (${allApplications?.length})`;
              } else {
                return String(e);
              }
            }}
            inputProps={{ "aria-label": "Without label" }}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "all") {
                setCompanyApplications(allApplications);
              } else {
                const selectedStatus = statusWiseApplications?.find(
                  (item) => item?.leble === e.target.value
                );
                setCompanyApplications(
                  selectedStatus?.applications as ICompanyApplication[]
                );
              }
            }}
            onBlur={(e) => {
              const value = e.target.value;
              if (value === "all") {
                setCompanyApplications(allApplications);
              } else {
                const selectedStatus = statusWiseApplications?.find(
                  (item) => item?.leble === e.target.value
                );
                setCompanyApplications(
                  selectedStatus?.applications as ICompanyApplication[]
                );
              }
            }}
            MenuProps={{ disableScrollLock: true }}
          >
            <MenuItem
              sx={{
                color: theme.colorConstants.darkGray,
                fontSize: "14px",
                fontWeight: 500,
                textTransform: "capitalize",
              }}
              value={`all`}
            >
              All Applications ({allApplications?.length})
            </MenuItem>
            {statusWiseApplications?.map((item, i) => (
              <MenuItem
                sx={{
                  color: theme.colorConstants.darkGray,
                  fontSize: "14px",
                  fontWeight: 500,
                  textTransform: "capitalize",
                }}
                key={i}
                value={item?.leble}
              >
                {`${item?.leble} (${item?.count})`}
              </MenuItem>
            ))}
          </Select>

          <TextField
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type={"text"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">{<Search />}</InputAdornment>
              ),
            }}
            sx={{
              width: "300px",
              fontSize: "14px",
              fontWeight: 500,
              "& .MuiOutlinedInput-root": {
                height: "40px",
              },
            }}
            variant="outlined"
            placeholder={"Search by Company Name"}
          />
        </Box>
      </Box>

      <Box
        sx={{
          marginBottom: "20px",
        }}
      >
        <CompanyFormsTable data={searchAbleApplications} />
      </Box>
    </Box>
  );
};

export default CompanyApplications;
