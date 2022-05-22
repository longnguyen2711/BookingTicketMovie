import React, { useEffect, useState } from "react";
import HomeMenu from "./HomeMenu/HomeMenu";
import HomeMenuMobile from "./HomeMenu/HomeMenuMobile";
import { useSelector, useDispatch } from "react-redux";
import MultipleRowSlick from "../../_Component/RSlick/MultipleRowSlick";
import MultipleRowSlickMobile from "../../_Component/RSlick/MultipleRowSlickMobile";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimActions";
import { layDanhSachHeThongRapAction } from "../../redux/actions/QuanLyRapActions";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";
import { LINK_BACKGROUND_HOMEPAGE } from "../../util/settings/config";

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
    if (screen.width >= 800) {
      return (
        <div id="HomeMenu" className="px-10 lg:px-20 py-16">
          <div className="p-0 bg-white bg-opacity-80 rounded">
            <HomeMenu heThongRapChieu={heThongRapChieu} />
          </div>
        </div>
      );
    } else {
      return (
        <div
          id="HomeMenuMobile"
          className="p-10 border border-gray-400 rounded"
        >
          <HomeMenuMobile heThongRapChieu={heThongRapChieu} />
        </div>
      );
    }
  };

  const renderMultipleRowSlick = () => {
    if (screen.width >= 800) {
      return (
        <section id="MultipleRowSlick" className="pt-16 pb-5">
          <div className="mx-auto text-gray-600 body-font">
            <MultipleRowSlick arrFilm={arrFilm} />
          </div>
        </section>
      );
    } else {
      return (
        <section
          id="MultipleRowSlickMobile"
          className="p-10 pt-20 mx-auto body-font"
        >
          <MultipleRowSlickMobile arrFilm={arrFilm} />
        </section>
      );
    }
  };

  return (
    <section>
      <div
        style={{
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${LINK_BACKGROUND_HOMEPAGE})`,
        }}
      >
        <HomeCarousel />
      </div>

      <div
        style={{
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${LINK_BACKGROUND_HOMEPAGE})`,
        }}
      >
        {" "}
        {renderMultipleRowSlick()}
      </div>

      <div
        style={{
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${LINK_BACKGROUND_HOMEPAGE})`,
        }}
      >
        {renderHomeMenu()}
      </div>
    </section>
  );
}
