import {
  Box,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { Edit, Delete } from "@mui/icons-material";
import GlobalModal from "../../Modals/GlobalModal";

import Link from "next/link";
import { useAppDispatch } from "@/lib/Redux/store";
import { openSnackbar } from "@/lib/Redux/features/snackbar/snackbarSlice";
import { IFormStep } from "@/app/api/form-steps/formStep.model";
import FormStepDrawer from "@/components/Drawers/FormStepDrawer";
import { useDeleteFormStepMutation } from "@/lib/Redux/features/formStep/formStepApi";

const TableItem = ({ data, sl }: { data: IFormStep; sl: number }) => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);

  const [deleteFormStep, { isLoading }] = useDeleteFormStepMutation();
  const { id, legalDocument, label, heading, description, blocks } = data;

  const dispatch = useAppDispatch();
  const handleDelete = async () => {
    try {
      await deleteFormStep({ id })
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

  const modalInfo = (
    <Box>
      <Typography>
        Form Step: <strong>{label}</strong>
      </Typography>
      <Typography>
        Heading: <strong>{heading ? "Yes" : "No"}</strong>
      </Typography>
      <Typography>
        Description: <strong>{description ? "Yes" : "No"}</strong>
      </Typography>
      <Typography>
        Total Fields Blocks: <strong>{blocks?.length}</strong>
      </Typography>
    </Box>
  );

  return (
    <>
      <TableRow hover>
        <TableCell align="center">{sl}.</TableCell>
        <TableCell align="left">{label}</TableCell>
        <TableCell align="center">
          <Tooltip title={heading}>
            <Typography variant="h5">
              {heading ? `${heading.slice(0, 30)}...` : "No"}
            </Typography>
          </Tooltip>
        </TableCell>
        <TableCell align="center">
          <Tooltip title={description}>
            <Typography variant="h5">
              {description ? `${heading.slice(0, 30)}...` : "No"}
            </Typography>
          </Tooltip>
        </TableCell>
        <TableCell sx={{ display: "flex", justifyContent: "center" }}>
          <Link href={`/dashboard/legal-documents/blocks/${id}`}>
            <IconButton
              sx={{
                bgcolor: "#f9f9f9",
                fontWeight: "bold",
                width: "50px",
                height: "50px",
              }}
            >
              {blocks?.length}
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
        title="Are you sure delete this Form Step?"
        info={modalInfo}
        loading={isLoading}
      />

      <FormStepDrawer
        legalID={legalDocument as string}
        setOpen={setOpenDrawer}
        open={openDrawer}
        values={data}
      />
    </>
  );
};

export default TableItem;
