import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
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
import { NavLink } from "react-router-dom";
import PATH from "../../../routes/path";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const onSubmit = (formValues) => {
    console.log("👉 ~ onSubmit ~ formValues:", formValues);
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
        <Stack spacing={2}>
          {/* Input Tai khoan */}
          <TextField
            {...register("taiKhoan")}
            fullWidth
            label="Tài khoản"
            variant="outlined"
            name="taiKhoan"
          />
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
          </FormControl>
          {/* Button Submit */}
          <Button
            className="rounded-2xl"
            color="primary"
            variant="contained"
            type="submit"
          >
            Đăng nhập
          </Button>
          <NavLink
            className="text-right italic cursor-pointer text-blue-600 font-medium"
            to={PATH.REGISTER}
          >
            Bạn chưa có tài khoản? Đăng ký
          </NavLink>
        </Stack>
      </form>
    </Box>
  );
}
