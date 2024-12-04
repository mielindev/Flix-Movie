import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import TheatersIcon from "@mui/icons-material/Theaters";
import { useDispatch, useSelector } from "react-redux";
import { logout, setInfoUser } from "../../store/slice/user.slice";
import { useNavigate } from "react-router-dom";
import PATH from "../../routes/path";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useMutation } from "@tanstack/react-query";
import userApi from "../../apis/user.api";

const pages = ["Lịch Chiếu", "Cụm Rạp", "Tin Tức", "Ứng Dụng"];
export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const { mutate } = useMutation({
    mutationFn: (token) => userApi.getAccountInfomation(token),
    onError: (err) => {
      console.log("👉 ~ ProfilePage ~ err:", err);
    },
    onSuccess: (res) => {
      dispatch(setInfoUser(res));
    },
  });
  const handleLogin = () => {
    // Logic đăng nhập (thay thế khi cần)
    navigate(PATH.LOGIN);
  };

  const handleRegister = () => {
    navigate(PATH.REGISTER);
  };

  const handleLogout = () => {
    // Logic đăng xuất (thay thế khi cần)
    dispatch(logout());
    navigate(PATH.HOME);
    // handleCloseMenu();
  };

  const handleManageProfile = () => {
    mutate(`Bearer ${currentUser.accessToken}`);
    navigate(PATH.PROFILE);
    handleCloseMenu();
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        mb: 1,
        py: 1,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      color="default"
    >
      <Toolbar variant="dense">
        <Stack width="60%" direction="row" alignItems="center">
          <TheatersIcon sx={{ fontSize: 32, mr: 2 }} />
          <Typography
            letterSpacing={5}
            variant="h5"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => {
              navigate(PATH.HOME);
            }}
            component="a"
          >
            Flix Cinema
          </Typography>
          <Box>
            {pages.map((page) => {
              return (
                <Button sx={{ fontSize: 16, mr: 1 }} key={page} color="inherit">
                  {page}
                </Button>
              );
            })}
          </Box>
        </Stack>
        <Box width="40%" display="flex" justifyContent="flex-end">
          {!currentUser ? (
            <Box>
              <Button
                sx={{ fontSize: 16 }}
                color="inherit"
                onClick={handleLogin}
              >
                <AccountCircleOutlinedIcon sx={{ mr: 2, fontSize: 28 }} />
                Đăng nhập
              </Button>
              <Button
                sx={{ fontSize: 16 }}
                color="inherit"
                onClick={handleRegister}
              >
                <AccountCircleOutlinedIcon sx={{ mr: 2, fontSize: 28 }} />
                Đăng ký
              </Button>
            </Box>
          ) : (
            // Hiển thị avatar khi đã đăng nhập
            <Box>
              <Avatar
                sx={{
                  cursor: "pointer",
                  backgroundColor: "orange",
                  fontSize: 24,
                  fontWeight: 500,
                }}
                onClick={handleMenuOpen}
              >
                {currentUser.hoTen?.charAt(0).toUpperCase()}
              </Avatar>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleManageProfile}>Tài khoản</MenuItem>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
