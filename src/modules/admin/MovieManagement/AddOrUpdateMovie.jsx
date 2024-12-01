import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material/node";
import { DatePicker } from "@mui/x-date-pickers";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { format } from "date-fns";
import { DeleteOutline } from "@mui/icons-material";

export default function AddOrUpdateMovie({
  isOpen,
  onClose,
  dataEdit,
  onSubmit,
}) {
  const inputFileRef = useRef(null);

  const {
    handleSubmit,
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      danhGia: "",
      ngayKhoiChieu: "",
      trangThai: null,
      hot: true,
      hinhAnh: null,
    },
  });
  const fieldHinhAnh = watch("hinhAnh");
  const previewImage = (file) => {
    if (typeof file === "string" && file.startsWith("http")) {
      return file;
    }
    const url = file ? URL.createObjectURL(file) : "";
    return url;
  };

  useEffect(() => {
    if (dataEdit) {
      setValue("maphim", dataEdit.maPhim);
      setValue("tenPhim", dataEdit.tenPhim);
      setValue("trailer", dataEdit.trailer);
      setValue("moTa", dataEdit.moTa);
      setValue("danhGia", dataEdit.danhGia);
      setValue("ngayKhoiChieu", new Date(dataEdit.ngayKhoiChieu));
      setValue("trangThai", dataEdit.dangChieu);
      setValue("hot", dataEdit.hot);
      setValue("hinhAnh", dataEdit.hinhAnh);
    }
  }, [dataEdit]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      //   maxWidth="sm"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="alert-dialog-title">
          {dataEdit ? "Chỉnh sửa phim" : "Thêm phim"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} width={450}>
            <TextField
              label="Tên phim"
              variant="outlined"
              name="tenPhim"
              {...register("tenPhim")}
            />
            <TextField
              label="Trailer"
              variant="outlined"
              name="trailer"
              {...register("trailer")}
            />
            <TextField
              multiline
              minRows={4}
              label="Mô tả"
              variant="outlined"
              name="moTa"
              {...register("moTa")}
            />
            <Controller
              name="ngayKhoiChieu"
              control={control}
              render={({ field }) => {
                return (
                  <DatePicker
                    label="Ngày khởi chiếu"
                    format="DD/MM/YYYY"
                    defaultValue={
                      dataEdit ? new Date(dataEdit.ngayKhoiChieu) : null
                    }
                    onChange={(date) => {
                      const formDate = date.toISOString();
                      console.log("👉 ~ formDate:", formDate);
                      field.onChange(formDate);
                    }}
                  />
                );
              }}
            />
            <TextField
              fullWidth
              label="Đánh giá"
              variant="outlined"
              name="danhGia"
              {...register("danhGia")}
            />
            <Stack direction="row" justifyContent="space-between">
              <Controller
                name="trangThai"
                control={control}
                render={({ field }) => {
                  return (
                    <RadioGroup
                      row
                      {...field}
                      defaultValue={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value === "true");
                      }}
                    >
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="Đang chiếu"
                      />
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="Sắp chiếu"
                      />
                    </RadioGroup>
                  );
                }}
              />
              <FormControl>
                <FormLabel>Hot</FormLabel>
                <Controller
                  name="hot"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} defaultChecked />}
                    />
                  )}
                />
              </FormControl>
            </Stack>
            <Box
              sx={{
                width: "full",
                height: 200,
                border: "1px dashed gray",
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,0.5)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => !fieldHinhAnh && inputFileRef.current.click()}
            >
              {!fieldHinhAnh ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CloudUploadIcon sx={{ fontSize: 48 }} />
                  <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
                    Tải tệp lên
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    bgcolor: "rgba(0,0,0,.2)",
                    position: "relative",
                  }}
                >
                  <IconButton
                    sx={{
                      color: "white",
                      position: "absolute",
                      top: 10,
                      right: 10,
                    }}
                    onClick={() => {
                      setValue("hinhAnh", null);
                    }}
                  >
                    <DeleteOutline sx={{ fontSize: 28 }} />
                  </IconButton>
                  <img
                    src={previewImage(fieldHinhAnh)}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </Box>
              )}
              <input
                accept=".png, .jpg, .jpeg"
                type="file"
                hidden
                ref={inputFileRef}
                onChange={(e) => {
                  setValue("hinhAnh", e.target.files[0]);
                }}
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="contained">
            Đóng
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            variant="contained"
          >
            Hoàn thành
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
