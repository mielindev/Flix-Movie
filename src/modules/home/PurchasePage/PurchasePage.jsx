import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import movieApi from "../../../apis/movie.api";
import {
  Box,
  Button,
  Divider,
  Grid2,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";

export default function PurchasePage() {
  const { showId } = useParams();
  const { data } = useQuery({
    queryKey: ["listPurchase", showId],
    queryFn: () => movieApi.getListPurchase(showId),
  });
  const purchaseInfomation = data?.content || [];
  const thongTinPhim = purchaseInfomation?.thongTinPhim || [];
  console.log("👉 ~ PurchasePage ~ thongTinPhim:", thongTinPhim);
  const danhSachGhe = purchaseInfomation?.danhSachGhe || [];
  console.log("👉 ~ PurchasePage ~ danhSachGhe:", danhSachGhe);

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
                    sx={{
                      width: 35,
                      height: 35,
                      minWidth: "unset",
                      m: "5px",
                      p: 2,
                      backgroundColor: "rgba(0,0,0,.2)",
                    }}
                  >
                    <Typography sx={{ color: "black" }}>
                      {seat.tenGhe}
                    </Typography>
                  </Button>
                );
              })}
            </Box>
          </Box>
        </Grid2>
        <Grid2 size={4}>
          <Stack>
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
          </Stack>
        </Grid2>
      </Grid2>
    </Box>
  );
}
