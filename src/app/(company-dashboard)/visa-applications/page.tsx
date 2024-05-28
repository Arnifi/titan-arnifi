"use client";

import VisaFormsTable from "@/components/Tables/VisaFormsTable";
import {
  IVisaApplication,
  VisaStatusType,
} from "@/lib/Redux/features/visaApplication/visaApplicationSlice";
import { useAppSelector } from "@/lib/Redux/store";
import theme from "@/theme";
import { Search } from "@mui/icons-material";
import {
  Box,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const VisaApplications: React.FC = () => {
  const [search, setSearch] = useState<string>("");

  const allVisaApplications = useAppSelector(
    (state) => state.visaApplications?.applications
  );

  const [visaApplications, setVisaApplications] =
    useState<IVisaApplication[]>(allVisaApplications);

  const allVisaStatus = [
    VisaStatusType.OPEN,
    VisaStatusType.SUBMITTED,
    VisaStatusType.REJECTEDARNIFI,
    VisaStatusType.INREVIEWARNIFI,
    VisaStatusType.WAITINGGA,
    VisaStatusType.REJECTEDGA,
    VisaStatusType.REJECTEDEMPLOYEEAGREEMENT,
    VisaStatusType.REJECTEDEVISA,
    VisaStatusType.MEDICALAPPOINTMENT,
    VisaStatusType.EMIRATESIDAPPOINTMENT,
    VisaStatusType.COMPLETED,
  ];

  const searchAbleApplications: IVisaApplication[] = visaApplications?.filter(
    (item) => {
      const searchInLowerCase = search.toLocaleLowerCase();

      const companyName = item?.companyName?.toLocaleLowerCase() || "";

      const firstName =
        item?.personalDetails?.firstName.toLocaleLowerCase() || "";

      const middleName =
        item?.personalDetails?.middleName.toLocaleLowerCase() || "";

      const lastName =
        item?.personalDetails?.lastName.toLocaleLowerCase() || "";

      const userName = item?.username?.toLocaleLowerCase() || "";

      return (
        companyName.includes(searchInLowerCase) ||
        firstName.includes(searchInLowerCase) ||
        middleName.includes(searchInLowerCase) ||
        lastName.includes(searchInLowerCase) ||
        userName.includes(searchInLowerCase)
      );
    }
  );

  const statusWiseVisaApplications = allVisaStatus?.map((status) => {
    const applications = allVisaApplications?.filter(
      (item) => item.visa_status?.currentStatus === status
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
          Visa Applications
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
                return `All Applications (${allVisaApplications?.length})`;
              } else {
                return String(e);
              }
            }}
            inputProps={{ "aria-label": "Without label" }}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "all") {
                setVisaApplications(allVisaApplications);
              } else {
                const selectedStatus = statusWiseVisaApplications?.find(
                  (item) => item?.leble === e.target.value
                );
                setVisaApplications(
                  selectedStatus?.applications as IVisaApplication[]
                );
              }
            }}
            onBlur={(e) => {
              const value = e.target.value;
              if (value === "all" || value === "") {
                setVisaApplications(allVisaApplications);
              } else {
                const selectedStatus = statusWiseVisaApplications?.find(
                  (item) => item?.leble === e.target.value
                );
                setVisaApplications(
                  selectedStatus?.applications as IVisaApplication[]
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
              All Applications ({allVisaApplications?.length})
            </MenuItem>
            {statusWiseVisaApplications?.map((item, i) => (
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
              width: "350px",
              fontSize: "14px",
              fontWeight: 500,
              "& .MuiOutlinedInput-root": {
                height: "40px",
              },
            }}
            variant="outlined"
            placeholder={"Search by Company or Applicant or User"}
          />
        </Box>
      </Box>

      <Box
        sx={{
          marginBottom: "50px",
        }}
      >
        {searchAbleApplications?.length ? (
          <VisaFormsTable data={searchAbleApplications as IVisaApplication[]} />
        ) : (
          <Typography
            variant="body1"
            sx={{
              paddingY: "50px",
              textAlign: "center",
              fontSize: "22px",
              fontWeight: 600,
              color: theme.colorConstants?.crossRed,
            }}
          >
            No Applications Found!
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default VisaApplications;
