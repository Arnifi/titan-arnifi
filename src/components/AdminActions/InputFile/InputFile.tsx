import theme from "@/theme";
import { CheckCircle, Filter } from "@mui/icons-material";
import {
  Box,
  InputLabel,
  LinearProgress,
  Typography,
  css,
  linearProgressClasses,
  styled,
} from "@mui/material";
import React, { useRef, useState } from "react";

const LabelStyle = styled(InputLabel)(
  () => css`
    cursor: pointer;
    &:hover {
      background-color: rgba(246, 246, 246, 0.6);
    }
    border: 1px dashed ${theme.palette.primary.main};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    flex-direction: column;
    border-radius: 10px;
    @media (min-width: 600px) {
      padding: 30px;
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

interface IProps {
  setFile: (file: File | null) => void;
}

const InputFile: React.FC<IProps> = ({ setFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");

  const uploadHandelar = async (file: File): Promise<void> => {
    setFile(file);
    setFileName(file.name);
  };

  return (
    <Box marginTop="10px" position="relative" width="100%" height="100%">
      <input
        id={`upload-payment-slip`}
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(event) => {
          const file: File | undefined = event.target.files?.[0];
          if (file !== undefined) {
            uploadHandelar(file).catch((error) => {
              console.error("Error uploading:", error);
            });
          }
        }}
      />

      <LabelStyle
        htmlFor={`upload-payment-slip`}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file: File | undefined = e.dataTransfer.files?.[0];
          if (file !== undefined) {
            uploadHandelar(file).catch((error) => {
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
        {fileName !== "" ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <CheckCircle
              sx={{
                fontSize: "30px",
                color: theme.colorConstants.doneGreen,
              }}
            />

            <Box
              sx={{
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: theme.colorConstants.darkGray,
                }}
                variant="body1"
              >
                Successfully uploaded!
              </Typography>

              <Box width="250px">
                <BorderLinearProgress variant="determinate" value={100} />
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
                    {fileName?.length > 20
                      ? fileName?.substring(0, 20) + "..." + fileName?.slice(-4)
                      : fileName}
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
            <Filter
              sx={{
                fontSize: "30px",
                color: theme.colorConstants.darkGray,
              }}
            />

            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  fontSize: "14px",
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
                  lineHeight: 1.2,
                  fontSize: "12px",
                  fontWeight: "400",
                  color: theme.colorConstants.lightGrey,
                  textAlign: "center",
                }}
              >
                Your file must be in JPG/PNG or PDF format <br /> and does not
                exceed 10 MB
              </Typography>
            </Box>
          </Box>
        )}

        {dragOver && (
          <Box position="absolute" width="100%" height="100%" top="0" left="0">
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
              <Typography variant="h2" color={theme.colorConstants.darkGray}>
                Drop Here.
              </Typography>
            </Box>
          </Box>
        )}
      </LabelStyle>
    </Box>
  );
};

export default InputFile;
