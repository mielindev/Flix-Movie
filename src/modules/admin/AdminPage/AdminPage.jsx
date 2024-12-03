import {
  Box,
  Breadcrumbs,
  keyframes,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";

export default function AdminPage() {
  const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

  return (
    <Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Animated Gradient Text */}
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            background:
              "linear-gradient(45deg, #ff0080, #ff8c00, #40e0d0, #8a2be2)",
            backgroundSize: "300% 300%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: `${gradientAnimation} 5s ease infinite`,
            fontWeight: "bold",
            textAlign: "center",
            letterSpacing: "0.1em",
          }}
        >
          Welcome to the Admin Dashboard
        </Typography>

        {/* Animated Underline */}
        <Box
          sx={{
            width: "60%",
            height: "4px",
            background:
              "linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0, #8a2be2)",
            backgroundSize: "200% 200%",
            animation: `${gradientAnimation} 5s linear infinite`,
            borderRadius: "2px",
            mt: 1,
          }}
        />

        {/* Supporting Text */}
        <Typography
          variant="body1"
          sx={{
            marginTop: 4,
            color: "text.secondary",
            fontSize: "1.2rem",
            textAlign: "center",
          }}
        >
          Select a section from the sidebar to manage the platform. Enjoy the
          journey!
        </Typography>
      </Box>
    </Box>
  );
}
