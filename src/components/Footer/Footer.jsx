import { Box, Container, Link, Typography } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? theme.palette.grey[800]
            : theme.palette.grey[200],
      }}
    >
      <Container maxWidth="md">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} Movie Booking App
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {"Built with "}
          <Link color="inherit" href="https://mui.com/">
            MUI
          </Link>
          {" and "}
          <Link color="inherit" href="https://reactjs.org/">
            React
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
