import React, { useState } from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Pagination,
  PaginationItem,
  Rating,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import movieApi from "../../../apis/movie.api";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CastConnectedIcon from "@mui/icons-material/CastConnected";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { NavLink } from "react-router-dom";
import PATH from "../../../routes/path";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: 700,
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function MovieManagement() {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [movieId, setMovieId] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movieListPagination", page],
    queryFn: () => movieApi.getMovieListPagination(page),
  });

  const { mutate } = useMutation({
    mutationFn: (id) => movieApi.deleteMovie(id),
    onError: (error) => {
      console.log("👉 ~ MovieManagement ~ error:", error);
    },
    onSuccess: (response) => {
      console.log("👉 ~ MovieManagement ~ response:", response);
    },
  });

  const handleChangePage = (_event, value) => {
    setPage(value);
  };

  const handleDeleteMovie = () => {
    mutate(movieId);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const movieListPagination = data?.items || [];
  return (
    <Box sx={{ maxHeight: "100vh" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ my: 2 }}
      >
        <Breadcrumbs separator={<NavigateNextIcon />} aria-label="breadcrumb">
          <NavLink to={PATH.ADMIN}>Dashboard</NavLink>
          <Typography sx={{ color: "text.primary", fontWeight: 600 }}>
            Movie Management
          </Typography>
        </Breadcrumbs>
        <Button sx={{ px: 3 }} color="primary" variant="contained">
          Thêm phim
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Tên phim</StyledTableCell>
              <StyledTableCell>Mô tả</StyledTableCell>
              <StyledTableCell>Hình ảnh</StyledTableCell>
              <StyledTableCell>Ngày khởi Chiếu</StyledTableCell>
              <StyledTableCell>Hot</StyledTableCell>
              <StyledTableCell>Trạng thái</StyledTableCell>
              <StyledTableCell>Đánh giá</StyledTableCell>
              <StyledTableCell>Thao tác</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movieListPagination.map((movie) => {
              return (
                <StyledTableRow key={movie.maPhim}>
                  <StyledTableCell width={140}>
                    <Typography
                      sx={{
                        textAlign: "left",
                      }}
                    >
                      {movie.tenPhim}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      width: 240,
                    }}
                  >
                    <Typography
                      sx={{
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 5,
                        textAlign: "left",
                      }}
                    >
                      {movie.moTa || "N/A"}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell width={180}>
                    <img src={movie.hinhAnh} className="object-fill" alt="" />
                  </StyledTableCell>
                  <StyledTableCell>{movie.ngayKhoiChieu}</StyledTableCell>
                  <StyledTableCell>
                    {movie.hot ? (
                      <Typography>🔥</Typography>
                    ) : (
                      <Typography>N/A</Typography>
                    )}
                  </StyledTableCell>
                  <StyledTableCell>
                    {movie.dangChieu ? (
                      <Chip
                        icon={<CastConnectedIcon />}
                        color="success"
                        label="Đang chiếu"
                      />
                    ) : (
                      <Chip
                        icon={<NotificationsActiveIcon />}
                        color="warning"
                        label="Sắp chiếu"
                      />
                    )}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Rating
                      value={movie.danhGia / 2}
                      precision={0.5}
                      readOnly
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <IconButton
                        onClick={() => {
                          console.log("edit");
                        }}
                      >
                        <EditIcon sx={{ color: "orange" }} />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setMovieId(movie.maPhim);
                          handleOpen();
                        }}
                      >
                        <DeleteIcon sx={{ color: "red" }} />
                      </IconButton>
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
        {isLoading && (
          <Box sx={{ p: 10 }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
        )}
        <Stack sx={{ py: 2 }} alignItems="end">
          <Pagination
            count={data?.totalPages - 1 || 1}
            color="primary"
            variant="outlined"
            page={page}
            onChange={handleChangePage}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </Stack>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Delete movie?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to delete this movie?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ py: 2 }}>
          <Button size="small" variant="contained" onClick={handleClose}>
            Disagree
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={handleDeleteMovie}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
