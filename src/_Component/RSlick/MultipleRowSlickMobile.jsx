import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../../redux/types";
import styleSlick from "./MultipleRowSlick.module.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./MultipleRowSlickMobile.css";
import { Rate } from "antd";
import moment from "moment";
import React from "react";

const MultipleRowSlickMobile = (props) => {
  const dispatch = useDispatch();

  const { dangChieu, sapChieu } = useSelector(
    (state) => state.QuanLyPhimReducer
  );

  let activeClassDC = dangChieu === true ? "active_Film" : "none_active_Film";
  let activeClassSC = sapChieu === true ? "active_Film" : "none_active_Film";

  const renderFilms = () => {
    return props.arrFilm?.slice(0, 15).map((item, index) => {
      return (
        <div className={`${styleSlick["width-item"]}`} key={index}>
          <div className="film-card grid grid-cols-12 relative h-full bg-black bg-opacity-70 text-white">
            <div
              className="mul-background flex items-center"
              // style={{ backgroundImage: `url(${item.hinhAnh})` }}
            >
              <img
                src={item.hinhAnh}
                alt="..."
                title={item.tenPhim}
                style={{ width: "100%", height: "100%", opacity: 1 }}
              />
            </div>
            <div className="film-info flex-col p-0 px-3 py-4">
              <p
                className="font-bold text-lg sm:text-xl mb-2"
                title={item.tenPhim}
              >
                {item.tenPhim}
              </p>
              <p
                className="font-bold mb-0 sm:mb-3 text-sm sm:text-md"
                title={`Khởi chiếu: ${moment(item.ngayKhoiChieu).format(
                  "DD.MM.YYYY"
                )}`}
              >
                Khởi chiếu: {moment(item.ngayKhoiChieu).format("DD.MM.YYYY")}
              </p>
              {item.moTa.length > 175 ? (
                <p className="mb-2">{item.moTa.slice(0, 175)}...</p>
              ) : (
                <p className="mb-2 xs:hidden">{item.moTa}</p>
              )}
              <p className="mb-3 sm:mb-0" title={`${item.danhGia / 2} sao`}>
                <Rate allowHalf value={item.danhGia / 2} />
              </p>
              <div className="flex justify-end">
                <div className="booking-trailer-button mb-1">
                  <a
                    href={item.trailer}
                    className="trailer-button mr-5 font-bold text-right"
                    title="Xem trailer trên Youtube"
                    target="_blank"
                  >
                    Trailer
                  </a>
                  <NavLink
                    to={`/detail/${item.maPhim}`}
                    className="booking-button font-bold "
                    title="Bấm để đặt vé"
                  >
                    Đặt vé
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div className={`${styleSlick["filter-button"]} mobile-button flex justify-start`}>
        <div>
          <button
            className={`${styleSlick[activeClassDC]} font-semibold border rounded-md mr-5`}
            onClick={() => {
              const action = { type: SET_PHIM_DANG_CHIEU };
              dispatch(action);
            }}
          >
            PHIM ĐANG CHIẾU
          </button>
        </div>
        <div>
          <button
            className={`${styleSlick[activeClassSC]} font-semibold border rounded-md`}
            onClick={() => {
              const action = { type: SET_PHIM_SAP_CHIEU };
              dispatch(action);
            }}
          >
            PHIM SẮP CHIẾU
          </button>
        </div>
      </div>
      {renderFilms()}
    </div>
  );
};

export default MultipleRowSlickMobile;
