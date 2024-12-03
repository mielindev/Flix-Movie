import React, { useState } from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  Pagination,
  PaginationItem,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import PATH from "../../../routes/path";
import Paper from "@mui/material/Paper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import userApi from "../../../apis/user.api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import useOpenModal from "../../../hooks/useOpenModal";
import toast from "react-hot-toast";
import AddOrUpdateUser from "./AddOrUpdateUser";

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

export default function UserManagement() {
  const [page, setPage] = useState(1);
  const [userTaiKhoan, setUserTaiKhoan] = useState(null);
  const { openModal, onCloseModal, handleClickOpen } = useOpenModal();
  const [openAddOrEdit, setOpenAddOrEdit] = useState(false);
  const queryClient = useQueryClient();

  // Call api get user list
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userListPagination", { page }],
    queryFn: () => userApi.getUserListPagination({ page }),
  });

  // Call api delete user
  const { mutate } = useMutation({
    mutationFn: (userId) => userApi.deleteUser(userId),
    onSuccess: (response) => {
      toast.success("Xoá người dùng thành công!");
      queryClient.refetchQueries(["userListPagination", { page }]);
      setUserTaiKhoan(null);
    },
    onError: (error) => {
      toast.error("Xoá người dùng thất bại. Vui lòng thử lại!");
    },
    onSettled: () => {
      handleClose();
    },
  });

  // Call api add user
  const { mutate: mutateHandleAddUser } = useMutation({
    mutationFn: (formValues) =>
      userApi.addUser("QuanLyNguoiDung/ThemNguoiDung", formValues),
    onSuccess: (response) => {
      toast.success("Thêm người dùng thành công!");
    },
    onError: (error) => {
      toast.error("Thêm người dùng thất bại. Vui lòng thử lại!");
    },
  });

  const handleChangePage = (_e, value) => {
    setPage(value);
  };

  const handleClose = () => {
    onCloseModal();
    setUserTaiKhoan(null);
  };

  const handelDeleteUser = () => {
    mutate(userTaiKhoan);
  };

  const handleOpenAddOrEdit = () => {
    setOpenAddOrEdit(true);
  };

  const handleAddUser = (formValues) => {
    console.log("👉 ~ handleAddUser ~ formValues:", formValues);
    mutateHandleAddUser(formValues);
  };

  const userListPagination = data?.items || [];
  const count = data?.totalPages - 1 || 1;
  return (
    <Box>
      <Box sx={{ my: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ my: 2 }}
        >
          <Breadcrumbs separator={<NavigateNextIcon />} aria-label="breadcrumb">
            <NavLink to={PATH.ADMIN}>Dashboard</NavLink>
            <Typography sx={{ color: "text.primary", fontWeight: 600 }}>
              User Management
            </Typography>
          </Breadcrumbs>
          <Button variant="contained" onClick={handleOpenAddOrEdit}>
            Thêm người dùng
          </Button>
        </Stack>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Họ và tên</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Số điện thoại</StyledTableCell>
                <StyledTableCell>Loại người dùng</StyledTableCell>
                <StyledTableCell>Tài khoản</StyledTableCell>
                <StyledTableCell>Mật khẩu</StyledTableCell>
                <StyledTableCell>Thao tác</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userListPagination.map((user) => {
                return (
                  <StyledTableRow key={user.taiKhoan}>
                    <StyledTableCell>{user.hoTen}</StyledTableCell>
                    <StyledTableCell>{user.email}</StyledTableCell>
                    <StyledTableCell>{user.soDt}</StyledTableCell>
                    <StyledTableCell>
                      {user.maLoaiNguoiDung === "QuanTri"
                        ? "Quản trị"
                        : "Khách hàng"}
                    </StyledTableCell>
                    <StyledTableCell>{user.taiKhoan}</StyledTableCell>
                    <StyledTableCell>{user.matKhau}</StyledTableCell>
                    <StyledTableCell>
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <IconButton>
                          <EditIcon sx={{ color: "orange" }} />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            handleClickOpen();
                            setUserTaiKhoan(user.taiKhoan);
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
      </Box>
      {/* Modal delete user */}
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Delete user?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ py: 2 }}>
          <Button
            // disabled={isPendingDetele}
            size="small"
            variant="contained"
            onClick={onCloseModal}
          >
            Cancel
          </Button>
          <LoadingButton
            // loading={isPendingDetele}
            size="small"
            variant="contained"
            color="error"
            onClick={handelDeleteUser}
            autoFocus
          >
            Ok
          </LoadingButton>
        </DialogActions>
      </Dialog>
      {/* Modal add user */}
      <AddOrUpdateUser
        isOpen={openAddOrEdit}
        onClose={() => setOpenAddOrEdit(false)}
        onSubmit={handleAddUser}
      />
    </Box>
  );
}
