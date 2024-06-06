import {
  TableCell,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { useRouter } from "next/navigation";
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
  data: { [key: string]: string | any };
  tableHead: { label: string; align: string; value: string }[];
}
const TableItem: React.FC<IProps> = ({ data, tableHead }) => {
  const router = useRouter();

  const navigationHandler = (to: string) => {
    router.push(to);
  };

  return (
    <TableRow
      hover
      onClick={() => navigationHandler(data?.link)}
      sx={{ cursor: "pointer" }}
    >
      {tableHead?.map((item, i) => {
        if (item?.value === "linkedTo") {
          return (
            <StyledTableCell key={i} align="left">{`${
              data["username"] as string
            }`}</StyledTableCell>
          );
        } else if (item?.value === "status") {
          return (
            <TableCell key={i} align="left">
              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                  padding: "5px",
                  borderRadius: "5px",
                  //   width: "150px",
                  bgcolor: data?.buttonBackground,
                  color: data?.buttonColor,
                }}
              >
                {data[item?.value] === undefined ? "None" : data[item?.value]}
              </Typography>
            </TableCell>
          );
        } else if (data[item?.value] === undefined) {
          return (
            <StyledTableCell key={i} align="left">
              {`${"None"}`}
            </StyledTableCell>
          );
        } else {
          return (
            <StyledTableCell key={i} align="left">{`${
              data[item?.value] as string
            }`}</StyledTableCell>
          );
        }
      })}
    </TableRow>
  );
};

export default TableItem;
