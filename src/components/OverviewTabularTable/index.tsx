import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import React from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.colorConstants.darkBlue,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "12px",
    fontWeight: 600,
  },
}));

interface IProps {
  data: {
    label: string;
    count: number;
  }[];
}
const OverviewTabularTable: React.FC<IProps> = ({ data }) => {
  const tableHead = [
    {
      label: "Status",
      align: "left",
    },
    {
      label: "Count",
      align: "right",
    },
  ];

  return (
    <Box>
      <TableContainer>
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              {tableHead?.map((item, i) => (
                <TableCell
                  align={
                    item?.align === "left"
                      ? "left"
                      : item?.align === "center"
                      ? "center"
                      : "right"
                  }
                  key={i}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#333",
                      textTransform: "capitalize",
                    }}
                  >
                    {item?.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, i) => (
              <TableRow key={i} hover>
                <StyledTableCell align="left" scope="row">
                  {item?.label}
                </StyledTableCell>

                <StyledTableCell align="right" scope="row">
                  {item?.count.toString().padStart(2, "0")}
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OverviewTabularTable;
