import theme from "@/theme";
import { FileDownload, Visibility } from "@mui/icons-material";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import React from "react";

interface IProps {
  title: string;
  data: { label: string; data: string | null }[];
}

const AdminDocumentActions: React.FC<IProps> = ({ title, data }) => {
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
                  <IconButton>
                    <Visibility />
                  </IconButton>

                  <IconButton>
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
    </Paper>
  );
};

export default AdminDocumentActions;
