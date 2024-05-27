import theme from "@/theme";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";

interface ICardProps {
  color: string;
  title: string;
  count: string;
}

export const CustomCard: React.FC<ICardProps> = ({ color, title, count }) => {
  return (
    <Box
      sx={{
        bgcolor: color,
        borderRadius: "6px",
        paddingY: "20px",
        paddingX: "20px",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontSize: "32px",
          fontWeight: 700,
          color: theme.colorConstants.darkBlue,
        }}
      >
        {count}
      </Typography>

      <Typography
        variant="h3"
        sx={{
          fontSize: "16px",
          fontWeight: 600,
          color: theme.colorConstants.mediumGray,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

interface IProps {
  data: { leble: string; color: string; count: number }[];
}
const DashboardCard: React.FC<IProps> = ({ data }) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        paddingX: "40px",
        paddingBottom: "40px",
      }}
    >
      {data?.map((item, i) => (
        <Grid item xs={4} key={i}>
          <CustomCard
            color={item?.color}
            title={item?.leble}
            count={item?.count.toString().padStart(2, "0")}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardCard;
