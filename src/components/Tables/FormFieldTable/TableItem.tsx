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

import { useAppDispatch } from "@/lib/Redux/store";
import { openSnackbar } from "@/lib/Redux/features/snackbar/snackbarSlice";
import { IFormField } from "@/app/api/form-fields/formField.model";
import FormFieldDrawer from "@/components/Drawers/FormFieldDrawer";
import { useDeleteFormFieldMutation } from "@/lib/Redux/features/formField/formFieldApi";

const TableItem = ({ data, sl }: { data: IFormField; sl: number }) => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);

  const [deleteFormField, { isLoading }] = useDeleteFormFieldMutation();
  const { id, label, placeholder, isRequired, type, width, block } = data;

  const dispatch = useAppDispatch();
  const handleDelete = async () => {
    try {
      await deleteFormField({ id })
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
        Form Fields : <strong>{label}</strong>
      </Typography>
      <Typography sx={{ textTransform: "capitalize" }}>
        Type: <strong>{type}</strong>
      </Typography>
      <Typography>
        Placeholder: <strong>{placeholder}</strong>
      </Typography>
      <Typography>
        Is Required : <strong>{isRequired ? "Yes" : "No"}</strong>
      </Typography>
      <Typography>
        Field With : <strong>{width}</strong>
      </Typography>
    </Box>
  );

  return (
    <>
      <TableRow hover>
        <TableCell align="center">{sl}.</TableCell>
        <TableCell align="left">{label}</TableCell>
        <TableCell align="center" sx={{ textTransform: "capitalize" }}>
          {type}
        </TableCell>
        <TableCell align="center">
          <Typography variant="h5">{placeholder}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="h5">{isRequired ? "Yes" : "No"}</Typography>
        </TableCell>

        <TableCell align="center">
          <Typography variant="h5">{width}</Typography>
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

      <FormFieldDrawer
        blockId={block as string}
        values={data}
        open={openDrawer}
        setOpen={setOpenDrawer}
      />
    </>
  );
};

export default TableItem;
