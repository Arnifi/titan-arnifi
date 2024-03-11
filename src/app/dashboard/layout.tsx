"use client";

import theme from "@/theme";
import SideNav from "@/components/SideNav";
import TopNav from "@/components/TopNav";
import { Box } from "@mui/material";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box display="flex">
      <Box width={"15%"} position={"fixed"}>
        <SideNav />
      </Box>
      <Box marginLeft={"15%"} width={"85%"}>
        <Box
          position={"fixed"}
          width={"85%"}
          zIndex={10}
          bgcolor={theme.colorConstants.white}
        >
          <TopNav />
        </Box>
        <Box
          zIndex={5}
          marginTop={"120px"}
          px={"5%"}
          sx={{ overflow: "hidden" }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
