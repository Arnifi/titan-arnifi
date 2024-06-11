import theme from "@/theme";
import { Close, FileDownload, Visibility } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "600px",
  height: "100vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "none",
  borderRadius: "5px",
  // "@media (min-width: 600px)": {
  //   width: "400px",
  // },
};

interface IProps {
  title: string;
  data: { label: string; data: string | null }[];
}

const AdminDocumentActions: React.FC<IProps> = ({ title, data }) => {
  const [openViewModal, setOpenViewModal] = React.useState<boolean>(false);
  const [imageSrc, setImageSrc] = React.useState<string>("");

  const fileViewHandler = (url: string) => {
    setImageSrc(url);
    setOpenViewModal(true);
  };

  const handleDownload = async (url: string) => {
    try {
      const response = await fetch(url, {
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", "");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file", error);
    }

    // const link = document.createElement("a");
    // link.href = URL.createObjectURL(url);
    // link.setAttribute("download", "");
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };

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
        {title}
      </Typography>

      <Box>
        {data?.map((item, i) => {
          return (
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  color: theme.colorConstants.darkBlue,
                  fontWeight: 700,
                }}
              >
                {i + 1}. {item?.label}
              </Typography>

              {item?.data !== null ? (
                <Stack sx={{ height: "40px" }} direction="row">
                  <IconButton
                    onClick={() => fileViewHandler(item?.data as string)}
                  >
                    <Visibility />
                  </IconButton>

                  <IconButton
                    onClick={() => handleDownload(item?.data as string)}
                  >
                    <FileDownload />
                  </IconButton>
                </Stack>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    paddingY: "10px",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: theme?.colorConstants?.primaryBlue,
                  }}
                >
                  Pending
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>

      <Modal
        disableScrollLock
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
      >
        <Box sx={{ ...style }}>
          <Box sx={{ position: "relative" }}>
            <IconButton
              onClick={() => setOpenViewModal(false)}
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
            >
              <Close />
            </IconButton>

            <Box
              sx={{
                width: "100%",
                height: "100%",
                padding: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={imageSrc}
                alt={"files"}
                width={100}
                height={100}
                layout="responsive"
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </Paper>
  );
};

export default AdminDocumentActions;
