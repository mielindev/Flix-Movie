import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";

export default function Banner({ bannerList }) {
  console.log("👉 ~ Banner ~ bannerList:", bannerList);
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    adaptiveHeight: true,
  };
  return (
    <Slider className="relative-" {...settings}>
      {bannerList.map((slide) => {
        return (
          <Box
            sx={{
              display: "block",
              width: "100%",
              height: "89vh",
              objectFit: "contain",
              backgroundImage: `url(${slide.hinhAnh})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></Box>
        );
      })}
    </Slider>
  );
}
