
import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../../redux/types";
import { useDispatch, useSelector } from "react-redux";
import styleSlick from "./MultipleRowSlick.module.css";
import Slider from "react-slick";
import Film from "../Film/Film";
import React from "react";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-next"]}`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

const MultipleRowSlick = (props) => {
  const dispatch = useDispatch();

  const { dangChieu, sapChieu } = useSelector(
    (state) => state.QuanLyPhimReducer
  );

  let activeClassDC = dangChieu === true ? "active_Film" : "none_active_Film";

  let activeClassSC = sapChieu === true ? "active_Film" : "none_active_Film";

  var numberSlidesToShow = 5;
  if (window.innerWidth < 1200) {
    numberSlidesToShow = 4;
  }
  if (window.innerWidth < 1000) {
    numberSlidesToShow = 3.5;
  }
  if (window.innerWidth < 900) {
    numberSlidesToShow = 3;
  }

  const settings = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    className: "center variable-width",
    // variableWidth: true,
    centerPadding: "60px",
    infinite: true,
    speed: 500,
    slidesToShow: numberSlidesToShow,
    slidesToScroll: 1,
    // slidesPerRow: 2,
    rows: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    // dots: true,
    // appendDots: (dots) => (
    //   <div
    //     style={{
    //       backgroundColor: "#ddd",
    //       borderRadius: "10px",
    //       padding: "10px",
    //       position: "relative",
    //     }}
    //   >
    //     <ul style={{ margin: "0px" }}> {dots} </ul>
    //   </div>
    // ),
    // customPaging: (i) => (
    //   <div
    //     style={{
    //       width: "30px",
    //       color: "black",
    //       fontSize: "20px",
    //       fontWeight: "bold",
    //     }}
    //   >
    //     {i + 1}
    //   </div>
    // ),
  };
  return (
    <div>
      <div className={`${styleSlick['filter-button']} pl-24`}>
        <button          
          className={`${styleSlick[activeClassDC]} px-5 py-3 font-bold rounded-md mr-5`}
          onClick={() => {
            const action = { type: SET_PHIM_DANG_CHIEU };
            dispatch(action);
          }}
        >
          PHIM ĐANG CHIẾU
        </button>
        <button
          className={`${styleSlick[activeClassSC]} px-5 py-3 font-bold rounded-md `}
          onClick={() => {
            const action = { type: SET_PHIM_SAP_CHIEU };
            dispatch(action);
          }}
        >
          PHIM SẮP CHIẾU
        </button>
      </div>
      <div>
        <Slider {...settings} className="mx-20 rounded">
          {props.arrFilm.map((item, index) => {
            return (
              <div className={`${styleSlick["width-item"]}`} key={index}>
                <Film item={item} />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default MultipleRowSlick;
