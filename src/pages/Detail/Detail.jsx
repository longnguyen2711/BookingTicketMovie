import { layThongTinChiTietPhim } from "../../redux/actions/QuanLyRapActions";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Tabs } from "antd";
import { Rate } from "antd";
import moment from "moment";
import "./Detail.css";

const { TabPane } = Tabs;

export default function Detail(props) {
  const filmDetail = useSelector((state) => state.QuanLyPhimReducer.filmDetail);

  const dispatch = useDispatch();

  // Xét kích thước màn hình
  const [screen, setScreen] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Lấy thông tin param từ url
    let { id } = props.match.params;
    dispatch(layThongTinChiTietPhim(id));

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

  let selectTabPosition = "left";
  if (screen.width < 1000) {
    selectTabPosition = "top";
  }

  return (
    <section
      className="Detail"
      style={{ backgroundImage: `url(${filmDetail.hinhAnh})` }}
    >
      <div className="Detail__overlay flex-col items-center justify-center pt-40 pb-20">
        <div className="w-full top-32 flex flex-wrap justify-center items-center">
          <div
            className="film-picture self-start md:mr-20 mb-10 md:mb-0 w-3/4 md:w-1/2 "
            style={{ backgroundImage: `url(${filmDetail.hinhAnh})` }}
          >
            {" "}
            <img
              src={filmDetail.hinhAnh}
              alt={filmDetail.biDanh}
              title={filmDetail.tenPhim}
              className="opacity-0"
            />
          </div>
          <div className="film-information flex-col w-3/4 md:w-1/2">
            <div className="box ">
              <p className="text-yellow-400 font-bold text-2xl mb-1">
                {filmDetail.tenPhim}
              </p>
              <p className="text-yellow-400 font-bold">
                Ngày chiếu:{" "}
                {moment(filmDetail.ngayKhoiChieu).format("DD.MM.YYYY")}
              </p>
              <div className="btn-trailer absolute bottom-8 right-8">
                {" "}
                <a
                  href={filmDetail.trailer}
                  target="_blank"
                  title="Xem trailer trên Youtube"
                >
                  Trailer
                </a>
              </div>
              <p className="mb-0">{filmDetail.moTa}</p>
              <div className="mt-5 flex items-center">
                <div
                  className={`c100 p${filmDetail.danhGia * 10} small orange`}
                  title={`${filmDetail.danhGia * 10}%`}
                >
                  <span>{filmDetail.danhGia * 10}%</span>
                  <div className="slice">
                    <div className="bar" />
                    <div className="fill" />
                  </div>
                </div>
                <div className="ml-3 film-rate-start">
                  <h1 className="text-yellow-400 font-bold mb-0 text-lg text-center">
                    Đánh giá
                  </h1>
                  <h1 title={`${filmDetail.danhGia / 2} sao`}>
                    <Rate allowHalf value={filmDetail.danhGia / 2} />
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="Detail__overlay__booking flex justify-center w-full mt-10 md:mt-16 ">
            <div className="rounded-md bg-black bg-opacity-60 w-3/4">
              <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Lịch chiếu" key="1" style={{ minHeight: 150 }}>
                  <div>
                    <Tabs tabPosition={selectTabPosition}>
                      {filmDetail.heThongRapChieu?.map((htr, index) => {
                        return (
                          <TabPane
                            tab={
                              <div
                                className="flex items-center justify-center"
                                title={htr.tenHeThongRap}
                              >
                                <img
                                  src={htr.logo}
                                  width={50}
                                  height={50}
                                  alt={htr.logo}
                                />
                                <p className="ml-3 mb-0 font-bold hidden md:block text-white">
                                  {htr.tenHeThongRap}
                                </p>
                              </div>
                            }
                            key={index}
                          >
                            {htr.cumRapChieu?.map((cumRap, index) => {
                              return (
                                <div
                                  className="pl-8 md:pl-4 p-4 booking-info hover:bg-gray-200 hover:bg-opacity-20"
                                  key={index}
                                  title={cumRap.diaChi}
                                >
                                  <div className="vi-tri-chieu flex items-center justify-start">
                                    <img
                                      src={htr.logo}
                                      width={50}
                                      height={50}
                                      alt={htr.logo}
                                      title={cumRap.tenCumRap}
                                      className="img-info"
                                    />
                                    <div className="text-left text-white">
                                      <p className="ml-4 mb-1 font-bold">
                                        {cumRap.tenCumRap}
                                      </p>
                                      <p className="ml-4 mb-0 text-gray-300">
                                        Địa chỉ: {cumRap.diaChi}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="thong-tin-lich-chieu  text-left mt-2">
                                    <div className="grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-1 lg:grid-cols-5 lg:gap-3">
                                      {cumRap.lichChieuPhim
                                        ?.slice(0, 8)
                                        .map((lichChieu, index) => {
                                          return (
                                            <NavLink
                                              to={`/checkout/${lichChieu.maLichChieu}`}
                                              key={index}
                                              className="col-span-1 hover:text-red-600"
                                              title={` Đặt vé lúc ${moment(
                                                lichChieu.ngayChieuGioChieu
                                              ).format("hh:mm A")} `}
                                            >
                                              {moment(
                                                lichChieu.ngayChieuGioChieu
                                              ).format("hh:mm A")}
                                            </NavLink>
                                          );
                                        })}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </TabPane>
                        );
                      })}
                    </Tabs>
                  </div>
                </TabPane>
                <TabPane tab="Thông tin" key="2" style={{ minHeight: 150 }}>
                  <div className="p-5">
                    {filmDetail.moTa ? (
                      <p className="mb-0 text-justify text-white font-sans">
                        {filmDetail.moTa}
                      </p>
                    ) : (
                      <p className="mb-0 text-white">
                        Thông tin phim sẽ được cập nhật trong thời gian tới
                      </p>
                    )}
                  </div>
                </TabPane>
                <TabPane tab="Đánh giá" key="3" style={{ minHeight: 150 }} >
                  <div className="p-5 flex items-center">
                    {!filmDetail.moTa ? (
                      <p>Chưa có đánh giá về phim này</p>
                    ) : (
                      <div className="ml-10 flex items-center">
                        <div
                          title={`${filmDetail.danhGia * 10}%`}
                          className={`c100 p${
                            filmDetail.danhGia * 10
                          } small orange`}
                        >
                          <span>{filmDetail.danhGia * 10}%</span>
                          <div className="slice">
                            <div className="bar" />
                            <div className="fill" />
                          </div>
                        </div>
                        <div className="ml-3 film-rate-start">
                          <h1 className="text-yellow-400 font-bold mb-0 text-lg text-left">
                            Đánh giá
                          </h1>
                          <h1 title={`${filmDetail.danhGia / 2} sao`}>
                            <Rate allowHalf value={filmDetail.danhGia / 2} />
                          </h1>
                        </div>
                      </div>
                    )}
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
