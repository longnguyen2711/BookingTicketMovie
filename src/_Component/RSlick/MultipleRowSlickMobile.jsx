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
    return props.arrFilm?.map((item, index) => {
      return (
        <div className={`${styleSlick["width-item"]}`} key={index}>
          <div className="card grid grid-cols-12 relative mb-10 border-2 border-red-600 h-52">
            <div
              className="mul-background col-span-3 h-52"
              style={{ backgroundImage: `url(${item.hinhAnh})` }}
            >
              <img
                src={item.hinhAnh}
                alt="..."
                title={item.tenPhim}
                style={{ width: 200, height: 300, opacity: 0 }}
              />
            </div>
            <div className="col-span-9 p-3">
              <p className="">{item.tenPhim}</p>
              <p>
                Khởi chiếu: {moment(item.ngayKhoiChieu).format("DD.MM.YYYY")}
              </p>
              {item.moTa.length > 200 ? (
                <p>{item.moTa.slice(0, 200)}...</p>
              ) : (
                <p>{item.moTa}</p>
              )}
              <p>
                <Rate allowHalf value={item.danhGia / 2} />
              </p>
            </div>
            <div className="absolute bottom-0 right-0">
              <a
                href={item.trailer}
                className=" py-1 px-4 text-white bg-green-500 rounded mr-4"
                title="Xem trailer trên Youtube"
              >
                Trailer
              </a>
              <NavLink
                to={`/detail/${item.maPhim}`}
                className="py-1 px-4 text-white bg-green-500 rounded"
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
