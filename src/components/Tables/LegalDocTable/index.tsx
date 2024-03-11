"use client";

import React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableItem from "./TableItem";
import { ILegalDocument } from "@/app/api/legal-documents/legalDocument.model";

const LegalDocTable = ({ data }: { data: ILegalDocument[] }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const tableHead = [
    {
      label: "SL",
      align: "center",
    },
    {
      label: "Title",
      align: "left",
    },
    {
      label: "Country",
      align: "center",
    },
    {
      label: "Type",
      align: "center",
    },
    {
      label: "Create Form",
      align: "center",
    },
    {
      label: "Template",
      align: "center",
    },
    {
      label: "Preview",
      align: "center",
    },
    {
      label: "Status",
      align: "center",
    },
    {
      label: "Action",
      align: "center",
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
                  <TableCell key={i} align={i === 1 ? "left" : "center"}>
                    {item?.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {(data || [])
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: ILegalDocument, index: number) => (
                  <TableItem
                    key={row.id}
                    data={row}
                    sl={page * rowsPerPage + index + 1}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 8, 16, 24]}
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

export default LegalDocTable;
