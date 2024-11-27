import React from "react";
import Slider from "react-slick";
import movieApi from "../../apis/movie.api";
import { useQuery } from "@tanstack/react-query";
import { CardMedia, Toolbar } from "@mui/material";

export default function Banner() {
  const { data } = useQuery({
    queryKey: ["bannerList"],
    queryFn: () => movieApi.getBannerMovie(),
  });
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
