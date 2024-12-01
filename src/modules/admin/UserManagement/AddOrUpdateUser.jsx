import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";

export default function AddOrUpdateUser({ isOpen, onClose, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maLoaiNguoiDung: "",
      hoTen: "",
      maNhom: "GP03",
    },
  });
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form>
        <DialogTitle>Thêm người dùng</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: 500,
          }}
        >
          <TextField label="Tài khoản" {...register("taiKhoan")} />
          <TextField label="Mật khẩu" {...register("matKhau")} />
          <TextField label="Họ và tên" {...register("hoTen")} />
          <TextField label="Email" {...register("email")} />
          <TextField label="Số điện thoại" {...register("soDt")} />
          <Controller
            control={control}
            name="maLoaiNguoiDung"
            defaultValue=""
            render={({ field }) => {
              return (
                <TextField {...field} select label="Mã loại người dùng">
                  <MenuItem value="QuanTri">Quản trị</MenuItem>
                  <MenuItem value="KhachHang">Khách hàng</MenuItem>
                </TextField>
              );
            }}
          />
        </DialogContent>
        <DialogActions>
          <Stack direction="row" justifyContent="flex-end" mt={2}>
            <Button onClick={onClose}>Đóng</Button>
            <Button type="submit" onClick={handleSubmit(onSubmit)}>
              Hoàn thành
            </Button>
          </Stack>
        </DialogActions>
      </form>
    </Dialog>
  );
}
