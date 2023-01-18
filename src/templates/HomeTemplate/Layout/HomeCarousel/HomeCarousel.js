import React, { useEffect } from "react";
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import { getCarouselAction } from "../../../../redux/actions/CarouselActions";
import "./HomeCarousel.css";

const contentStyle = {
  height: "600px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  backgroundPosition: "top",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

export default function HomeCarousel(props) {
  const { arrImg } = useSelector((state) => state.CarouselReducer);

  const arrImg2 = [
    {
      "maBanner": 1001,
      "maPhim": 111111,
      "hinhAnh": "https://4.bp.blogspot.com/-eqPNLqeDI-w/XI51rOAe22I/AAAAAAAAAts/gBOCnWl70iQc6POs9ORbgAFWip5j-jogACKgBGAs/w0/avengers-endgame-movie-characters-uhdpaper.com-4K-52.jpg"
    },
    {
      "maBanner": 1002,
      "maPhim": 111112,
      "hinhAnh": "https://images2.alphacoders.com/117/thumb-1920-1170277.jpg"
    },
    {
      "maBanner": 1003,
      "maPhim": 111113,
      "hinhAnh": "https://bloganchoi.com/wp-content/uploads/2022/12/anh-bia-avatar-2.jpg"
    },
    {
      "maBanner": 1004,
      "maPhim": 111114,
      "hinhAnh": "https://wallpapercave.com/wp/wp9429759.jpg"
    },
    {
      "maBanner": 1005,
      "maPhim": 111115,
      "hinhAnh": "https://images.alphacoders.com/122/1229316.jpg"
    },
  ]

  const arrImgSum = arrImg2.concat(arrImg)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCarouselAction());
  }, []);

  const renderImg = () => {
    return arrImgSum.map((item, index) => {
      return (
        <div key={index}>
          <div
            style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}
          >
            <img
              src={item.hinhAnh}
              alt={item.hinhAnh}
              className="w-full opacity-0"
            />
          </div>
        </div>
      );
    });
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  return (
    <section id="Carousel">
      <Slider {...settings} className="relative z-1 m-auto">
        {renderImg()}
      </Slider>
    </section>
  );
}
