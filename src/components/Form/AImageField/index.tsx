import React, { useRef, useState } from "react";
import { Box, InputLabel, Typography } from "@mui/material";
import { css, styled } from "@mui/material/styles";
import theme from "../../../../../Theme";
import { IFileSuccess } from "../../../../../assets/icons";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Field, FieldProps } from "formik";
import { IUploadImage } from "../../../interfaces";
import ImageIcon from "../../../../../assets/icons/image.svg";
import { pdfjs } from "react-pdf";

const LabelStyle = styled(InputLabel)<{ error: boolean }>(
  ({ error }) => css`
    cursor: pointer;
    &:hover {
      background-color: rgba(246, 246, 246, 0.6);
    }
    border: ${error ? "2px" : "1px"} dashed
      ${error ? theme.colorConstants.crossRed : theme.palette.primary.main};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    flex-direction: column;
    border-radius: 10px;
    @media (min-width: 600px) {
      padding: 50px;
    }
  `
);

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.colorConstants.doneGreen,
  },
}));

interface IInput {
  name: string;
  label?: string;
}

const FormImageField: React.FC<IInput> = ({ name, label }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState<boolean>(false);

  const pdfToImageBlob = async (file: File): Promise<Blob | null> => {
    const pdfData = await file.arrayBuffer();
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

    const loadingTask = pdfjs.getDocument(new Uint8Array(pdfData));
    const pdf = await loadingTask.promise;

    const pageNumber = 1;
    const page = await pdf.getPage(pageNumber);

    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement("canvas");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const context = canvas.getContext("2d")!;

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport,
    };

    await page.render(renderContext).promise;

    return await new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/png");
    });
  };

  const uploadHandelar = async (
    file: File,
    fieldValue: FieldProps
  ): Promise<void> => {
    const reader = new FileReader();
    if (file.type === "application/pdf") {
      await pdfToImageBlob(file).then((blob) => {
        if (blob !== null) {
          reader.onload = () => {
            const uploadedImage: IUploadImage = {
              name: file.name,
              url: reader.result as string,
            };
            void fieldValue.form.setFieldValue(name, uploadedImage);
          };
          reader.readAsDataURL(blob);
        }
      });
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        const uploadedImage: IUploadImage = {
          name: file.name,
          url: reader.result as string,
        };
        void fieldValue.form.setFieldValue(name, uploadedImage);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box>
      <Typography
        variant="body1"
        sx={{
          color: theme.colorConstants.lightPurple,
          fontWeight: 500,
          marginBottom: "10px",
        }}
      >
        {label ?? label}
      </Typography>

      <Field name={name}>
        {(fieldValue: FieldProps) => {
          const imageValues = fieldValue.field.value as IUploadImage;

          return (
            <Box position="relative" width="100%" height="100%">
              <input
                id={`file-upload-${name}`}
                type="file"
                accept="image/*, application/pdf"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(event) => {
                  const file: File | undefined = event.target.files?.[0];
                  if (file !== undefined) {
                    uploadHandelar(file, fieldValue).catch((error) => {
                      console.error("Error uploading:", error);
                    });
                  }
                }}
              />

              <LabelStyle
                error={
                  fieldValue.meta.touched && Boolean(fieldValue.meta.error)
                }
                htmlFor={`file-upload-${name}`}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  const file: File | undefined = e.dataTransfer.files?.[0];
                  if (file !== undefined) {
                    uploadHandelar(file, fieldValue).catch((error) => {
                      console.error("Error uploading:", error);
                    });
                  }
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
              >
                {imageValues.url !== "" ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <Box sx={{ width: { xs: "30px", md: "50px" } }}>
                      <IFileSuccess width={"100%"} height={"100%"} />
                    </Box>

                    <Box
                      sx={{
                        textAlign: "center",
                        marginTop: "10px",
                      }}
                    >
                      <Typography
                        gutterBottom
                        sx={{
                          fontSize: { xs: "14px", md: "18px" },
                          fontWeight: "600",
                          color: theme.colorConstants.darkGray,
                        }}
                        variant="body1"
                      >
                        Successfully uploaded!
                      </Typography>

                      <Box
                        width={{ xs: "230px", md: "350px" }}
                        marginTop={{ xs: "10px", md: "20px" }}
                      >
                        <BorderLinearProgress
                          variant="determinate"
                          value={100}
                        />
                        <Box
                          display="flex"
                          justifyContent={"space-between"}
                          alignContent={"center"}
                        >
                          <Typography
                            sx={{
                              color: theme.palette.secondary.main,
                              fontWeight: 500,
                              fontSize: { xs: "10px", md: "12px" },
                            }}
                            variant="h6"
                          >
                            {imageValues?.name?.length > 20
                              ? imageValues?.name?.substring(0, 20) +
                                "..." +
                                imageValues?.name?.slice(-4)
                              : imageValues?.name}
                          </Typography>
                          <Typography
                            sx={{
                              color: theme.palette.secondary.main,
                              fontWeight: 500,
                            }}
                            variant="h6"
                          >
                            100%
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <Box
                      sx={{ width: { xs: "50px", md: "80px" } }}
                      component={"img"}
                      src={ImageIcon}
                    />

                    <Box
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        gutterBottom
                        sx={{
                          fontSize: { xs: "14px", md: "18px" },
                          fontWeight: "600",
                          color: theme.colorConstants.darkGray,
                        }}
                        variant="body1"
                      >
                        Drag your image here or{" "}
                        <span
                          style={{
                            color: theme.palette.primary.main,
                          }}
                        >
                          Browse
                        </span>
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: { xs: "12px", md: "14px", lg: "16px" },
                          fontWeight: "400",
                          color: theme.colorConstants.lightGrey,
                          textAlign: "center",
                          whiteSpace: { xs: "normal", md: "pre-line" },
                          display: { xs: "block", sm: "none" },
                        }}
                      >
                        {`Your file must be in JPG/PNG or PDF format and does not ${"\n"}
                        exceed 10 MB`}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "16px",
                          fontWeight: "400",
                          color: theme.colorConstants.lightGrey,
                          textAlign: "center",
                          display: { xs: "none", sm: "block" },
                        }}
                      >
                        Your file must be in JPG/PNG or PDF format and does not{" "}
                        <br />
                        exceed 10 MB
                      </Typography>
                    </Box>
                  </Box>
                )}

                {dragOver && (
                  <Box
                    position="absolute"
                    width="100%"
                    height="100%"
                    top="0"
                    left="0"
                  >
                    <Box
                      height={"100%"}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        bgcolor: "rgba(246, 246, 246, 0.7)",
                        zIndex: 1,
                        borderRadius: "10px",
                        duration: "1s",
                      }}
                    >
                      <Typography
                        variant="h2"
                        color={theme.colorConstants.darkGray}
                      >
                        Drop Here.
                      </Typography>
                    </Box>
                  </Box>
                )}
              </LabelStyle>
            </Box>
          );
        }}
      </Field>
    </Box>
  );
};

export default FormImageField;
