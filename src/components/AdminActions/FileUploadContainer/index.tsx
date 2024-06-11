import theme from "@/theme";
import { Close, RemoveRedEyeOutlined } from "@mui/icons-material";
import { Box, IconButton, InputLabel, Modal, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
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
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}
const FileUploadContainer: React.FC<IProps> = ({ title, file, setFile }) => {
  const [openViewModal, setOpenViewModal] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImageSrc(objectUrl);

      // Clean up the object URL to avoid memory leaks
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            color: theme.colorConstants?.darkGray,
          }}
        >
          {title}
        </Typography>

        <input
          id={`file-upload-${title}`}
          type="file"
          accept="image/*"
          // accept="image/*, application/pdf"
          style={{ display: "none" }}
          onChange={(event) => {
            const file: File | undefined = event.target.files?.[0];
            if (file !== undefined) {
              setFile(file);
            }
          }}
        />

        {!file && (
          <InputLabel htmlFor={`file-upload-${title}`}>
            <Typography
              variant="body1"
              sx={{
                fontSize: "12px",
                fontWeight: 600,
                color: theme.colorConstants.white,
                bgcolor: theme.colorConstants.primaryBlue,
                paddingX: "20px",
                paddingY: "5px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Upload
            </Typography>
          </InputLabel>
        )}
      </Box>

      {file && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: "12px",
              fontWeight: 600,
              color: theme.colorConstants.primaryBlue,
            }}
          >
            {file.name}
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              onClick={() => setOpenViewModal(true)}
              size="small"
              color="primary"
            >
              <RemoveRedEyeOutlined />
            </IconButton>

            <IconButton
              onClick={() => setFile(null)}
              size="small"
              color="error"
            >
              <Close />
            </IconButton>
          </Box>
        </Box>
      )}

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

            <Box sx={{ padding: "20px" }}>
              <Image
                src={imageSrc}
                alt={title}
                width={100}
                height={100}
                layout="responsive"
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default FileUploadContainer;
