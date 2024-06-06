import theme from "@/theme";
import {
  Box,
  Paper,
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
  data: { label: string; value: string }[];
}
const ApplicationHistoryCard: React.FC<IProps> = ({ data }) => {
  return (
    <Paper sx={{ padding: "20px" }} variant="outlined">
      <Typography
        gutterBottom
        variant="h4"
        sx={{
          fontSize: "16px",
          color: theme.colorConstants.black,
        }}
      >
        Application History
      </Typography>

      <Box>
        <TableContainer>
          <Table size="small">
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell
                  align={"left"}
                  sx={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#333",
                    textTransform: "capitalize",
                  }}
                >
                  Step Name
                </TableCell>

                <TableCell
                  align={"right"}
                  sx={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#333",
                    textTransform: "capitalize",
                  }}
                >
                  Date
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((item, i) => {
                return (
                  <TableRow key={i}>
                    <StyledTableCell align="left" scope="row">
                      {item?.label}
                    </StyledTableCell>

                    <StyledTableCell align="right" scope="row">
                      {item?.value}
                    </StyledTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
};

export default ApplicationHistoryCard;
