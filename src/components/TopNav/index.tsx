"use client";

import React from "react";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
} from "@mui/material";
import { Notifications } from "@mui/icons-material";

const TopNav = () => {
  return (
    <Box
      height="85px"
      width="100%"
      display="flex"
      justifyContent="end"
      px={2}
      zIndex={10}
      sx={{
        boxShadow: "0px 20px 51px 0px rgba(66, 129, 233, 0.20)",
        borderBottom: "2px solid black",
      }}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{
          px: 2,
        }}
      >
        <Stack alignItems="center" direction="row" spacing={2}>
          <Tooltip title="Notifications">
            <IconButton>
              <Badge badgeContent={4} color="success" variant="dot">
                <SvgIcon fontSize="small">
                  <Notifications />
                </SvgIcon>
              </Badge>
            </IconButton>
          </Tooltip>
          <Avatar
            sx={{
              cursor: "pointer",
              height: 40,
              width: 40,
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default TopNav;
