import theme from "@/theme";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React from "react";
import TableItem from "./TableItem";

interface IApplicationTableProps {
  tableHead: { label: string; align: string; value: string }[];
  tableData: { [key: string]: string | any }[];
}

const ApplicationsTable: React.FC<IApplicationTableProps> = ({
  tableHead,
  tableData,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
    <Box>
      <Paper sx={{ width: "100%" }}>
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
              {(tableData || [])
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: { [key: string]: string | any }, index: number) => (
                  <TableItem key={index} data={row} tableHead={tableHead} />
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
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={(tableData || []).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default ApplicationsTable;
