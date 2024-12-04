import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import { Box, Toolbar } from "@mui/material";
import Footer from "../../components/Footer/Footer";

export default function MainLayout({ children }) {
  return (
    <Box className="max-w-screen">
      <Header />
      <Box sx={{ minHeight: "90vh" }}>
        {children}
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
