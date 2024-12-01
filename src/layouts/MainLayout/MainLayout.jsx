import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import { Box, Toolbar } from "@mui/material";

export default function MainLayout({ children }) {
  return (
    <Box className="max-w-screen">
      <Header />
      <Box>
        {children}
        <Outlet />
      </Box>
    </Box>
  );
}
