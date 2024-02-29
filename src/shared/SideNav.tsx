"use client";

import {
  Box,
  Button,
  ButtonBase,
  Divider,
  Stack,
  SvgIcon,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import theme from "@/theme";
import Image from "next/image";
import { BarChart, Description, Logout, Settings } from "@mui/icons-material";
import Logo from "@/assets/images/logo.png";

const SideNav = () => {
  const pathname = usePathname();

  const items = [
    {
      label: "Overview",
      path: "/dashboard",
      icon: <BarChart />,
    },
    {
      label: "Legal Documents",
      path: "/dashboard/legal-documents",
      icon: <Description />,
    },
    {
      label: "Settings",
      path: "/dashboard/settings",
      icon: <Settings />,
    },
  ];

  return (
    <Box
      sx={{ bgcolor: theme.colorConstants.darkGray, color: "white" }}
      height="100vh"
      padding={2}
    >
      <Box width={150}>
        <Image
          width={200}
          height={100}
          src={Logo}
          alt="Arnifi."
          layout="responsive"
        />
      </Box>

      <Divider sx={{ mt: 1, mb: 2, bgcolor: "white" }} />

      <Box
        height={"85vh"}
        display={"flex"}
        justifyContent={"space-between"}
        flexDirection={"column"}
        gap={2}
      >
        <Stack width={"100%"} gap={1}>
          {items.map((item, i) => (
            <Box key={i} width={"100%"} sx={{ color: "red" }}>
              <ButtonBase
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  padding: 1,
                  borderRadius: 1,
                  bgcolor: pathname === item.path ? "#3d3f42" : "transparent",
                  fontWeight: pathname === item.path ? "600" : "normal",
                  color:
                    pathname === item.path
                      ? theme.colorConstants.white
                      : "#d2d5db",

                  "&:hover": {
                    bgcolor: "#3d3f42",
                    color: theme.colorConstants.white,
                  },
                }}
                component={Link}
                href={item.path}
              >
                <SvgIcon
                  fontSize="small"
                  sx={{
                    mr: 2,
                  }}
                >
                  {item.icon}
                </SvgIcon>
                {item.label}
              </ButtonBase>
            </Box>
          ))}
        </Stack>
        <Button
          startIcon={<Logout />}
          variant="contained"
          fullWidth
          size="large"
          sx={{ textTransform: "none", borderRadius: 1 }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default SideNav;
