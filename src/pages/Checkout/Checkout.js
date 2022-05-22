import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  datVeAction,
  layChiTietPhongVeAction,
} from "../../redux/actions/QuanLyDatVeActions";
import { layThongTinNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungActions";
import { CHANGE_TAB_ACTIVE, DANG_XUAT_ACTION, DAT_VE } from "../../redux/types";
import "./Checkout.css";
import _ from "lodash";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { Tabs } from "antd";
import moment from "moment";
import { history } from "../../App";
import { ACCESSTOKEN, USER_LOGIN } from "../../util/settings/config";
import { NavLink } from "react-router-dom";

function Checkout(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDangDat } =
    useSelector((state) => state.QuanLyDatVeReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const action = layChiTietPhongVeAction(props.match.params.id);
    dispatch(action);
  }, []);

  const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

  var gheBanThanDaDat = 0;
  var tongGheDaDat = 0;
  var tongGheVipConLai = 0;
  var tongGheThuongConLai = 0;

  const renderSeats = () => {
    return danhSachGhe.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDaDat = ghe.daDat === true ? "gheDaDat" : "";
      let classSpacingHeight =
        ghe.stt % 8 === 0 && ghe.stt % 16 !== 0 ? "bg-green-500" : "";
      let classSpacingWidth =
        ghe.stt >= 65 && ghe.stt <= 80 ? "mb-2 md:mb-4" : "";

      // Đếm tổng số ghế
      if (ghe.daDat && userLogin.taiKhoan) {
        tongGheDaDat++;
      }
      // Đếm ghế bản thân đã đặt
      if (ghe.daDat && userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        gheBanThanDaDat++;
      }
      // Đếm ghế Vip chưa được đặt
      if (!ghe.daDat && ghe.loaiGhe === "Vip") {
        tongGheVipConLai++;
      }
      // Đếm ghế thường chưa được dặt
      if (!ghe.daDat && ghe.loaiGhe === "Thuong") {
        tongGheThuongConLai++;
      }

      let classGheDaDuocBanThanDat = "";
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocBanThanDat = "gheBanThanDat";
      }

      // Kiểm tra từng ghế render xem có trong mảng ghế đang đặt hay không
      let classGheDangDat = "";
      let indexGheDangDat = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );
      if (indexGheDangDat !== -1) {
        classGheDangDat = "gheDangDat";
      }
      // Kiểm tra từng ghế render xem có phải trong mảng ghế khách đang đặt hay không
      let classGheNguoiKhacDangDat = "";
      let indexGheNguoiKhacDangDat = danhSachGheKhachDangDat.findIndex(
        (gheNKDD) => gheNKDD.maGhe === ghe.maGhe
      );
      if (indexGheNguoiKhacDangDat !== -1) {
        classGheNguoiKhacDangDat = "gheNguoiKhacDangDat";
      }

      return (
        <Fragment key={index}>
          {
            <div className={`flex justify-center ${classSpacingHeight}`}>
              <button
                disabled={ghe.daDat || classGheNguoiKhacDangDat !== ""}
                className={`ghe ${classSpacingWidth} ${classGheNguoiKhacDangDat} ${classGheVip} ${classGheDaDat} ${classGheDangDat}  ${classGheDaDuocBanThanDat}`}
                key={index}
                title={ghe.stt}
                onClick={() => {
                  dispatch({
                    type: DAT_VE,
                    gheDuocChon: ghe,
                  });
                }}
              >
                {/* (Nếu ghế đã được đặt của người khác thì X ko thì của bản thân) hoặc (Nếu ghế người khác đang đặt thì X ngược lại ghế thường) */}
                {ghe.daDat ? (
                  userLogin.taiKhoan === ghe.taiKhoanNguoiDat ? (
                    <i className="fa fa-check"></i>
                  ) : (
                    <i className="fa fa-times"></i>
                  )
                ) : classGheNguoiKhacDangDat !== "" ? (
                  <i className="fa fa-times"></i>
                ) : (
                  ghe.stt
                )}
              </button>
            </div>
          }
        </Fragment>
      );
    });
  };

  return (
    <div
      className="px-10 p-14 border-t"
      id="checkout"
      style={{ backgroundImage: `url(${thongTinPhim.hinhAnh})` }}
    >
      <div className="checkout__overlay z-0 absolute"></div>
      <div className="checkout-left-screen flex justify-center items-start z-50 px-4 pt-10 pb-6">
        <div>
          <div className="flex flex-col items-center">
            <div className="screen relative">
              <div className="w-full bg-gray-500 h-4 rounded-t-md"></div>
              <p className="absolute left-5 top-6 font-bold text-black">
                MÀN HÌNH
              </p>
            </div>
            <div className="mt-10 flex justify-center">
              <div className="checkout-seats">{renderSeats()}</div>
            </div>
          </div>

          <div className="note-seat px-8 font-bold mt-5 flex justify-center items-center w-full">
            <div>
              <button title="Ghế chưa đặt" className="ghe">
                01
              </button>
              <span className="ml-3">
                Ghế chưa đặt: <span>{tongGheThuongConLai}</span>
              </span>
            </div>
            <div>
              <button title="Ghế Vip chưa đặt" className="ghe gheVip">
                01
              </button>
              <span className="ml-3">
                Ghế Vip chưa đặt: <span>{tongGheVipConLai}</span>
              </span>
            </div>
            <div>
              <button title="Ghế bạn đang đặt" className="ghe gheDangDat">
                01
              </button>
              <span className="ml-3">
                Ghế bạn đang đặt: <span>{danhSachGheDangDat.length}</span>
              </span>
            </div>
            <div>
              <button title="Ghế bạn đã đặt" className="ghe gheBanThanDat">
                <i className="fa fa-check"></i>
              </button>
              <span className="ml-3">
                Ghế bạn đã đặt: <span>{gheBanThanDaDat}</span>
              </span>
            </div>
            <div>
              <button
                title="Ghế người khác đang đặt"
                className="ghe gheNguoiKhacDangDat"
              >
                <i className="fa fa-times"></i>
              </button>
              <span className="ml-3">
                Ghế người khác đang đặt:{" "}
                <span>{danhSachGheKhachDangDat.length}</span>
              </span>
            </div>
            <div>
              <button title="Ghế người khác đã đặt" className="ghe gheDaDat">
                <i className="fa fa-times"></i>
              </button>
              <span className="ml-3">
                Ghế người khác đã đặt:{" "}
                <span>{tongGheDaDat - gheBanThanDaDat}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="checkout-right-infoTicket flex justify-center items-start z-50  text-white">
        <div>
          <h3 className="text-green-500 text-center text-2xl pb-4 pt-5 mb-0">
            {" "}
            {danhSachGheDangDat
              .reduce((tongTien, gheDD, index) => {
                return (tongTien += gheDD.giaVe);
              }, 0)
              .toLocaleString()}{" "}
            VNĐ
          </h3>
          <hr />
          <h3 className="text-xl mt-3 text-white">{thongTinPhim.tenPhim}</h3>
          <div>
            <span className="font-bold">Địa điểm: </span>
            <span>
              {thongTinPhim.diaChi} - {thongTinPhim.tenRap}
            </span>
          </div>
          <div className="my-3">
            <span className="font-bold">Ngày chiếu: </span>
            <span>
              {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}
            </span>
          </div>
          <hr />
          <div className="my-4 flex-col justify-start">
            <div className="mb-3">
              <span className="font-bold">Ghế đang chọn: </span>
              <span className="text-orange-700 ">
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
              <span className="font-bold">Tổng tiền: </span>

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
          <div className="my-4">
            <span className="font-bold">Email: </span>
            <span className="italic">{userLogin.email}</span>
          </div>
          <hr />
          <div className="my-4">
            <span className="font-bold">Số điện thoại: </span>
            <span className="italic">{userLogin.soDT}</span>
          </div>
          <div className="nutDatVe mt-8 mb-0 h-full flex flex-col justify-end items-center">
            <div
              onClick={() => {
                // Tạo và gán lại thông tin đặt vé
                const thongTinDatVe = new ThongTinDatVe();
                thongTinDatVe.maLichChieu = props.match.params.id;
                thongTinDatVe.danhSachVe = danhSachGheDangDat;
                // Dispatch
                dispatch(datVeAction(thongTinDatVe));
              }}
              className="bg-green-600 hover:bg-green-500 text-black hover:text-white w-full text-center py-2 mb-7 font-bold text-xl cursor-pointer  rounded"
            >
              Đặt vé
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const { TabPane } = Tabs;

export default function CheckoutTab(props) {
  const { tabActive } = useSelector((state) => state.QuanLyDatVeReducer);
  const dispatch = useDispatch();

  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const operations = (
    <Fragment>
      {!_.isEmpty(userLogin) ? (
        <Fragment>
          <div className="flex checkout-profile-logout">
            <div className="logout flex items-center">
              <button
                className="text-white font-bold"
                title="Bấm để đăng xuất"
                onClick={() => {
                  if (window.confirm("Bạn có chắc muốn đăng xuất ?")) {
                    // Xóa trong localStorage
                    localStorage.removeItem(USER_LOGIN);
                    localStorage.removeItem(ACCESSTOKEN);
                    // Chuyển hướng về home
                    history.push("/home");
                    // Reload lại trang web
                    window.location.reload();
                  }
                }}
              >
                Đăng xuất
              </button>
            </div>
            <div className="profile">
              <button
                onClick={() => {
                  props.history.push("/admin/profile");
                }}
                className="flex justify-center items-center h-full ml-10 text-white"
                title="Đến trang cá nhân"
              >
                <div className="font-bold">{userLogin.taiKhoan}</div>
                <div className="w-9 h-9 rounded-full bg-black text-yellow-500 font-bold flex justify-center items-center text-2xl ml-3">
                  <p className="mb-0 pb-1">{userLogin.taiKhoan.substr(0, 1)}</p>
                </div>
              </button>
            </div>
          </div>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );

  // Khi chuyển sang trang khác sau đó bấm nút quay lại sẽ chuyển vào 01 CHỌN GHẾ - THANH TOÁN
  useEffect(() => {
    dispatch({
      type: CHANGE_TAB_ACTIVE,
      number: "1",
    });
  }, []);

  return (
    <div className="ant-checkout flex justify-center bg-black">
      <Tabs
        tabBarExtraContent={operations}
        defaultActiveKey="1"
        activeKey={tabActive}
        onChange={(key) => {
          dispatch({
            type: CHANGE_TAB_ACTIVE,
            number: key,
          });
        }}
      >
        <TabPane tab="01 CHỌN GHẾ - THANH TOÁN" key="1">
          <Checkout {...props} />
        </TabPane>
        <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
          <KetQuaDatVe {...props} />
        </TabPane>
        <TabPane
          tab={
            <NavLink
              to="/"
              title="Về trang chủ"
              aria-label="Về trang chủ"
              className="items-center p-2 hidden md:flex"
            >
              <img
                src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
                alt="cyberlearn.vn"
                width={100}
              />
            </NavLink>
          }
          key="3"
        ></TabPane>
      </Tabs>
    </div>
  );
}

function KetQuaDatVe(props) {
  const dispatch = useDispatch();

  const { thongTinNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  //Kẹt chưa dispatch được
  //Kẹt chưa dispatch được
  //Kẹt chưa dispatch được
  //Kẹt chưa dispatch được

  useEffect(() => {
    console.log("first");

    const action = layThongTinNguoiDungAction();
    dispatch(action);
  }, []);

  console.log(thongTinNguoiDung, "thongtingnoidung");

  const renderTicketItem = () => {
    return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
      const seats = _.first(ticket.danhSachGhe);
      return (
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img
              alt="team"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src="https://picsum/photo/1000"
            />
            <div className="flex-grow">
              <h2 className="text-gray-900 title-font">{ticket.tenPhim}</h2>
              <p className="text-gray-500">
                Xuất chiếu: {moment(ticket.ngayDat).format("hh:mm A")}{" "}
              </p>
              <p className="text-gray-500">
                Ngày chiếu {moment(ticket.ngayDat).format("DD-MM-YYYY")}
              </p>
              <p>Địa điểm: {seats.tenHeThongRap}</p>
              <p>Tên rạp: {seats.tenCumRap}</p>
              <p>
                Ghế:{" "}
                {ticket.danhSachGhe.map((ghe, index) => {
                  return <span key={index}>{ghe.tenGhe}</span>;
                })}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="">
      <section className="text-gray-600 body-font bg-white z-50">
        <div className="py-24 mx-auto">
          <div className="w-screen flex flex-col text-center mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Lịch sử đặt vé khách hàng
            </h1>
            <p className=" mx-auto leading-relaxed text-base">
              Xem thông tin địa chỉ và thời gian để xem phim vui vẻ bạn nhé!
            </p>
          </div>
          <div className="flex flex-wrap -m-2">{renderTicketItem()}</div>
        </div>
      </section>
    </div>
  );
}
