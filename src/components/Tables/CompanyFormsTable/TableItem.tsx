import {
  Button,
  TableCell,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import React from "react";
import { ITableData } from ".";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.colorConstants.darkBlue,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "16px",
    fontWeight: 600,
  },
}));

const TableItem = ({ data }: { data: ITableData }) => {
  const { companyName, type, linkedTo, jurisdiction, currentStep, status } =
    data;

  return (
    <>
      <TableRow hover>
        <StyledTableCell align="left">{companyName}</StyledTableCell>
        <StyledTableCell align="left">{type}</StyledTableCell>
        <StyledTableCell align="left">{linkedTo}</StyledTableCell>
        <StyledTableCell align="left">{jurisdiction}</StyledTableCell>
        <StyledTableCell align="left">{currentStep}</StyledTableCell>
        <TableCell align="left">
          <Button
            variant="contained"
            sx={{ width: "100%", textTransform: "none" }}
          >
            {status}
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TableItem;
