import React, { useState } from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid2,
  IconButton,
  Rating,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import movieApi from "../../../apis/movie.api";
import dayjs from "dayjs";
import { TabContext, TabList, TabPanel } from "@mui/lab";

export default function MovieDetails() {
  const [value, setValue] = useState(1);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };
  const { movieId } = useParams();
  const { data } = useQuery({
    queryKey: ["movieDetails", movieId],
    queryFn: () => movieApi.getMoviedDetails(movieId),
  });
  const { data: movieList } = useQuery({
    queryKey: ["movieList"],
    queryFn: () => movieApi.getMovieList(),
  });
  console.log("👉 ~ MovieDetails ~ movieList:", movieList);
  const tenPhim = data?.tenPhim || "";
  const hinhAnh = data?.hinhAnh || "";
  const moTa = data?.moTa || "";
  const trailer = data?.trailer || "";
  const ngayKhoiChieu = data?.ngayKhoiChieu || "";
  const danhGia = data?.danhGia || 10;
  const movieListItem = movieList
    ? movieList.filter((movie) => {
        return movie.maPhim !== movieId * 1;
      })
    : [];
  return (
    <Container>
      <Toolbar />
      <Breadcrumbs sx={{ mt: 2 }}>
        <Typography>Trang chủ</Typography>
        <Typography>{tenPhim}</Typography>
      </Breadcrumbs>
      <Grid2 container sx={{ mt: 2 }}>
        <Grid2 size={9} sx={{ px: 2 }}>
          <Grid2 container>
            <Grid2 size={3}>
              <CardMedia
                sx={{ height: 350, objectFit: "fill" }}
                component="img"
                image={hinhAnh}
              />
            </Grid2>
            <Grid2 size={9} sx={{ px: 2 }}>
              <Typography sx={{ fontSize: 32, fontWeight: 700 }} component="h3">
                {tenPhim}
              </Typography>
              <Stack direction="row" my={1} spacing={1}>
                <Button
                  size="small"
                  startIcon={<FavoriteBorderIcon />}
                  variant="contained"
                  color="error"
                >
                  Thích
                </Button>
                <Button
                  size="small"
                  startIcon={<FavoriteBorderIcon />}
                  variant="contained"
                  color="error"
                >
                  Thích
                </Button>
                <Button
                  size="small"
                  startIcon={<FavoriteBorderIcon />}
                  variant="contained"
                  color="error"
                >
                  Thích
                </Button>
                <Button
                  size="small"
                  startIcon={<FavoriteBorderIcon />}
                  variant="contained"
                  color="error"
                >
                  Thích
                </Button>
              </Stack>
              <Typography
                align="justify"
                sx={{ my: 2, whiteSpace: "normal", wordBreak: "break-word" }}
              >
                {moTa}
              </Typography>
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Stack direction="row" alignItems="center">
                    <CalendarMonthIcon sx={{ mr: 1 }} />{" "}
                    <Typography>Đánh giá</Typography>
                  </Stack>
                  <Chip
                    sx={{ mt: 2 }}
                    variant="outlined"
                    label={<Rating value={danhGia} readOnly />}
                  />
                </Box>
                <Box>
                  <Stack direction="row" alignItems="center">
                    <CalendarMonthIcon sx={{ mr: 1 }} />{" "}
                    <Typography>Ngày khởi chiếu</Typography>
                  </Stack>
                  <Chip
                    sx={{ mt: 2 }}
                    variant="outlined"
                    label={
                      ngayKhoiChieu
                        ? dayjs(ngayKhoiChieu).format("DD/MM/YYYY")
                        : "2024-11-30"
                    }
                  />
                </Box>
                <Box>
                  <Stack direction="row" alignItems="center">
                    <CalendarMonthIcon sx={{ mr: 1 }} />{" "}
                    <Typography>Giới hạn độ tuổi</Typography>
                  </Stack>
                  <Chip sx={{ mt: 2 }} variant="outlined" label="T18" />
                </Box>
              </Stack>
            </Grid2>
          </Grid2>
          <Grid2 mt={2}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Thông tin phim" value={1} />
                    <Tab label="Lịch chiếu" value={2} />
                    <Tab label="Mua vé" value={3} />
                  </TabList>
                </Box>
                <TabPanel value={1}>
                  <Box>
                    <iframe
                      width="100%"
                      height="415"
                      src={trailer}
                      title={tenPhim}
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin"
                      allowfullscreen
                    ></iframe>
                  </Box>
                </TabPanel>
                <TabPanel value={2}>Item Two</TabPanel>
                <TabPanel value={3}>Item Three</TabPanel>
              </TabContext>
            </Box>
          </Grid2>
        </Grid2>
        <Grid2 size={3}>
          <Box
            sx={{
              p: 1,
              color: "white",
              backgroundColor: "red",
              borderRadius: "10px 10px 0px 0px",
              textAlign: "center",
            }}
          >
            <Typography
              component="h3"
              sx={{ fontSize: 16, fontWeight: 600, textTransform: "uppercase" }}
            >
              Other movies
            </Typography>
          </Box>
          <Box sx={{ py: 1 }}>
            {movieListItem.map((movie) => {
              return (
                <Grid2 mb={2} container key={movie.maPhim}>
                  <Grid2 size={4}>
                    <CardMedia component="img" image={movie.hinhAnh} />
                  </Grid2>
                  <Grid2 size={8}>
                    <Typography
                      sx={{ fontSize: 18, fontWeight: 600, ml: 1 }}
                      component="h5"
                    >
                      {movie.tenPhim}
                    </Typography>
                    <Typography ml={1} variant="body2" component="span">
                      Vietsub
                    </Typography>
                  </Grid2>
                </Grid2>
              );
            })}
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
}
