import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";

export default function AuthLayout({ children }) {
  return (
    <Box className="w-screen h-screen flex justify-center items-center">
      <Box className="bg-white rounded-2xl p-8">
        <Box className="w-full flex items-center justify-center">
          <img className="w-20 cursor-pointer" src="/vite.svg" alt="Logo" />
        </Box>
        {children}
        <Outlet />
      </Box>
    </Box>
  );
}
