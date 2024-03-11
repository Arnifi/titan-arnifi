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
import { Edit, Delete, Description, OpenInNew } from "@mui/icons-material";
import GlobalModal from "../../Modals/GlobalModal";

import Link from "next/link";
import { ILegalDocument } from "@/app/api/legal-documents/legalDocument.model";
import LegalDocDrawer from "@/components/Drawers/LegalDocDrawer";
import {
  useDeleteDocumentMutation,
  useDocumentStatusToggleMutation,
} from "@/lib/Redux/features/legalDocument/legalDocumentApi";
import { useAppDispatch } from "@/lib/Redux/store";
import { openSnackbar } from "@/lib/Redux/features/snackbar/snackbarSlice";

const TableItem = ({ data, sl }: { data: ILegalDocument; sl: number }) => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
  const { id, title, country, type, steps, status } = data || {};
  const [deleteDocument, { isLoading }] = useDeleteDocumentMutation();
  const [documentStatusToggle] = useDocumentStatusToggleMutation();

  const dispatch = useAppDispatch();
  const handleLegalDelete = async () => {
    try {
      await deleteDocument({ id })
        .unwrap()
        .then((res) => {
          dispatch(
            openSnackbar({
              isOpen: true,
              message: res?.message || "Document deleted successfully",
              type: res?.success ? "success" : "error",
            })
          );
          setOpenModal(false);
        });
    } catch (error) {
      console.error(error);
      dispatch(
        openSnackbar({
          isOpen: true,
          message: "Something went wrong",
          type: "error",
        })
      );
    }
  };

  const handleToggleStatus = async () => {
    try {
      await documentStatusToggle({ data })
        .unwrap()
        .then((res) => {
          if (!res?.success) {
            dispatch(
              openSnackbar({
                isOpen: true,
                message: res?.message,
                type: "error",
              })
            );
          }
        });
    } catch (error) {
      console.error(error);
      dispatch(
        openSnackbar({
          isOpen: true,
          message: "Something went wrong",
          type: "error",
        })
      );
    }
  };

  const modalInfo = (
    <Box>
      <Typography sx={{ textTransform: "capitalize" }}>
        Document Title: <strong>{title}</strong>
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
        <TableCell sx={{ textTransform: "capitalize" }} align="left">
          {title}
        </TableCell>
        <TableCell align="center">
          <Typography>{country}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography>{type}</Typography>
        </TableCell>
        <TableCell sx={{ display: "flex", justifyContent: "center" }}>
          <Link href={`/dashboard/legal-documents/steps/${id}`}>
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
          <Link href={`/dashboard/legal-documents/templates/${id}`}>
            <IconButton>
              <Description />
            </IconButton>
          </Link>
        </TableCell>

        <TableCell align="center">
          <Link href={`/dashboard/legal-documents/stepper-form/${id}`}>
            <IconButton>
              <OpenInNew />
            </IconButton>
          </Link>
        </TableCell>

        <TableCell align="center">
          <Box>
            <Switch value={status} color="default" />
          </Box>
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
        title="Are you sure delete this Document?"
        info={modalInfo}
        loading={isLoading}
      />
      <LegalDocDrawer setOpen={setOpenDrawer} open={openDrawer} values={data} />
    </>
  );
};

export default TableItem;
