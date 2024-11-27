import { Box, Toolbar } from "@mui/material";
import React from "react";
import Banner from "../../../components/Banner/Banner";
import MovieList from "../../../components/MovieList/MovieList";

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
    </Box>
  );
}
