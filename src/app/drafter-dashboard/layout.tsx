"use client";

import theme from "@/theme";
import SideNav from "@/components/SideNav";
import TopNav from "@/components/TopNav";
import { Box, Button } from "@mui/material";
import React from "react";
import { BarChart, Description, Logout, Settings } from "@mui/icons-material";
import Link from "next/link";
import ProtectedRouteHOC from "@/lib/ProtectedRoute";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const items = [
    {
      label: "Overview",
      path: "/drafter-dashboard",
      icon: <BarChart />,
    },
    {
      label: "Legal Documents",
      path: "/drafter-dashboard/legal-documents",
      icon: <Description />,
    },
    {
      label: "Settings",
      path: "/drafter-dashboard/settings",
      icon: <Settings />,
    },
  ];

  return (
    <Box display="flex">
      <Box width={"15%"} position={"fixed"}>
        <SideNav
          SwitchTo={
            <Link href={"/"}>
              <Button
                startIcon={<Logout />}
                variant="contained"
                fullWidth
                size="small"
                sx={{ textTransform: "none", borderRadius: 1 }}
              >
                Company Dashboard
              </Button>
            </Link>
          }
          navigateItems={items}
        />
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

export default ProtectedRouteHOC(DashboardLayout);
