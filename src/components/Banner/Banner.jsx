import React, { useEffect } from "react";
import Slider from "react-slick";
import { CardMedia, Toolbar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import movieApi from "../../apis/movie.api";

export default function Banner() {
  const { data } = useQuery({
    queryKey: ["bannerList"],
    queryFn: () => movieApi.getBannerMovie(),
  });
  console.log("👉 ~ Banner ~ data:", data);

  // useEffect(() => {
  //   const res = async () => {
  //     try {
  //       const response = await axios({
  //         url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
  //         method: "GET",
  //         headers: {
  //           TokenCybersoft: TOKEN_CYBERSOFT,
  //         },
  //       });
  //       return response;
  //     } catch (error) {
  //       return error;
  //     }
  //   };
  //   res();
  //   console.log("👉 ~ res ~ response:", response);
  // }, []);

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
  };
  const bannerList = data ? data : [];
  return (
    <Slider className="relative-" {...settings}>
      {bannerList.map((slide) => {
        return (
          <CardMedia
            key={slide.maBanner}
            component="img"
            image={slide.hinhAnh}
            sx={{
              width: "100%",
              height: "90vh",
              objectFit: "inherit",
            }}
          />
        );
      })}
    </Slider>
  );
}
