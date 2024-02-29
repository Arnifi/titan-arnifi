import {
  Box,
  IconButton,
  Stack,
  Switch,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { Edit, Delete, Description } from "@mui/icons-material";
import GlobalModal from "../../Modals/GlobalModal";

// import LegalDocDrawer, { ILegal } from "../../Drawers/LegalDocDrawer";
import Link from "next/link";
import { ILegalDocument } from "@/app/api/legal-documents/legalDocument.model";

const TableItem = ({ data, sl }: { data: ILegalDocument; sl: number }) => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
  const { id, title, country, type, steps, status } = data || {};

  const handleLegalDelete = async () => {
    // try {
    //   await deleteLegalDoc({ id }).then((res) => {
    //     dispatch(removeLegalDoc(id));
    //     setOpenModal(false);
    //     console.log(res);
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const modalInfo = (
    <Box>
      <Typography>
        Legal Title: <strong>{title}</strong>
      </Typography>
      <Typography>
        Country: <strong>{country}</strong>
      </Typography>
      <Typography>
        Type: <strong>{type}</strong>
      </Typography>
    </Box>
  );

  return (
    <>
      <TableRow hover>
        <TableCell align="center">{sl}.</TableCell>
        <TableCell align="left">{title}</TableCell>
        <TableCell align="center">
          <Typography>{country}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography>{type}</Typography>
        </TableCell>
        <TableCell sx={{ display: "flex", justifyContent: "center" }}>
          <Link href={`/dashboard/legals-docs/steps/${id}`}>
            <IconButton
              sx={{
                bgcolor: "#f9f9f9",
                fontWeight: "bold",
                width: "50px",
                height: "50px",
              }}
            >
              {steps?.length}
            </IconButton>
          </Link>
        </TableCell>
        <TableCell align="center">
          <Box>
            <Switch value={status} color="default" />
          </Box>
        </TableCell>

        <TableCell align="center">
          <Link href={`/dashboard/legals-docs/templates/${id}`}>
            <IconButton>
              <Description />
            </IconButton>
          </Link>
        </TableCell>
        <TableCell align="right">
          <Stack justifyContent="center" direction="row" spacing={2}>
            <IconButton onClick={() => setOpenDrawer(true)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => setOpenModal(true)} color="error">
              <Delete />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
      <GlobalModal
        open={openModal}
        setOpen={setOpenModal}
        okFn={handleLegalDelete}
        title="Are you sure delete this legal?"
        info={modalInfo}
        loading={false}
      />
      {/* <LegalDocDrawer setOpen={setOpenDrawer} open={openDrawer} values={data} /> */}
    </>
  );
};

export default TableItem;
