import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import GlobalButton from "../Buttons/GlobalButton";
import { AttachFile, Close } from "@mui/icons-material";
import theme from "@/theme";
import { ILicenseFiles } from "../Actions/WaitingLicenseApproval";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "none",
  borderRadius: "5px",
  // "@media (min-width: 600px)": {
  //   width: "400px",
  // },
};

const FileSuccessLabel: React.FC<{
  fileName: string;
}> = ({ fileName }) => {
  return (
    <Box
      marginBottom={"10px"}
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderRadius="6px"
      border={`1.5px dashed ${theme.colorConstants.green as string}`}
    >
      <Box display="flex" paddingLeft={"16px"} paddingY={"10px"}>
        <Box paddingX="10px">
          <Typography
            sx={{
              fontSize: { xs: "14px", md: "18px" },
              fontWeight: "600",
              color: theme.colorConstants.darkGray,
            }}
            variant="body1"
          >
            Successfully Uploaded
          </Typography>

          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: "500",
              color: theme.colorConstants.darkGray,
            }}
            variant="body1"
          >
            {fileName}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

interface IProps {
  setFiles: React.Dispatch<React.SetStateAction<ILicenseFiles[]>>;
  files: ILicenseFiles[];
}

const LicenseUploadContainer: React.FC<IProps> = ({ setFiles, files }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const fileAddHandler = () => {
    if (file && fileName) {
      setFiles([...files, { name: fileName, document: file }]);
      setModalOpen(false);
      setFileName("");
      setFile(null);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <GlobalButton
          title={"Upload Documents"}
          loading={false}
          onClick={() => setModalOpen(true)}
        />
      </Box>

      <Modal
        disableScrollLock
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <Box sx={{ ...style }}>
          <Box sx={{ position: "relative" }}>
            <IconButton
              onClick={() => setModalOpen(false)}
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
            >
              <Close />
            </IconButton>

            <Box padding="20px">
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  fontSize: "20px",
                  lineHeight: "27px",
                  color: theme.colorConstants.darkGray,
                }}
              >
                Upload Files
              </Typography>

              <Box
                sx={{
                  paddingY: "30px",
                }}
              >
                <Box
                  sx={{
                    border: `1.5px solid ${
                      theme.colorConstants?.borderColor as string
                    }`,
                    borderRadius: "6px",
                  }}
                >
                  <TextField
                    sx={{ width: "100%" }}
                    placeholder="Enter File Name"
                    onChange={(e) => setFileName(e.target.value)}
                  />

                  <Box
                    sx={{
                      padding: "20px",
                      borderTop: `1.5px solid ${
                        theme.colorConstants?.borderColor as string
                      }`,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <input
                        id={`user-comment-files`}
                        type="file"
                        // accept="image/*, application/pdf"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          const file: File | undefined =
                            event.target.files?.[0];
                          if (file !== undefined) {
                            setFile(file);
                          }
                        }}
                      />

                      {file ? (
                        <FileSuccessLabel fileName={file?.name} />
                      ) : (
                        <InputLabel
                          htmlFor={`user-comment-files`}
                          sx={{
                            fontSize: "14px",
                            fontWeight: 500,
                            width: "300px",
                            height: "50px",
                            bgcolor: theme.colorConstants.primaryBlue,
                            color: theme.colorConstants.white,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          <AttachFile
                            sx={{ rotate: "45deg", marginRight: "10px" }}
                          />
                          Attach File
                        </InputLabel>
                      )}

                      {!file && (
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: "14px",
                            marginLeft: "10px",
                            fontWeight: 400,
                          }}
                        >
                          Your files must be in JPG or PNG format and does not
                          exceed 10 MB
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <Button
                  disabled={!file || !fileName}
                  onClick={fileAddHandler}
                  variant="contained"
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    textTransform: "none",
                    boxShadow: "none",
                    ":hover": {
                      boxShadow: "none",
                    },
                  }}
                >
                  Add
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default LicenseUploadContainer;
