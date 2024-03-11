import { ILegalDocument } from "@/app/api/legal-documents/legalDocument.model";
import theme from "@/theme";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import React from "react";

const OverViewItemsTable = ({ data }: { data: ILegalDocument[] }) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#f5f5f5",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const sortedData = [...data]
    ?.sort((a, b) => b.downloadCount - a.downloadCount)
    .slice(0, 10);

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.1)",
        border: "1px solid #e0e0e0",
      }}
    >
      <Table
        sx={{ minWidth: 650 }}
        size="small"
        aria-label="Top 10 items table"
      >
        <TableHead
          sx={{
            bgcolor: theme.colorConstants.whitishGray,
            color: theme.colorConstants.white,
          }}
        >
          <TableRow>
            <TableCell>SL</TableCell>
            <TableCell>Tittle</TableCell>
            <TableCell align="center">Country</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Downloaded</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData?.map((document, index) => (
            <StyledTableRow
              key={index}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <StyledTableCell width={"2%"}>{index + 1}.</StyledTableCell>
              <StyledTableCell
                sx={{ textTransform: "capitalize" }}
                component="th"
                scope="row"
              >
                {document?.title}
              </StyledTableCell>
              <StyledTableCell align="center">
                {document?.country}
              </StyledTableCell>
              <StyledTableCell align="center">{document?.type}</StyledTableCell>
              <StyledTableCell align="center">
                {document?.downloadCount}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OverViewItemsTable;
