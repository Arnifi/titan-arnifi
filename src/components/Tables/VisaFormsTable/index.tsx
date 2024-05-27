"use client";

import React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableItem from "./TableItem";
import { TablePagination } from "@mui/material";

export interface ITableData {
  companyName: string;
  applicant: string;
  type: string;
  linkedTo: string;
  jurisdiction: string;
  currentStep: string;
  status: string;
}

const VisaFormsTable = () => {
  const tableHead = [
    {
      label: "Company Name",
      align: "left",
    },
    {
      label: "Name",
      align: "left",
    },
    {
      label: "Type",
      align: "left",
    },
    {
      label: "Linked to",
      align: "left",
    },
    {
      label: "Jurisdiction",
      align: "left",
    },
    {
      label: "Current Step",
      align: "left",
    },
    {
      label: "Status",
      align: "left",
    },
  ];

  const tableData: ITableData[] = [
    {
      companyName: "Tech Innovators Ltd.",
      applicant: "Pranjal Aswal",
      type: "Private",
      linkedTo: "John Doe",
      jurisdiction: "Delaware, USA",
      currentStep: "Incorporation",
      status: "Pending",
    },
    {
      companyName: "Green Solutions Inc.",
      applicant: "Pranjal Aswal",
      type: "Public",
      linkedTo: "Jane Smith",
      jurisdiction: "California, USA",
      currentStep: "Regulatory Approval",
      status: "Approved",
    },
    {
      companyName: "HealthCare Services LLC",
      applicant: "Pranjal Aswal",
      type: "Non-Profit",
      linkedTo: "Dr. Emily Johnson",
      jurisdiction: "New York, USA",
      currentStep: "Funding",
      status: "In Progress",
    },
    {
      companyName: "EcoFriendly Goods Ltd.",
      applicant: "Pranjal Aswal",
      type: "Private",
      linkedTo: "Michael Brown",
      jurisdiction: "Texas, USA",
      currentStep: "Manufacturing",
      status: "Pending",
    },
    {
      companyName: "Financial Advisors Corp.",
      applicant: "Pranjal Aswal",
      type: "Private",
      linkedTo: "Sarah Lee",
      jurisdiction: "London, UK",
      currentStep: "Licensing",
      status: "In Progress",
    },
    {
      companyName: "Tech Startups Co.",
      applicant: "Pranjal Aswal",
      type: "Private",
      linkedTo: "David Wilson",
      jurisdiction: "Berlin, Germany",
      currentStep: "Incorporation",
      status: "Approved",
    },
    {
      companyName: "Global Exports LLC",
      applicant: "Pranjal Aswal",
      type: "Public",
      linkedTo: "Maria Garcia",
      jurisdiction: "Ontario, Canada",
      currentStep: "Market Entry",
      status: "Pending",
    },
    {
      companyName: "Real Estate Holdings Inc.",
      applicant: "Pranjal Aswal",
      type: "Private",
      linkedTo: "James Martin",
      jurisdiction: "Dubai, UAE",
      currentStep: "Property Acquisition",
      status: "Approved",
    },
    {
      companyName: "Logistics Solutions Ltd.",
      applicant: "Pranjal Aswal",
      type: "Private",
      linkedTo: "Patricia Rodriguez",
      jurisdiction: "Tokyo, Japan",
      currentStep: "Operational Setup",
      status: "In Progress",
    },
    {
      companyName: "Creative Designs LLC",
      applicant: "Pranjal Aswal",
      type: "Non-Profit",
      linkedTo: "Robert Moore",
      jurisdiction: "Sydney, Australia",
      currentStep: "Design Approval",
      status: "Pending",
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table aria-labelledby="legal-table">
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                {tableHead?.map((item, i) => (
                  <TableCell
                    key={i}
                    align={item?.align === "left" ? "left" : "center"}
                  >
                    {item?.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {tableData.map((row: ITableData) => (
                <TableItem key={row.companyName} data={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 8, 16, 24]}
          component="div"
          count={100}
          rowsPerPage={10}
          page={1}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
      </Paper>
    </Box>
  );
};

export default VisaFormsTable;
