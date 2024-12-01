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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import { format } from "date-fns";
import AddOrUpdateMovie from "./AddOrUpdateMovie";
import useOpenModal from "../../../hooks/useOpenModal";
import dayjs from "dayjs";

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
  const { openModal, onCloseModal, handleClickOpen } = useOpenModal();
  const [openAddorUpdate, setOpenAddorUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [movieId, setMovieId] = useState(null);
  const [dataEdit, setDataEdit] = useState(null);
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movieListPagination", page],
    queryFn: () => movieApi.getMovieListPagination(page),
  });

  const { mutate, isPending: isPendingDetele } = useMutation({
    mutationFn: (id) => {
      return movieApi.deleteMovie(id);
    },
    onSuccess: (response) => {
      toast.success(response);
      queryClient.refetchQueries(["movieListPagination", page]);
    },
    onError: (error) => {
      toast.error("Xoá phim thất bại. Vui lòng thử lại!");
    },
    onSettled: () => {
      setMovieId(null);
      onCloseModal();
    },
  });

  const { mutate: mutateHandleAddMovie } = useMutation({
    mutationFn: (formData) => movieApi.addMovie(formData),
    onError: (error) => {
      toast.error("Thêm phim thất bại. Vui lòng thử lại");
    },
    onSuccess: (response) => {
      console.log("👉 ~ MovieManagement ~ response:", response);
      toast.success("Thêm phim thành công");
      queryClient.refetchQueries(["movieListPagination", page]);
      setOpenAddorUpdate(false);
    },
  });

  const { mutate: mutateHandleEditMovie } = useMutation({
    mutationFn: (formData) => movieApi.updateMovie(formData),
    onSuccess: (response) => {
      toast.success("Cập nhật thành công!");
      setOpenAddorUpdate(false);
    },
    onError: (error) => {
      console.log("👉 ~ MovieManagement ~ error:", error);
      toast.error("Cập nhật thất bại. Vui lòng thử lại!");
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
    if (!isPendingDetele) {
      onCloseModal();
      setMovieId(null);
    }
  };
  const handleAddOrEditMovie = (formValues) => {
    if (dataEdit) {
      //Gọi Api
      let formData = new FormData();
      formData.append("maNhom", "GP03");
      formData.append("tenPhim", formValues.tenPhim);
      formData.append("trailer", formValues.trailer);
      formData.append("moTa", formValues.moTa);
      formData.append("ngayKhoiChieu", formValues.ngayKhoiChieu);
      formData.append("dangChieu", formValues.trangThai);
      formData.append("sapChieu", !formValues.trangThai);
      formData.append("hot", formValues.hot);
      formData.append("danhGia", formValues.danhGia);
      formData.append("hinhAnh", formValues.hinhAnh);
      mutateHandleEditMovie(formData);
    } else {
      let formData = new FormData();
      formData.append("maNhom", "GP03");
      formData.append("tenPhim", formValues.tenPhim);
      formData.append("trailer", formValues.trailer);
      formData.append("moTa", formValues.moTa);
      formData.append("ngayKhoiChieu", formValues.ngayKhoiChieu);
      formData.append("dangChieu", formValues.trangThai);
      formData.append("sapChieu", !formValues.trangThai);
      formData.append("hot", formValues.hot);
      formData.append("danhGia", formValues.danhGia);
      formData.append("hinhAnh", formValues.hinhAnh);
      mutateHandleAddMovie(formData);
    }
  };

  const movieListPagination = data?.items || [];
  const count = data?.totalPages || 1;
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
        <Button
          onClick={() => {
            setOpenAddorUpdate(true);
          }}
          sx={{ px: 3 }}
          color="primary"
          variant="contained"
        >
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
                  <StyledTableCell>
                    {dayjs(movie.ngayKhoiChieu).format("DD/MM/YYYY")}
                  </StyledTableCell>
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
                          setDataEdit(movie);
                          setOpenAddorUpdate(true);
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
            count={count}
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
        open={openModal}
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
          <Button
            disabled={isPendingDetele}
            size="small"
            variant="contained"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={isPendingDetele}
            size="small"
            variant="contained"
            color="error"
            onClick={handleDeleteMovie}
            autoFocus
          >
            Ok
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <AddOrUpdateMovie
        isOpen={openAddorUpdate}
        onClose={() => {
          setOpenAddorUpdate(false);
          setDataEdit(null);
        }}
        onSubmit={handleAddOrEditMovie}
        dataEdit={dataEdit}
      />
    </Box>
  );
}
