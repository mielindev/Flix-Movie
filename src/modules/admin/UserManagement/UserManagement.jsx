import React from "react";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { NavLink } from "react-router-dom";
import PATH from "../../../routes/path";

export default function UserManagement() {
  return (
    <Box>
      <Box sx={{ my: 2 }}>
        <Breadcrumbs separator={<NavigateNextIcon />} aria-label="breadcrumb">
          <NavLink to={PATH.ADMIN}>Dashboard</NavLink>
          <Typography sx={{ color: "text.primary", fontWeight: 600 }}>
            User Management
          </Typography>
        </Breadcrumbs>
      </Box>
    </Box>
  );
}
