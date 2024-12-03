import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useMutation } from "@tanstack/react-query";
import userApi from "../../../apis/user.api";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import LoginIcon from "@mui/icons-material/Login";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import PATH from "../../../routes/path";

const schema = yup.object().shape({
  taiKhoan: yup
    .string()
    .required("Tài khoản không được để trống")
    .min(4, "Tài khoản phải dài ít nhất 4 ký tự")
    .max(20, "Tài khoản phải dài tối đa 20 ký tự")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]+$/,
      "Tài khoản phải chứa ít nhất một chữ cái và một số"
    )
    .trim(),
  matKhau: yup
    .string()
    .required("Mật khẩu không được đê trống")
    .min(6, "Mật khẩu phải dài ít nhất 6 ký tự")
    .matches(/[a-zA-Z]/, "Mật khẩu phải chứa ít nhất một chữ cái")
    .matches(/\d/, "Mật khẩu phải chứa ít nhất một số")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Mật khẩu phải chứa ít nhất một ký tự đặc biệt"
    )
    .trim(),
  confirmMatKhau: yup
    .string()
    .oneOf([yup.ref("matKhau"), null], "Mật khẩu phải trùng khớp")
    .required("Vui lòng xác nhận mật khẩu của bạn"),
  hoTen: yup
    .string()
    .required("Họ và tên không được để trống")
    .matches(
      /^[a-zA-Zàáảãạăắằẳẵặâấầẩẫậđéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵ\s-]+$/
    )
    .min(3, "Họ và tên phải dài ít nhất 3 ký tự")
    .max(50, "Họ và tên phải dài tối đa 50 ký tự"),
  email: yup
    .string()
    .required("Email không được bỏ trống")
    .email("Vui lòng nhập đúng định dạng email"),
  soDt: yup
    .string()
    .required("Số điện thoại không được bỏ trống")
    .matches(/^(03|05|07|08|09)\d{8}$/, "Vui lòng nhập số điện thoại hợp lệ"),
});

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConFirmPassword, setShowConFirmPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      confirmMatKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
    },
    resolver: yupResolver(schema),
  });
  const { mutate: handleRegister } = useMutation({
    mutationFn: (formValues) => userApi.registerUser(formValues),
    onSuccess: (response) => {
      toast.success("Đăng ký thành công!");
      navigate(PATH.LOGIN);
    },
    onError: (error) => {
      toast.error("Đăng ký thất bại. Vui lòng thử lại!");
    },
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleShowConFirmPassword = () =>
    setShowConFirmPassword((show) => !show);
  const onSubmit = (formValues) => {
    const formData = {
      taiKhoan: formValues.taiKhoan,
      matKhau: formValues.matKhau,
      hoTen: formValues.hoTen,
      email: formValues.email,
      soDt: formValues.soDt,
      maNhom: "GP03",
    };
    handleRegister(formData);
  };
  return (
    <Box>
      <Typography
        textAlign="center"
        margin="16px 0"
        fontWeight={700}
        textTransform="uppercase"
        component="h3"
        variant="h4"
      >
        Create an account
      </Typography>
      <Typography
        className="text-gray-500"
        textAlign="center"
        variant="h6"
        component="p"
      >
        Please enter your details
      </Typography>
      <form className="my-5" onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={1}>
          <TextField
            fullWidth
            label="Tài khoản"
            variant="outlined"
            {...register("taiKhoan")}
            error={!!errors.taiKhoan}
            helperText={errors.taiKhoan?.message}
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Mật khẩu
            </InputLabel>
            <OutlinedInput
              {...register("matKhau")}
              name="matKhau"
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              error={!!errors.matKhau}
              // helperText={errors.matKhau?.message}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Tài khoản"
            />
            {errors.matKhau && (
              <FormHelperText sx={{ m: 0, p: 0, color: "red" }}>
                {errors.matKhau?.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-confirmPassword">
              Nhập lại mật khẩu
            </InputLabel>
            <OutlinedInput
              {...register("confirmMatKhau")}
              name="confirmMatKhau"
              id="outlined-adornment-confirmPassword"
              type={showConFirmPassword ? "text" : "password"}
              error={!!errors.confirmMatKhau}
              // helperText={errors.matKhau?.message}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showConFirmPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleShowConFirmPassword}
                    edge="end"
                  >
                    {showConFirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Tài khoản"
            />
            {errors.confirmMatKhau && (
              <FormHelperText sx={{ m: 0, p: 0, color: "red" }}>
                {errors.confirmMatKhau?.message}
              </FormHelperText>
            )}
          </FormControl>
          <TextField
            fullWidth
            label="Họ và tên"
            variant="outlined"
            {...register("hoTen")}
            error={!!errors.hoTen}
            helperText={errors.hoTen?.message}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label="Số điện thoại"
            variant="outlined"
            {...register("soDt")}
            error={!!errors.soDt}
            helperText={errors.soDt?.message}
          />
          <LoadingButton
            size="small"
            // disabled={isPending}
            // loading={isPending}
            endIcon={<LoginIcon />}
            loadingPosition="end"
            onClick={handleSubmit(onSubmit)}
            className="rounded-2xl text-center"
            color="primary"
            variant="contained"
            type="submit"
          >
            Đăng ký
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
}
