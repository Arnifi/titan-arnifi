import {
  Paper,
  Skeleton,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

const TableLoading = () => {
  return (
    // <Paper sx={{ width: "100%", mb: 2 }}>
    //   <TableContainer>
    //     <Table aria-labelledby="loading-table">
    //       {[...Array(6)].map((_, index) => (
    //         <TableRow key={index}>
    //           <TableCell align="center">
    //             <Skeleton animation="wave" width={"100%"} height={60} />
    //           </TableCell>
    //           <TableCell align="center">
    //             <Skeleton animation="wave" width={"100%"} height={60} />
    //           </TableCell>
    //           <TableCell align="center">
    //             <Skeleton animation="wave" width={"100%"} height={60} />
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </Table>
    //   </TableContainer>
    // </Paper>
    <Typography>Loading...</Typography>
  );
};

export default TableLoading;
