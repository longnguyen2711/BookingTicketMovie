import React, { useEffect } from "react";
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import { getCarouselAction } from "../../../../redux/actions/CarouselActions";
import './HomeCarousel.css'

const contentStyle = {
  height: "600px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  backgroundPosition: "bottom",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

export default function HomeCarousel(props) {
  const { arrImg } = useSelector((state) => state.CarouselReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCarouselAction());
  }, []);

  const renderImg = () => {
    return arrImg.map((item, index) => {
      return (
        <div className="Carousel" key={index}>
          <div
            style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})`}}
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
    autoplaySpeed: 3000,
    pauseOnHover: true,
    dots: true,
    appendDots: (dots) => (
      <div
        style={{
          position: "relative",
        }}>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
  };

  return (
    <Slider {...settings} className="relative z-1 m-auto">{renderImg()}</Slider>

  );
}
