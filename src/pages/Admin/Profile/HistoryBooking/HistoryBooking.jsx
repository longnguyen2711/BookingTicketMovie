import { layThongTinNguoiDungAction } from "../../../../redux/actions/QuanLyNguoiDungActions";
import { useDispatch, useSelector } from "react-redux";
import React, { Fragment, useEffect } from "react";
import "./HistoryBooking.css";
import moment from "moment";
import _ from "lodash";

export default function HistoryBooking() {
  const { thongTinNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const action = layThongTinNguoiDungAction();
    dispatch(action);
  }, []);

  return (
    <div>
      <h3 className="text-4xl mb-10">Lịch sử đặt vé</h3>
      <div id="booking-history" className="flex flex-wrap justify-between m-5">
        {thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
          const seats = _.first(ticket.danhSachGhe);
          return (
            <div
              className="ticket-item py-2 px-5 md:px-2 w-full lg:w-1/2"
              key={index}
            >
              <div className="h-full flex items-center border-black border p-4 rounded-lg bg-black bg-opacity-80 text-white">
                <img
                  alt="team"
                  className="hidden sm:flex w-16 md:w-24 lg:w-20 h-16 md:h-24 lg:h-20 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src={ticket.hinhAnh}
                />
                <div className="flex-grow">
                  <h2 className="text-xl font-bold">{ticket.tenPhim}</h2>
                  <p className="mb-1">
                    - Ngày chiếu: {moment(ticket.ngayDat).format("DD-MM-YYYY")}
                  </p>
                  <p className="mb-1">
                    - Xuất chiếu: {moment(ticket.ngayDat).format("hh:mm A")}{" "}
                  </p>
                  <p className="mb-1">- Địa điểm: {seats.tenHeThongRap}</p>
                  <p className="mb-1">- Tên rạp: {seats.tenCumRap}</p>
                  <p className="mb-1">
                    - Ghế:{" "}
                    {ticket.danhSachGhe.map((ghe, index) => {
                      return <span key={index}> {ghe.tenGhe}</span>;
                    })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
