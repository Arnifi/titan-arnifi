"use client";

import theme from "@/theme";
import SideNav from "@/components/SideNav";
import TopNav from "@/components/TopNav";
import { Box, Button } from "@mui/material";
import React, { Suspense } from "react";
import { BarChart, Business, Description, Logout } from "@mui/icons-material";
import Link from "next/link";
import ProtectedRouteHOC from "@/lib/ProtectedRoute";
import GlobalLoader from "@/components/Loaders/GlobalLoader";
import { useGetAllUserWithInfoQuery } from "@/lib/Redux/features/users/userApi";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading: userWithInfoLoading } = useGetAllUserWithInfoQuery({});

  const items = [
    {
      label: "Overview",
      path: "/",
      icon: <BarChart />,
    },
    {
      label: "Company Forms",
      path: "/company-applications",
      icon: <Business />,
    },
    {
      label: "Visa Applications",
      path: "/visa-applications",
      icon: <Description />,
    },
  ];

  return (
    <Box
      display="flex"
      minHeight={"100vh"}
      sx={{ bgcolor: theme.colorConstants.whitishGray }}
    >
      <Box width={"15%"} position={"fixed"}>
        <SideNav
          SwitchTo={
            <Link href={"/drafter-dashboard"}>
              <Button
                startIcon={<Logout />}
                variant="contained"
                fullWidth
                size="small"
                sx={{ textTransform: "none", borderRadius: 1 }}
              >
                Drafter Dashboard
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
          {userWithInfoLoading ? (
            <GlobalLoader height="70vh" />
          ) : (
            <Suspense fallback={<GlobalLoader height="70vh" />}>
              {children}
            </Suspense>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProtectedRouteHOC(DashboardLayout);
