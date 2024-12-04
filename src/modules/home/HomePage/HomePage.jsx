import { Box, Toolbar } from "@mui/material";
import React from "react";
import Banner from "../../../components/Banner/Banner";
import MovieList from "./MovieList";
import Schedule from "./Schedule";
import { useQuery } from "@tanstack/react-query";
import movieApi from "../../../apis/movie.api";
import Loading from "../../../components/Loading/Loading";

export default function HomePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["bannerList"],
    queryFn: () => movieApi.getBannerMovie(),
  });

  const { data: queryMovie, isPending } = useQuery({
    queryKey: ["movieList"],
    queryFn: () => movieApi.getMovieList(),
  });

  const bannerList = data ? data : [];
  const movieList = queryMovie ? queryMovie : [];

  return (
    <Box
      sx={{
        backgroundColor: "#e8ecef",
      }}
    >
      {isLoading || isPending ? (
        <Loading />
      ) : (
        <Box>
          <Toolbar />
          <Banner bannerList={bannerList} />
          <MovieList movieList={movieList} />
          <Schedule />
        </Box>
      )}
    </Box>
  );
}
