import React, { useEffect, useState } from "react";
import HomeMenu from "./HomeMenu/HomeMenu";
import HomeMenuMobile from "./HomeMenu/HomeMenuMobile";
import { useSelector, useDispatch } from "react-redux";
import MultipleRowSlick from "../../_Component/RSlick/MultipleRowSlick";
import MultipleRowSlickMobile from "../../_Component/RSlick/MultipleRowSlickMobile";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimActions";
import { layDanhSachHeThongRapAction } from "../../redux/actions/QuanLyRapActions";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";

export default function Home(props) {
  const { arrFilm } = useSelector((state) => state.QuanLyPhimReducer);
  const dispatch = useDispatch();
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);

  useEffect(() => {
    dispatch(layDanhSachPhimAction());
    dispatch(layDanhSachHeThongRapAction());
  }, []);

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

  const renderHomeMenu = () => {
    if (screen.width >= 768) {
      return (
        <div
          id="HomeMenu"
          className="mx-32 border border-gray-400 p-4 my-10 rounded"
        >
          <HomeMenu heThongRapChieu={heThongRapChieu} />
        </div>
      );
    } else {
      return (
        <div
          id="HomeMenuMobile"
          className="mx-32 border border-gray-400 p-4 my-10 rounded"
        >
          <HomeMenuMobile heThongRapChieu={heThongRapChieu} />
        </div>
      );
    }
  };

  const renderMultipleRowSlick = () => {
    if (screen.width >= 768) {
      return (
        <section id="MultipleRowSlick" className="bg-black py-24">
          <div className="container mx-auto text-gray-600 body-font"></div>
          <MultipleRowSlick arrFilm={arrFilm} />
        </section>
      );
    } else {
      return (
        <section
          id="MultipleRowSlickMobile"
          className="mt-10 px-10 mx-auto body-font"
        >
          <MultipleRowSlickMobile arrFilm={arrFilm} />
        </section>
      );
    }
  };

  return (
    <section>
      <HomeCarousel />
      {renderMultipleRowSlick()}
      {renderHomeMenu()}
    </section>
  );
}
