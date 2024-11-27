import { Box, Breadcrumbs, CssBaseline, Stack, Toolbar } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Slidebar from "./_components/Slidebar";
import Header from "../../components/Header/Header";
import { drawerWidth } from "../../constants";

export default function AdminLayout({ children }) {
  return (
    <Box>
      <CssBaseline />
      <Header />
      <Slidebar />
      <Box
        sx={{
          ml: { sm: `${drawerWidth}px` },
          p: 2,
        }}
      >
        <Toolbar />
        {children}
        <Outlet />
      </Box>
    </Box>
  );
}
