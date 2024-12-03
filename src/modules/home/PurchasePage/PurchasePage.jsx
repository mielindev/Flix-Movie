import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import movieApi from "../../../apis/movie.api";
import { Box, Button, Grid2, Stack, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCard } from "../../../store/slice/card.slice";
let total = 0;
let listItemSelected = [];
export default function PurchasePage() {
  const { showId } = useParams();
  const { data } = useQuery({
    queryKey: ["listPurchase", showId],
    queryFn: () => movieApi.getListPurchase(showId),
  });
  const dispatch = useDispatch();
  const { currentCard } = useSelector((state) => state.card);
  currentCard.map((item) => {
    total += item.giaVe;
  });
  currentCard.map((item) => {
    listItemSelected.push(`Ghế: ${item.tenGhe}`);
  });

  const purchaseInfomation = data?.content || [];
  const thongTinPhim = purchaseInfomation?.thongTinPhim || [];
  const danhSachGhe = purchaseInfomation?.danhSachGhe || [];

  return (
    <Box>
      <Toolbar />
      <Grid2 container>
        <Grid2 size="grow">
          <Box sx={{ width: "90%", mx: "auto" }}>
            <Box sx={{ width: "80%", mx: "auto" }}>
              {danhSachGhe.map((seat) => {
                return (
                  <Button
                    key={seat.maGhe}
                    disabled={seat.daDat ? true : false}
                    sx={{
                      width: 35,
                      height: 35,
                      minWidth: "unset",
                      m: "5px",
                      p: 2,
                      border: "none",
                      backgroundColor: `${
                        !seat.daDat && seat.loaiGhe === "Vip"
                          ? "orange"
                          : "rgb(233, 233, 233)"
                      } `,
                      "&.Mui-disabled": {
                        backgroundColor: "gray",
                      },
                      "&:hover": {
                        backgroundColor: "white",
                      },
                    }}
                    onClick={() => {
                      dispatch(addToCard(seat));
                    }}
                  >
                    <Typography sx={{ color: "black", fontWeight: 550 }}>
                      {seat.daDat ? "X" : seat.tenGhe}
                    </Typography>
                  </Button>
                );
              })}
            </Box>
          </Box>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ width: "40%", mx: "auto", my: 2 }}
            spacing={4}
          >
            <Stack justifyContent="center" alignItems="center">
              <Button
                disabled={true}
                sx={{
                  width: 35,
                  height: 35,
                  minWidth: "unset",
                  m: "5px",
                  p: 2,
                  border: "none",
                  backgroundColor: "gray",
                }}
              >
                X
              </Button>
              <Typography>Đã đặt</Typography>
            </Stack>
            <Stack justifyContent="center" alignItems="center">
              <Button
                sx={{
                  width: 35,
                  height: 35,
                  minWidth: "unset",
                  m: "5px",
                  p: 2,
                  border: "none",
                  backgroundColor: "rgb(233, 233, 233)",
                }}
              ></Button>
              <Typography>Thường</Typography>
            </Stack>
            <Stack justifyContent="center" alignItems="center">
              <Button
                sx={{
                  width: 35,
                  height: 35,
                  minWidth: "unset",
                  m: "5px",
                  p: 2,
                  border: "none",
                  backgroundColor: "orange",
                }}
              ></Button>
              <Typography>Vip</Typography>
            </Stack>
          </Stack>
        </Grid2>
        <Grid2 size={4}>
          <Stack>
            <Box p={3} textAlign="center">
              <Typography color="success" variant="h4" component="h3">
                {total} VNĐ
              </Typography>
            </Box>
            <Stack direction="row" justifyContent="space-between" p={3}>
              <Typography sx={{ fontWeight: 700 }} variant="h6" component="h2">
                Cụm rap:
              </Typography>
              <Typography sx={{ color: "#108f3e", fontSize: 18 }}>
                {thongTinPhim.tenCumRap}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" p={3}>
              <Typography sx={{ fontWeight: 700 }} variant="h6" component="h2">
                Địa chỉ:
              </Typography>
              <Typography sx={{ color: "#108f3e", fontSize: 18 }}>
                {thongTinPhim.diaChi}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" p={3}>
              <Typography sx={{ fontWeight: 700 }} variant="h6" component="h2">
                Rạp:
              </Typography>
              <Typography sx={{ color: "#108f3e", fontSize: 18 }}>
                {thongTinPhim.tenRap}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" p={3}>
              <Typography sx={{ fontWeight: 700 }} variant="h6" component="h2">
                Ngày giờ chiếu:
              </Typography>
              <Stack direction="row" gap={2}>
                <Typography sx={{ color: "#108f3e", fontSize: 18 }}>
                  {thongTinPhim.ngayChieu}
                </Typography>
                <Typography sx={{ color: "red" }}>
                  {thongTinPhim.gioChieu}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-between" p={3}>
              <Typography sx={{ fontWeight: 700 }} variant="h6" component="h2">
                Tên phim:
              </Typography>
              <Typography sx={{ color: "#108f3e", fontSize: 18 }}>
                {thongTinPhim.tenPhim}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" p={3}>
              <Typography sx={{ fontWeight: 700 }} variant="h6" component="h2">
                Chọn:
              </Typography>
              <Typography sx={{ color: "#108f3e", fontSize: 18 }}>
                {listItemSelected.join(", ")}
              </Typography>
            </Stack>
            <Button sx={{ p: 2 }} variant="contained" color="error">
              Đặt vé
            </Button>
          </Stack>
        </Grid2>
      </Grid2>
    </Box>
  );
}
