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
import { IFormField } from "@/app/api/form-fields/formField.model";
import TableItem from "./TableItem";

const FormFieldTable = ({ data }: { data: IFormField[] }) => {
  const tableHead = [
    {
      label: "SL",
      align: "center",
    },
    {
      label: "Label",
      align: "left",
    },
    {
      label: "Type",
      align: "center",
    },
    {
      label: "Placeholder",
      align: "center",
    },
    {
      label: "Is Required",
      align: "center",
    },
    {
      label: "Width",
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
              {data.map((row: IFormField, index: number) => (
                <TableItem key={row.id} data={row} sl={index + 1} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default FormFieldTable;
