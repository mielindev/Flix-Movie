import React, { useState } from "react";
import {
  Box,
  Button,
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
import { NavLink, useNavigate } from "react-router-dom";
import PATH from "../../../routes/path";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import userApi from "../../../apis/user.api";
import { LoadingButton } from "@mui/lab";
import LoginIcon from "@mui/icons-material/Login";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../../store/slice/user.slice";

const schema = yup.object().shape({
  taiKhoan: yup.string().required("Tài khoản không được để trống").trim(),
  matKhau: yup.string().required("Mật khẩu không được đê trống").trim(),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    resolver: yupResolver(schema),
  });
  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: (formValues) => userApi.login(formValues),
    onSuccess: (data) => {
      const currentUser = data;
      toast.success("Đăng nhập thành công");
      dispatch(setCurrentUser(currentUser));
      currentUser.maLoaiNguoiDung === "KhachHang"
        ? navigate(PATH.HOME)
        : navigate(PATH.ADMIN);
    },
    onError: (error) => {
      toast.error(error.content || "Đăng nhập thất bại. Vui lòng thử lại");
    },
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const onSubmit = (formValues) => {
    handleLogin(formValues);
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
        hi, welcome back
      </Typography>
      <Typography
        className="text-gray-500"
        textAlign="center"
        variant="h6"
        component="p"
      >
        Please enter your details
      </Typography>
      <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1}>
          {/* Input Tai khoan */}
          <TextField
            {...register("taiKhoan")}
            fullWidth
            label="Tài khoản"
            variant="outlined"
            name="taiKhoan"
            error={!!errors.taiKhoan}
          />
          {errors.taiKhoan && (
            <FormHelperText sx={{ m: 0, p: 0, color: "red" }}>
              {errors.taiKhoan?.message}
            </FormHelperText>
          )}
          {/* Input Mat khau */}
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
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
                {errors.taiKhoan?.message}
              </FormHelperText>
            )}
          </FormControl>
          {/* Button Submit */}
          <LoadingButton
            size="small"
            disabled={isPending}
            loading={isPending}
            endIcon={<LoginIcon />}
            loadingPosition="end"
            // onClick={handleSubmit(onSubmit)}
            className="rounded-2xl text-center"
            color="primary"
            variant="contained"
            type="submit"
          >
            Đăng nhập
          </LoadingButton>
          <NavLink
            className="text-right italic cursor-pointer text-blue-400 font-medium"
            to={PATH.REGISTER}
          >
            Bạn chưa có tài khoản? Đăng ký
          </NavLink>
        </Stack>
      </form>
    </Box>
  );
}
