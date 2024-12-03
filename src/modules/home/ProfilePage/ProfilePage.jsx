import React, { useState } from "react";
import {
  Box,
  Button,
  CardMedia,
  Chip,
  FormControl,
  FormHelperText,
  Grid2,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  styled,
  Tab,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import dayjs from "dayjs";
import { useMutation } from "@tanstack/react-query";
import userApi from "../../../apis/user.api";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: 700,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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
  hoTen: yup
    .string()
    .required("Họ và tên không được để trống")
    .min(3, "Họ và tên phải dài ít nhất 3 ký tự")
    .max(50, "Họ và tên phải dài tối đa 50 ký tự"),
  email: yup
    .string()
    .required("Email không được bỏ trống")
    .email("Vui lòng nhập đúng định dạng email"),
  soDT: yup
    .string()
    .required("Số điện thoại không được bỏ trống")
    .matches(/^(03|05|07|08|09)\d{8}$/, "Vui lòng nhập số điện thoại hợp lệ"),
});

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      className="w-screen"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ px: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function ProfilePage() {
  const [value, setValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const { infomationUser } = useSelector((state) => state.user);
  const historyList = infomationUser.thongTinDatVe;
  const { mutate, isPending } = useMutation({
    mutationFn: (formValues) => userApi.editAccountInfor(formValues),
    onSuccess: (response) => {
      console.log("👉 ~ ProfilePage ~ response:", response);
      toast.success("Chỉnh sửa thành công");
    },
    onError: (error) => {
      console.log("👉 ~ ProfilePage ~ error:", error);
      toast.error("Chỉnh sửa thất bại. Vui lòng thử lại!");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: infomationUser.taiKhoan,
      matKhau: infomationUser.matKhau,
      email: infomationUser.email,
      soDT: infomationUser.soDt,
      maNhom: infomationUser.maNhom,
      maLoaiNguoiDung: infomationUser.maLoaiNguoiDung,
      hoTen: infomationUser.hoTen,
    },
    resolver: yupResolver(schema),
  });
  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const onSubmit = (formValues) => {
    mutate(formValues);
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Toolbar />
      <Toolbar />
      <Box
        sx={{
          width: "100%",
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Tài khoản" {...a11yProps(0)} />
          <Tab label="Lịch sử đặt vé" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Grid2 container spacing={5}>
            <Grid2 size={6}>
              <TextField
                label="Họ và tên "
                fullWidth
                defaultValue={infomationUser.hoTen}
                {...register("hoTen")}
                error={!!errors.hoTen}
                helperText={errors.hoTen?.message}
              />
              <TextField
                sx={{ my: 3 }}
                label="Email "
                fullWidth
                defaultValue={infomationUser.email}
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Số điện thoại "
                fullWidth
                defaultValue={infomationUser.soDT}
                {...register("soDT")}
                error={!!errors.soDT}
                helperText={errors.soDT?.message}
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                label="Tài khoản"
                {...register("taiKhoan")}
                defaultValue={infomationUser.taiKhoan}
                fullWidth
                error={!!errors.taiKhoan}
                helperText={errors.taiKhoan?.message}
              />
              <FormControl fullWidth variant="outlined" sx={{ my: 3 }}>
                <InputLabel htmlFor="outlined-adornment-password">
                  Mật khẩu
                </InputLabel>
                <OutlinedInput
                  {...register("matKhau")}
                  name="matKhau"
                  defaultValue={infomationUser.matKhau}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  error={!!errors.matKhau}
                  helperText={errors.matKhau?.message}
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
                  label="Mật khẩu"
                />
                {errors.matKhau && (
                  <FormHelperText sx={{ m: 0, p: 0, color: "red" }}>
                    {errors.matKhau?.message}
                  </FormHelperText>
                )}
              </FormControl>
              <Button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                sx={{ width: "50%" }}
                variant="contained"
              >
                Chỉnh sửa
              </Button>
            </Grid2>
          </Grid2>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow sx={{ fontWeight: 700 }}>
                  <StyledTableCell align="center">Hình ảnh</StyledTableCell>
                  <StyledTableCell align="center">Tên phim</StyledTableCell>
                  <StyledTableCell align="center">Ngày đặt</StyledTableCell>
                  <StyledTableCell align="center">Rạp</StyledTableCell>
                  <StyledTableCell align="center">Phòng</StyledTableCell>
                  <StyledTableCell align="center">Số ghế</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historyList.map((item) => {
                  return (
                    <StyledTableRow>
                      <TableCell>
                        <CardMedia
                          sx={{ width: 100, mx: "auto" }}
                          component="img"
                          image={item.hinhAnh}
                        />
                      </TableCell>
                      <TableCell>{item.tenPhim}</TableCell>
                      <TableCell>
                        <Chip
                          label={dayjs(item.ngayDat).format("DD/MM/YYYY HH:mm")}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{item.danhSachGhe[0].tenHeThongRap}</TableCell>
                      <TableCell>{item.danhSachGhe[0].tenRap}</TableCell>
                      <TableCell width="30%">
                        {item.danhSachGhe.map((item) => {
                          return `Ghế ${item.tenGhe} - `;
                        })}
                      </TableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Box>
    </Box>
  );
}
