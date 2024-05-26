"use client";

import {
  Box,
  Button,
  ButtonBase,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import theme from "@/theme";
import Image from "next/image";
import { BarChart, Description, Logout, Settings } from "@mui/icons-material";
import Logo from "@/assets/images/logo.png";

export interface INavigateLink {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface IProps {
  SwitchTo: React.ReactElement;
  navigateItems: INavigateLink[];
}

const SideNav: React.FC<IProps> = ({ SwitchTo, navigateItems }) => {
  const pathname = usePathname();

  console.log(pathname);

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
        height={"80vh"}
        display={"flex"}
        justifyContent={"space-between"}
        flexDirection={"column"}
        gap={2}
      >
        <Stack width={"100%"} gap={1}>
          {navigateItems.map((item, i) => (
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

        <Box>
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              color: theme.colorConstants.whitishGray,
            }}
          >
            Switch to
          </Typography>

          {SwitchTo}
        </Box>
      </Box>
    </Box>
  );
};

export default SideNav;
