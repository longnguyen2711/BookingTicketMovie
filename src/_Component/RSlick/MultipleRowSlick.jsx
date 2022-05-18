import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../../redux/types";
import Film from "../Film/Film";
import styleSlick from "./MultipleRowSlick.module.css";

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
  const [screen, setScreen] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    // Mỗi lần load dữ liệu component lên hoặc resize sẽ xét lại kích thước cho biến screen
    window.onload = () => {
      setScreen({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.onresize = () => {
      setScreen({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    return () => {
      window.removeEventListener("onload");
      window.removeEventListener("onresize");
    };
  }, []);
  

  let numberSlidesToShow = screen.width < 1200 ? 4 : 5

  const settings = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    className: "center variable-width",
    variableWidth: true,
    centerPadding: "60px",
    infinite: true,
    speed: 500,
    slidesToShow: numberSlidesToShow,
    slidesToScroll: 1,
    // slidesPerRow: 2,
    rows: 2,
    autoplay: true,
    autoplaySpeed: 4000,
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
      <div className="mb-6">
        <button
          className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold border rounded bg-gray-800 text-white mr-4`}
          onClick={() => {
            const action = { type: SET_PHIM_DANG_CHIEU };
            dispatch(action);
          }}
        >
          PHIM ĐANG CHIẾU
        </button>
        <button
          className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold border rounded bg-white text-gray-800 border-gray-800`}
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
