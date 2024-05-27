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
import { IVisaApplication } from "@/lib/Redux/features/visaApplication/visaApplicationSlice";
import theme from "@/theme";

export interface ITableData {
  companyName: string;
  applicant: string;
  type: string;
  linkedTo: string;
  jurisdiction: string;
  currentStep: string;
  status: string;
}

interface IProps {
  data: IVisaApplication[];
}

const VisaFormsTable: React.FC<IProps> = ({ data }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const tableHead = [
    {
      label: "Applicant",
      align: "left",
    },
    {
      label: "Company",
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table aria-labelledby="legal-table" size="small">
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                {tableHead?.map((item, i) => (
                  <TableCell
                    sx={{
                      fontSize: "12px",
                      fontWeight: "700",
                      color: "#333",
                      textTransform: "capitalize",
                    }}
                    key={i}
                    align={item?.align === "left" ? "left" : "center"}
                  >
                    {item?.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {(data || [])
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: IVisaApplication, index: number) => (
                  <TableItem key={index} data={row} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          sx={{
            backgroundColor: "#f5f5f5",
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-input, & .MuiTablePagination-selectIcon":
              {
                fontSize: "14px",
                color: theme.colorConstants.darkGray,
                textTransform: "capitalize",
              },
            "& .css-1l4bifm-MuiTablePagination-displayedRows": {
              fontSize: "14px",
              color: theme.colorConstants.darkGray,
              textTransform: "capitalize",
            },
          }}
          size="small"
          rowsPerPageOptions={[5, 10, 20, 20]}
          component="div"
          count={(data || []).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default VisaFormsTable;
