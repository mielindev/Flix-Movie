import { Box, Toolbar } from "@mui/material";
import React from "react";
import Banner from "../../../components/Banner/Banner";
import MovieList from "./MovieList";
import Schedule from "./Schedule";

export default function HomePage() {
  return (
    <Box
      sx={{
        backgroundColor: "#e8ecef",
      }}
    >
      <Toolbar />
      <Banner />
      <MovieList />
      <Schedule />
    </Box>
  );
}
