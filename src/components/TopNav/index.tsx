"use client";

import React from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  MenuProps,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import {
  ErrorOutline,
  KeyboardArrowDown,
  Logout,
  Notifications,
} from "@mui/icons-material";
import theme from "@/theme";
import { useAppSelector } from "@/lib/Redux/store";
import GlobalModal from "../Modals/GlobalModal";
import { useRouter } from "next/navigation";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    minWidth: 200,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "5px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const TopNav = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [logoutModal, setLogoutModal] = React.useState(false);
  const { firstname } = useAppSelector((state) => state.authInfo?.loginUser);

  const router = useRouter();

  const logoutHandlar = (): void => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
    setLogoutModal(true);
  };

  const modalInfo = (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <ErrorOutline color="error" sx={{ fontSize: "100px" }} />
      <Typography
        variant="h3"
        sx={{
          color: theme.colorConstants.crossRed,
          fontSize: "24px",
          paddingTop: "20px",
        }}
      >
        Are you sure you want to logout?
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: theme.colorConstants.darkBlue,
          fontSize: "16px",
        }}
      >
        You will be logged out after clicking on <b>Yes</b> button
      </Typography>
    </Box>
  );

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

          <Box display={{ xs: "none", md: "flex" }}>
            <Avatar
              alt={firstname}
              src=""
              sx={{ width: 50, height: 50, mx: "10px" }}
            />

            <Box>
              <Typography
                variant="h6"
                noWrap
                sx={{ ml: "10px", fontWeight: 400, color: "#757575" }}
              >
                Admin
              </Typography>
              <Button
                aria-haspopup="true"
                aria-expanded={true}
                variant="text"
                disableElevation
                onClick={(e) => setAnchorEl(e.currentTarget)}
                endIcon={<KeyboardArrowDown />}
                sx={{
                  color: theme.colorConstants.darkBlue,
                  fontSize: "16px",
                  fontWeight: 600,
                  textTransform: "none",
                  height: "20px",
                }}
              >
                {firstname}
              </Button>
            </Box>
          </Box>
        </Stack>
      </Stack>

      <StyledMenu
        disableScrollLock
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          disableRipple
          onClick={() => {
            setLogoutModal(true);
            setAnchorEl(null);
          }}
        >
          <Logout />
          <Typography sx={{ color: "#3A326D", fontWeight: 500, px: "10px" }}>
            {"Logout"}
          </Typography>
        </MenuItem>
      </StyledMenu>

      <GlobalModal
        title=""
        info={modalInfo}
        okFn={logoutHandlar}
        open={logoutModal}
        setOpen={setLogoutModal}
        loading={false}
      />
    </Box>
  );
};

export default TopNav;
