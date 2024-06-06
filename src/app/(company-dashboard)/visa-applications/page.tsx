"use client";

import ApplicationsTable from "@/components/Tables/ApplicationsTable";
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

  const tableHead = [
    {
      label: "Applicant",
      value: "applicantName",
      align: "left",
    },
    {
      label: "Company",
      value: "companyName",
      align: "left",
    },
    {
      label: "Type",
      value: "type",
      align: "left",
    },
    {
      label: "Linked to",
      value: "linkedTo",
      align: "left",
    },
    {
      label: "Jurisdiction",
      value: "jurisdiction",
      align: "left",
    },
    {
      label: "Current Step",
      value: "currentStep",
      align: "left",
    },
    {
      label: "Status",
      value: "status",
      align: "left",
    },
  ];

  const tableData = searchAbleApplications?.map((item) => {
    return {
      link: `/visa-applications/${item?.id}`,
      applicantName: `${item?.personalDetails?.firstName} ${item?.personalDetails?.middleName} ${item?.personalDetails?.lastName}`,
      companyName: item?.companyName,
      type: item?.visaType,
      linkedTo: item?.linkto,
      username: item?.username,
      currentStep: item?.visa_status?.currentStatus,
      status: item?.visa_status?.currentStatus,
      buttonBackground:
        item?.visa_status?.currentStatus === VisaStatusType.OPEN ||
        item?.visa_status?.currentStatus === VisaStatusType.INREVIEWARNIFI ||
        item?.visa_status?.currentStatus === VisaStatusType.SUBMITTED
          ? "#EBEEFB"
          : item?.visa_status?.currentStatus ===
              VisaStatusType.REJECTEDARNIFI ||
            item?.visa_status?.currentStatus === VisaStatusType.REJECTEDGA ||
            item?.visa_status?.currentStatus ===
              VisaStatusType.REJECTEDEMPLOYEEAGREEMENT ||
            item?.visa_status?.currentStatus === VisaStatusType.REJECTEDEVISA
          ? "#FBD2D2"
          : item?.visa_status?.currentStatus === VisaStatusType.COMPLETED
          ? "#D7ECE1"
          : item?.visa_status?.currentStatus ===
              VisaStatusType.MEDICALAPPOINTMENT ||
            item?.visa_status?.currentStatus ===
              VisaStatusType.EMIRATESIDAPPOINTMENT
          ? "#FDEBD8"
          : "#FDEBD8",
      buttonColor:
        item?.visa_status?.currentStatus === VisaStatusType.OPEN ||
        item?.visa_status?.currentStatus === VisaStatusType.INREVIEWARNIFI ||
        item?.visa_status?.currentStatus === VisaStatusType.SUBMITTED
          ? "#3955D9"
          : item?.visa_status?.currentStatus ===
              VisaStatusType.REJECTEDARNIFI ||
            item?.visa_status?.currentStatus === VisaStatusType.REJECTEDGA ||
            item?.visa_status?.currentStatus ===
              VisaStatusType.REJECTEDEMPLOYEEAGREEMENT ||
            item?.visa_status?.currentStatus === VisaStatusType.REJECTEDEVISA
          ? "#F15656"
          : item?.visa_status?.currentStatus === VisaStatusType.COMPLETED
          ? "#36A067"
          : item?.visa_status?.currentStatus ===
              VisaStatusType.MEDICALAPPOINTMENT ||
            item?.visa_status?.currentStatus ===
              VisaStatusType.EMIRATESIDAPPOINTMENT
          ? "#F7993B"
          : "#F7993B",
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
          marginBottom: "20px",
        }}
      >
        {searchAbleApplications?.length ? (
          <ApplicationsTable tableData={tableData} tableHead={tableHead} />
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
