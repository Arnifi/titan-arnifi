import {
  Box,
  Button,
  Grid,
  IconButton,
  InputLabel,
  Modal,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import GlobalButton from "../Buttons/GlobalButton";
import { AttachFile, Close } from "@mui/icons-material";
import theme from "@/theme";
import FormProvaider from "@/components/Form";
import FormInputField from "@/components/Form/AInputField";
import FormDateField from "@/components/Form/ADateField";
import { FormikValues } from "formik";

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
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setOthers: React.Dispatch<React.SetStateAction<any>>;
  file: File | null;
}

const EstablishmentCardUploadContainer: React.FC<IProps> = ({
  setFile,
  setOthers,
  file,
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleSubmit = (values: FormikValues) => {
    if (uploadedFile) {
      setOthers({
        establishmentCardId: values?.establishmentCardId,
        establishmentCardIssueDate: values?.establishmentCardIssueDate,
        establishmentCardExpiryDate: values?.establishmentCardExpiryDate,
      });
      setFile(uploadedFile);
      setModalOpen(false);
      setUploadedFile(null);
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
          title={file ? "Upload Again" : "Upload Card"}
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
                Upload Establishment Card
              </Typography>

              <Box>
                <FormProvaider
                  submitHandlar={handleSubmit}
                  initialValues={{
                    establishmentCardId: "",
                    establishmentCardIssueDate: new Date(),
                    establishmentCardExpiryDate: new Date(),
                  }}
                >
                  <Grid paddingY="20px" container spacing={1}>
                    <Grid item xs={12}>
                      <FormInputField
                        required
                        name="establishmentCardId"
                        label="Establishment Card ID"
                        placeholder="Enter Card ID"
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <FormDateField
                        required
                        name="establishmentCardIssueDate"
                        label="Issue Date"
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <FormDateField
                        required
                        name="establishmentCardExpiryDate"
                        label="Expiry Date"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          border: `1.5px solid ${
                            theme.colorConstants?.borderColor as string
                          }`,
                          borderRadius: "6px",
                        }}
                      >
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
                              accept="image/*, application/pdf"
                              // accept="image/*"
                              style={{ display: "none" }}
                              onChange={(event) => {
                                const file: File | undefined =
                                  event.target.files?.[0];
                                if (file !== undefined) {
                                  setUploadedFile(file);
                                }
                              }}
                            />

                            {uploadedFile ? (
                              <FileSuccessLabel fileName={uploadedFile?.name} />
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

                            {!uploadedFile && (
                              <Typography
                                variant="body1"
                                sx={{
                                  fontSize: "14px",
                                  marginLeft: "10px",
                                  fontWeight: 400,
                                }}
                              >
                                Your files must be in JPG or PNG format and does
                                not exceed 10 MB
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "end",
                        }}
                      >
                        <Button
                          disabled={!uploadedFile}
                          type="submit"
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
                    </Grid>
                  </Grid>
                </FormProvaider>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default EstablishmentCardUploadContainer;
