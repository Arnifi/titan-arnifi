"use client";

import theme from "@/theme";
import { Box, Typography, Grid } from "@mui/material";
import Link from "next/link";
import React from "react";

interface ICardProps {
  color: string;
  title: string;
  count: number;
}
const CustomCard: React.FC<ICardProps> = ({ color, title, count }) => {
  return (
    <Box
      sx={{
        bgcolor: color,
        borderRadius: "10px",
        paddingY: "40px",
        paddingX: "30px",
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
          marginTop: "10px",
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

const Dashboard = () => {
  return (
    <Box>
      <Box>
        <Typography variant="h3" sx={{ color: theme.colorConstants.darkBlue }}>
          Dashboard Tasks
        </Typography>
      </Box>

      <Box
        sx={{
          marginY: "30px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "5px",
                boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
              }}
            >
              <Box
                sx={{
                  paddingX: "40px",
                  paddingY: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: theme.colorConstants.darkBlue,
                  }}
                >
                  Company Applications
                </Typography>
                <Link href="/">
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: theme.colorConstants.primaryBlue,
                    }}
                  >
                    View Applications
                  </Typography>
                </Link>
              </Box>

              <Grid
                container
                spacing={2}
                sx={{
                  paddingX: "40px",
                  paddingBottom: "40px",
                }}
              >
                <Grid item xs={6}>
                  <CustomCard color="#EBEEFB" title="Review" count={30} />
                </Grid>

                <Grid item xs={6}>
                  <CustomCard
                    color="#EBEEFB"
                    title="Waiting on Authority"
                    count={24}
                  />
                </Grid>

                <Grid item xs={6}>
                  <CustomCard color="#EBEEFB" title="In Progress" count={52} />
                </Grid>

                <Grid item xs={6}>
                  <CustomCard color="#FBD2D2" title="Reject" count={10} />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "5px",
                boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
              }}
            >
              <Box
                sx={{
                  paddingX: "40px",
                  paddingY: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: theme.colorConstants.darkBlue,
                  }}
                >
                  Visa Applications
                </Typography>
                <Link href="/">
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: theme.colorConstants.primaryBlue,
                    }}
                  >
                    View Applications
                  </Typography>
                </Link>
              </Box>

              <Grid
                container
                spacing={2}
                sx={{
                  paddingX: "40px",
                  paddingBottom: "40px",
                }}
              >
                <Grid item xs={6}>
                  <CustomCard color="#EBEEFB" title="Review" count={30} />
                </Grid>

                <Grid item xs={6}>
                  <CustomCard
                    color="#EBEEFB"
                    title="Waiting on Authority"
                    count={24}
                  />
                </Grid>

                <Grid item xs={6}>
                  <CustomCard color="#EBEEFB" title="In Progress" count={52} />
                </Grid>

                <Grid item xs={6}>
                  <CustomCard color="#FBD2D2" title="Reject" count={10} />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
