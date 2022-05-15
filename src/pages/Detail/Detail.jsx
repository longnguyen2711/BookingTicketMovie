import React, { useEffect } from "react";
import "./Detail.css";
import { Tabs, Radio, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinChiTietPhim } from "../../redux/actions/QuanLyRapActions";
import moment from "moment";
import { Rate } from "antd";
import { NavLink } from "react-router-dom";

const { TabPane } = Tabs;

export default function Detail(props) {
  const filmDetail = useSelector((state) => state.QuanLyPhimReducer.filmDetail);

  const dispatch = useDispatch();

  useEffect(() => {
    // Lấy thông tin param từ url
    let { id } = props.match.params;
    dispatch(layThongTinChiTietPhim(id));
  }, []);

  return (
    <section
      className="Detail relative"
      style={{ backgroundImage: `url(${filmDetail.hinhAnh})` }}
    >
      <div className="Detail__overlay flex-col items-center justify-center">
        <div className="w-full absolute top-32 flex flex-wrap justify-center items-center">
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
              <div className="film-rate mt-5 flex items-center">
                <div
                  className={`c100 p${filmDetail.danhGia * 10} small orange`}
                >
                  <span>{filmDetail.danhGia * 10}%</span>
                  <div className="slice">
                    <div className="bar" />
                    <div className="fill" />
                  </div>
                </div>
                <div className="ml-3">
                  <h1 className="text-yellow-400 font-bold mb-0 text-lg text-center">
                    Đánh giá
                  </h1>
                  <h1>
                    <Rate allowHalf value={filmDetail.danhGia / 2} />
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="Detail__overlay__booking flex justify-center w-full mt-10 md:mt-16 ">
            <div className="rounded bg-white px-5 py-5 w-3/4">
              <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Lịch chiếu" key="1" style={{ minHeight: 100 }}>
                  <div>
                    <Tabs tabPosition={"left"}>
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
                                <p className="ml-3 mb-0 font-bold">
                                  {htr.tenHeThongRap}
                                </p>
                              </div>
                            }
                            key={index}
                          >
                            {htr.cumRapChieu?.map((cumRap, index) => {
                              return (
                                <div
                                  className="mb-4 cursor-pointer"
                                  key={index}
                                  title={cumRap.diaChi}
                                >
                                  <div className="flex items-center justify-start">
                                    <img
                                      src={htr.logo}
                                      width={50}
                                      height={50}
                                      alt={htr.logo}
                                    />
                                    <div className="text-left">
                                      <p className="ml-3 mb-1 font-bold">
                                        {cumRap.tenCumRap}
                                      </p>
                                      <p className="ml-3 mb-0 text-gray-600">
                                        Địa chỉ: {cumRap.diaChi}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="thong-tin-lich-chieu  text-left mt-2 ml-16">
                                    <div className="grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-1 lg:grid-cols-5 lg:gap-3">
                                      {cumRap.lichChieuPhim
                                        ?.slice(0, 8)
                                        .map((lichChieu, index) => {
                                          return (
                                            <NavLink
                                              to=""
                                              key={index}
                                              className="col-span-1"
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
                <TabPane tab="Thông tin" key="2" style={{ minHeight: 100 }}>
                  Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Đánh giá" key="3" style={{ minHeight: 100 }}>
                  Content of Tab Pane 3
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
