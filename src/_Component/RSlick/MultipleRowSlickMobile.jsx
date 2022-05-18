import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../../redux/types";
import styleSlick from "./MultipleRowSlick.module.css";
import { NavLink } from "react-router-dom";
import "./MultipleRowSlickMobile.css";
import { Rate } from "antd";
import moment from "moment";

const MultipleRowSlickMobile = (props) => {
  const dispatch = useDispatch();

  const { dangChieu, sapChieu } = useSelector(
    (state) => state.QuanLyPhimReducer
  );

  let activeClassDC = dangChieu === true ? "active_Film" : "none_active_Film";
  let activeClassSC = sapChieu === true ? "active_Film" : "none_active_Film";

  console.log("props", props.arrFilm);

  const renderFilms = () => {
    return props.arrFilm?.slice(0,20).map((item, index) => {
      return (
        <div className={`${styleSlick["width-item"]}`} key={index}>
          <div className="film-card grid grid-cols-12 relative mb-5 border-1">
            <div
              className="mul-background col-span-3 h-60"
              style={{ backgroundImage: `url(${item.hinhAnh})` }}
            >
              <img
                src={item.hinhAnh}
                alt="..."
                title={item.tenPhim}
                style={{ width: 200, height: 300, opacity: 0 }}
              />
            </div>
            <div className="film-info flex-col p-0 col-span-9 px-3 py-4">
              <p className="font-bold text-xl mb-2">{item.tenPhim}</p>
              <p className="font-bold mb-3 text-md">
                Khởi chiếu: {moment(item.ngayKhoiChieu).format("DD.MM.YYYY")}
              </p>
              {item.moTa.length > 180 ? (
                <p className="mb-2">{item.moTa.slice(0, 180)}...</p>
              ) : (
                <p className="mb-2">{item.moTa}</p>
              )}
              <p className="mb-0" title={`${item.danhGia / 2} sao`}>
                <Rate allowHalf value={item.danhGia / 2} />
              </p>
            </div>
            <div className="booking-trailer-button absolute bottom-5 right-5">
              <a
                href={item.trailer}
                className="trailer-button py-2 px-4 mr-5 font-bold"
                title="Xem trailer trên Youtube"
                target="_blank"
              >
                Trailer
              </a>
              <NavLink
                to={`/detail/${item.maPhim}`}
                className="booking-button py-2 px-5 font-bold "
                title="Bấm để đặt vé"
              >
                Đặt vé
              </NavLink>
            </div>
          </div>
        </div>
      );
    });
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
      {renderFilms()}
    </div>
  );
};

export default MultipleRowSlickMobile;
