import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid2,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import Banner from "../../../components/Banner/Banner";
import { useQuery } from "@tanstack/react-query";
import movieApi from "../../../apis/movie.api";
import ClosedCaptionIcon from "@mui/icons-material/ClosedCaption";

export default function HomePage() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["movieList"],
    queryFn: () => movieApi.getMovieList(),
  });
  console.log("👉 ~ HomePage ~ data:", data);
  const movieList = data ? data : [];
  return (
    <Box>
      <Toolbar />
      <Banner />
      <Grid2 container spacing={2} sx={{ width: "60%", mx: "auto", mt: 6 }}>
        {movieList.map((movie) => {
          return (
            <Grid2 size={3}>
              <Card sx={{ borderRadius: "12px", overflow: "hidden" }}>
                <CardActionArea>
                  <CardMedia
                    sx={{
                      height: 300,
                      objectFit: "fill",
                    }}
                    component="img"
                    image={movie.hinhAnh}
                  />
                  <CardContent>
                    <Stack justifyContent="space-between" sx={{ height: 120 }}>
                      <Box height="50%">
                        <Typography
                          component="h3"
                          sx={{
                            fontSize: 20,
                            fontWeight: 700,
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            lineHeight: 1.25,
                          }}
                        >
                          <ClosedCaptionIcon
                            sx={{
                              fontSize: 32,
                              // mr: 1,
                              color: "red",
                              borderRadius: "12px",
                              lineHeight: 2,
                            }}
                          />
                          {movie.tenPhim}
                        </Typography>
                      </Box>
                      <Box height="50%">
                        <Typography
                          sx={{
                            fontWeight: 600,
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            color: "gray",
                          }}
                          variant="subtitle2"
                          component="span"
                        >
                          {movie.moTa ? movie.moTa : "N/A"}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid2>
          );
        })}
      </Grid2>
    </Box>
  );
}
