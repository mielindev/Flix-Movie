import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import { Box } from "@mui/material";

export default function MainLayout({ children }) {
  return (
    <div className="max-w-screen">
      <Header />
      {children}
      <Outlet />
    </div>
  );
}
