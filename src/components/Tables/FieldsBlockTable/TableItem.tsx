import {
  Box,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { Edit, Delete } from "@mui/icons-material";
import GlobalModal from "../../Modals/GlobalModal";

import Link from "next/link";
import { useAppDispatch } from "@/lib/Redux/store";
import { openSnackbar } from "@/lib/Redux/features/snackbar/snackbarSlice";
import { IFieldsBlock } from "@/app/api/fields-blocks/fieldsBlock.model";
import FieldBlockDrawer from "@/components/Editors/Drawers/FieldBlockDrawer";
import { useDeleteFieldsBlockMutation } from "@/lib/Redux/features/fieldsBlock/fieldsBlockApi";

const TableItem = ({ data, sl }: { data: IFieldsBlock; sl: number }) => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);

  const [deleteFieldsBlock, { isLoading }] = useDeleteFieldsBlockMutation();
  const { step, id, label, isShow, description, fields, type } = data;

  const dispatch = useAppDispatch();
  const handleDelete = async () => {
    try {
      await deleteFieldsBlock({ id })
        .unwrap()
        .then((res) => {
          dispatch(
            openSnackbar({
              isOpen: true,
              message: res?.message,
              type: res?.success ? "success" : "error",
            })
          );
          setOpenModal(false);
        });
    } catch (error) {
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
      <Typography>
        Fields Block: <strong>{label}</strong>
      </Typography>
      <Typography>
        Showing: <strong>{isShow ? "Yes" : "No"}</strong>
      </Typography>
      <Typography>
        Description: <strong>{description ? "Yes" : "No"}</strong>
      </Typography>
      <Typography>
        Total Fields Blocks: <strong>{fields?.length}</strong>
      </Typography>
    </Box>
  );

  return (
    <>
      <TableRow hover>
        <TableCell align="center">{sl}.</TableCell>
        <TableCell align="left">{label}</TableCell>
        <TableCell align="center">{type}</TableCell>
        <TableCell align="center">
          <Typography variant="h5">{isShow ? "Yes" : "No"}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="h5">{description ? "Yes" : "No"}</Typography>
        </TableCell>
        <TableCell sx={{ display: "flex", justifyContent: "center" }}>
          <Link href={`/dashboard/legal-documents/fields/${id}`}>
            <IconButton
              sx={{
                bgcolor: "#f9f9f9",
                fontWeight: "bold",
                width: "50px",
                height: "50px",
              }}
            >
              {fields?.length}
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
        okFn={handleDelete}
        title="Are you sure delete this Fields Block?"
        info={modalInfo}
        loading={isLoading}
      />

      <FieldBlockDrawer
        stepID={step as string}
        setOpen={setOpenDrawer}
        open={openDrawer}
        values={data}
      />
    </>
  );
};

export default TableItem;
