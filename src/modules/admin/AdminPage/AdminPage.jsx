import { Box, Breadcrumbs, Toolbar, Typography } from "@mui/material";
import React from "react";

export default function AdminPage() {
  return (
    <Box>
      <Box sx={{ my: 2 }}>
        <Breadcrumbs>
          <Typography sx={{ color: "text.primary", fontWeight: 600 }}>
            Dashboard
          </Typography>
        </Breadcrumbs>
      </Box>
    </Box>
  );
}
