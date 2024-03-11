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
import { IFormStep } from "@/app/api/form-steps/formStep.model";

const FormStepTable = ({ data }: { data: IFormStep[] }) => {
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
      label: "Heading",
      align: "center",
    },
    {
      label: "Description",
      align: "center",
    },
    {
      label: "Create Fields Blocks",
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
              {data.map((row: IFormStep, index: number) => (
                <TableItem key={row.id} data={row} sl={index + 1} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default FormStepTable;
