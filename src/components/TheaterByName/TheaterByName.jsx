import React, { useState } from "react";
import { Box, Button, Grid2, Tab, Tabs, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import movieApi from "../../apis/movie.api";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import PATH from "../../routes/path";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
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

export default function TheaterByName({ maHeThongRap }) {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  const { data } = useQuery({
    queryKey: ["theaterByName", maHeThongRap],
    queryFn: () => movieApi.getMovieByName(maHeThongRap),
  });

  const handlePurchase = (showId) => {
    navigate(PATH.PURCHASE.replace(":showId", showId));
  };
  const listTheater = data?.content[0].lstCumRap || [];
  console.log("👉 ~ TheaterByName ~ data:", data);
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        width: "100%",
      }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider", width: "30%" }}
      >
        {listTheater.map((item, index) => {
          return (
            <Tab
              key={item.maCumRap}
              sx={{ alignItems: "flex-start" }}
              label={
                <Box>
                  <Typography
                    sx={{
                      color: "green",
                      fontSize: 18,
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 1,
                      textAlign: "left",
                    }}
                    component="h3"
                  >
                    {item.tenCumRap}
                  </Typography>
                  <Typography
                    sx={{
                      color: "gray",
                      fontSize: 14,
                      textAlign: "left",
                      mt: 1,
                      fontStyle: "italic",
                    }}
                    component="h3"
                  >
                    {item.diaChi}
                  </Typography>
                </Box>
              }
              {...a11yProps(index)}
            />
          );
        })}
      </Tabs>

      {listTheater.map((item, index) => {
        return (
          <TabPanel className="w-[70%]" value={value} index={index}>
            {item.danhSachPhim.map((item) => {
              return (
                <Grid2 container mb={2} spacing={2}>
                  <Grid2 size={2}>
                    <img
                      width={150}
                      className="mx-auto"
                      src={item.hinhAnh}
                      alt=""
                    />
                  </Grid2>
                  <Grid2 size={10}>
                    <Typography
                      sx={{ fontSize: 24, fontWeight: 600 }}
                      component="h3"
                    >
                      {item.tenPhim}
                    </Typography>
                    {item.lstLichChieuTheoPhim.map((item) => {
                      return (
                        <Button
                          sx={{
                            m: 1,
                          }}
                          variant="outlined"
                          size="medium"
                          color="error"
                          onClick={() => {
                            handlePurchase(item.maLichChieu);
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 16,
                              "&:hover": {
                                fontWeight: 700,
                              },
                            }}
                          >
                            {dayjs(item.ngayChieuGioChieu).format(
                              "DD/MM/YYYY - HH:mm"
                            )}
                          </Typography>
                        </Button>
                      );
                    })}
                  </Grid2>
                </Grid2>
              );
            })}
          </TabPanel>
        );
      })}
    </Box>
  );
}
