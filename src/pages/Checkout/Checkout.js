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
import {
  ACCESSTOKEN,
  USER_LOGIN,
} from "../../util/settings/config";
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
        ghe.stt % 8 === 0 && ghe.stt % 16 !== 0 ? "mr-5" : "";
      let classSpacingWidth = ghe.stt >= 65 && ghe.stt <= 80 ? "mb-5" : "";

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
            <button
              disabled={ghe.daDa || classGheNguoiKhacDangDat !== ""}
              className={`ghe ${classGheNguoiKhacDangDat} ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classSpacingHeight} ${classSpacingWidth} ${classGheDaDuocBanThanDat} m-2`}
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
                  <i class="fa fa-check"></i>
                ) : (
                  <i class="fa fa-times"></i>
                )
              ) : classGheNguoiKhacDangDat !== "" ? (
                <i class="fa fa-times"></i>
              ) : (
                ghe.stt
              )}
            </button>
          }
          {/* Nếu số ghế thứ n chia hết cho 16 thì sẽ xuống dòng */}
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

    // Để làm background khi đặt vé của từng phim
    // const filmDetail = useSelector((state) => state.QuanLyPhimReducer.filmDetail);
    // style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, backgroundPosition: "cover", backgroundRepeat:"no" }}

  return (
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

          <div className="mt-5 flex justify-center items-center w-full">
            <table className="divide-y divide-gray-200 w-full">
              <thead className="bg-gray-50 p-5 w-full">
                <tr>
                  <th>Ghế chưa đặt</th>
                  <th>Ghế Vip chưa đặt</th>
                  <th>Ghế bạn đang đặt</th>
                  <th>Ghế bạn đã đặt</th>
                  <th>Ghế người khác đang đặt</th>
                  <th>Ghế người khác đã đặt</th>
                </tr>
              </thead>
              <tbody className="bg-gray-50 p-5 w-full">
                <tr>
                  <td className="text-center pt-4">
                    <button title="Ghế chưa đặt" className="ghe">
                      01
                    </button>
                  </td>
                  <td className="text-center pt-4">
                    <button title="Ghế Vip chưa đặt" className="ghe gheVip">
                      01
                    </button>
                  </td>
                  <td className="text-center pt-4">
                    <button title="Ghế bạn đang đặt" className="ghe gheDangDat">
                      01
                    </button>
                  </td>
                  <td className="text-center pt-4">
                    <button
                      title="Ghé bạn đã đặt"
                      className="ghe gheBanThanDat gheDaDat"
                    >
                      <i className="fa fa-check"></i>
                    </button>
                  </td>
                  <td className="text-center pt-4">
                    <button
                      title="Ghế người khác đang đặt"
                      className="ghe gheNguoiKhacDangDat"
                    >
                      <i class="fa fa-times"></i>
                    </button>
                  </td>
                  <td className="text-center pt-4">
                    <button
                      title="Ghế người khác đã đặt"
                      className="ghe gheDaDat"
                    >
                      <i class="fa fa-times"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="text-center">{tongGheThuongConLai}</td>
                  <td className="text-center">{tongGheVipConLai}</td>
                  <td className="text-center">{danhSachGheDangDat.length}</td>
                  <td className="text-center">{gheBanThanDaDat}</td>
                  <td className="text-center">
                    {danhSachGheKhachDangDat.length}
                  </td>
                  <td className="text-center">
                    {tongGheDaDat - gheBanThanDaDat}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-3 min-h-screen">
          <h3 className="text-green-400 text-center text-2xl">
            {" "}
            {danhSachGheDangDat
              .reduce((tongTien, gheDD, index) => {
                return (tongTien += gheDD.giaVe);
              }, 0)
              .toLocaleString()}{" "}
            VNĐ
          </h3>
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
              <span>Ghế đang chọn: </span>
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
            <span>Email: </span>          
            {userLogin.email}
          </div>
          <hr />
          <div className="my-5">
            <span>Số điện thoại: </span>
            {userLogin.soDT}
          </div>
          <hr />
          <div className="mb-0 h-full flex flex-col justify-end items-center">
            <div
              onClick={() => {
                // Tạo và gán lại thông tin đặt vé
                const thongTinDatVe = new ThongTinDatVe();
                thongTinDatVe.maLichChieu = props.match.params.id;
                thongTinDatVe.danhSachVe = danhSachGheDangDat;
                // Dispatch
                dispatch(datVeAction(thongTinDatVe));
              }}
              className="bg-green-500 text-white w-full text-center py-2 font-bold text-xl cursor-pointer"
            >
              đặt vé
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
          <div className="flex">
            <button
              title="Bấm để đăng xuất"
              onClick={() => {
                // Xóa trong localStorage
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(ACCESSTOKEN);
                // Chuyển hướng về home
                props.history.push("/home");
                // Reload lại trang web
                window.location.reload();
              }}
            >
              Đăng xuất
            </button>
            <button
              onClick={() => {
                props.history.push("/profile");
              }}
              className="flex justify-center items-center h-full ml-10"
              title={`Tài khoản khách: ${userLogin.taiKhoan} `}
            >
              <div className="font-bold">{userLogin.taiKhoan}</div>
              <div className="w-9 h-9 rounded-full bg-black text-yellow-500 font-bold flex justify-center items-center text-2xl ml-3">
                <p className="mb-2">{userLogin.taiKhoan.substr(0, 1)}</p>
              </div>
            </button>
          </div>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );

  // Khi chuyển sang trang khác sau đó bấm nút quay lại sẽ chuyển vào 01 CHỌN GHẾ - THANH TOÁN
  useEffect(() =>{
    dispatch({
      type: CHANGE_TAB_ACTIVE,
      number: "1",
    });
  }, [])

  return (
    <div className=" flex justify-center">
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
        <TabPane
          tab={
            <NavLink
              to="/"
              title="Về trang chủ"
              aria-label="Về trang chủ"
              className="items-center p-2 hidden lg:flex"
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
        <TabPane tab="01 CHỌN GHẾ - THANH TOÁN" key="1">
          <Checkout {...props} />
        </TabPane>
        <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
          <KetQuaDatVe {...props} />
        </TabPane>
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
      <section className="text-gray-600 body-font">
        <div className="px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
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
