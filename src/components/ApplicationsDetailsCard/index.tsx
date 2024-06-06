import theme from "@/theme";
import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";

interface IData {
  label: string;
  value: string | number;
  weight: number;
}

interface IProps {
  title: string;
  data: IData[];
}

const ApplicationsDetailsCard: React.FC<IProps> = ({ title, data }) => {
  return (
    <Paper sx={{ padding: "20px" }} variant="outlined">
      <Typography
        gutterBottom
        variant="h4"
        sx={{
          fontSize: "18px",
          color: theme.colorConstants.black,
        }}
      >
        {title}
      </Typography>

      <Box marginTop={"20px"}>
        <Grid container spacing={1}>
          {data?.map((item, i) => (
            <Grid item xs={item?.weight} key={i}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "12px",
                  color: theme.colorConstants.lightPurple,
                }}
              >
                {item?.label}
              </Typography>

              <Typography
                gutterBottom
                variant="body1"
                sx={{
                  fontSize: "14px",
                  color: theme.colorConstants.darkBlue,
                  fontWeight: 700,
                }}
              >
                {item?.value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default ApplicationsDetailsCard;
