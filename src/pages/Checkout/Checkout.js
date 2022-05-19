import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { layChiTietPhongVeAction } from "../../redux/actions/QuanLyDatVeActions";
import { DAT_VE } from "../../redux/types";
import "./Checkout.css";
import _ from "lodash";

export default function Checkout(props) {
  // Để làm background khi đặt vé của từng phim
  // const filmDetail = useSelector((state) => state.QuanLyPhimReducer.filmDetail);

  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const { chiTietPhongVe, danhSachGheDangDat } = useSelector(
    (state) => state.QuanLyDatVeReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const action = layChiTietPhongVeAction(props.match.params.id);
    dispatch(action);
  }, []);

  const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

  const renderSeats = () => {
    return danhSachGhe.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDaDat = ghe.daDat === true ? "gheDaDat" : "";
      let classSpacingHeight =
        ghe.stt % 8 === 0 && ghe.stt % 16 !== 0 ? "mr-5" : "";
      let classSpacingWidth = ghe.stt >= 65 && ghe.stt <= 80 ? "mb-5" : "";
      let classGheDangDat = "";
      let indexGheDangDat = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );
      if (indexGheDangDat !== -1) {
        classGheDangDat = "gheDangDat";
      }
      return (
        <Fragment key={index}>
          {
            <button
              disabled={ghe.daDat}
              className={`ghe ${classGheVip}  ${classGheDaDat} ${classGheDangDat} ${classSpacingHeight} ${classSpacingWidth} m-2`}
              key={index}
              onClick={() => {
                dispatch({
                  type: DAT_VE,
                  gheDuocChon: ghe,
                });
              }}
            >
              {/* Nếu ghế ở trạng thái đã đặt thì load ra dấu X trong thư viện của antDesign */}
              {ghe.daDat ? <i class="fa fa-times"></i> : ghe.stt}
            </button>
          }
          {/* Nếu số ghế thứ n chia hết cho 16 thì sẽ xuống dòng */}
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  return (
    // style={{ backgroundImage: `url(${filmDetail.hinhAnh})` }}
    <div className="min-h-screen mt-10" id="checkout">
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          <div className="flex flex-col items-center">
            <div className="w-11/12 bg-black h-3"></div>
            <div className="screen relative">
              <p className="absolute top-0 left-0">MÀN HÌNH</p>
            </div>
            <div className="mt-10 flex justify-center">
              <div>{renderSeats()}</div>
            </div>
          </div>
        </div>
        <div className="col-span-3 min-h-screen">
          <h3 className="text-green-400 text-center text-2xl">                {danhSachGheDangDat
                  .reduce((tongTien, gheDD, index) => {
                    return (tongTien += gheDD.giaVe);
                  }, 0)
                  .toLocaleString()} VNĐ</h3>
          <hr />
          <h3 className="text-xl">{thongTinPhim.tenPhim}</h3>
          <p>
            Địa điểm: {thongTinPhim.diaChi} - {thongTinPhim.tenRap}
          </p>
          <p>
            Ngày chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}
          </p>
          <hr />
          <div className="my-5 flex-col justify-start">
            <div>
              <span>Ghế: </span>
              <span className="text-red-400">
                {danhSachGheDangDat
                  .sort((ghe, gheTT) => {
                    return ghe.stt - gheTT.stt;
                  })
                  .map((gheDD, index) => {
                    return <span key={index}>{gheDD.stt} </span>;
                  })}
              </span>
            </div>
            <div className="text-left">
              <span>Tổng tiền: </span>

              <span className="text-green-500">
                {danhSachGheDangDat
                  .reduce((tongTien, gheDD, index) => {
                    return (tongTien += gheDD.giaVe);
                  }, 0)
                  .toLocaleString()}
              </span>
              <span> VNĐ</span>
            </div>
          </div>
          <hr />
          <div className="my-5">
            <i>Email</i>
            <br />
            {userLogin.email}
          </div>
          <hr />
          <div className="my-5">
            <i>Số điện thoại</i>
            <br />
            {userLogin.soDT}
          </div>
          <hr />
          <div className="mb-0 h-full flex flex-col justify-end items-center">
            <div className="bg-green-500 text-white w-full text-center py-2 font-bold text-xl cursor-pointer">
              đặt vé
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
