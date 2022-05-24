import { NavLink } from "react-router-dom";
import React, { Fragment } from "react";
import { Tabs } from "antd";
import moment from "moment";
import "./HomeMenu.css";

const { TabPane } = Tabs;

export default class HomeMenu extends React.PureComponent {
  state = {
    tabPosition: "left",
  };

  changeTabPosition = (e) => {
    this.setState({ tabPosition: e.target.value });
  };

  componentDidMount() {}

  renderHeThongRap = () => {
    return this.props.heThongRapChieu?.map((heThongRap, index) => {
      let { tabPosition } = this.state;
      return (
        <TabPane
          tab={
            <div>
              {" "}
              <img
                src={heThongRap.logo}
                className="rounded-full m-2"
                width="50"
                alt={heThongRap.logo}
                title={heThongRap.tenHeThongRap}
              />
            </div>
          }
          key={index}
        >
          <Tabs tabPosition={tabPosition}>
            {heThongRap.lstCumRap?.slice(0,10).map((cumRap, index) => {
              return (
                <TabPane
                  tab={
                    <div
                      className="flex items-center mt-0"
                      title={cumRap.diaChi}
                    >
                      <img
                        src={heThongRap.logo}
                        className="rounded-full"
                        width="40"
                        alt={heThongRap.logo}
                      />{" "}
                      <div className="text-left ml-5 flex-col justify-center">
                        <p className="mb-0 font-bold text-gray-100">{cumRap.tenCumRap}</p>
                        <p className="mb-0">
                          {" "}
                          {cumRap.diaChi.length > 40 ? (
                            <span className="text-gray-300">
                              {cumRap.diaChi.slice(0, 40)}...
                            </span>
                          ) : (
                            <span className="text-gray-300">
                              {cumRap.diaChi}
                            </span>
                          )}
                        </p>
                      </div>
                      <hr />
                    </div>
                  }
                  key={index}
                >
                  {cumRap.danhSachPhim.slice(0, 8).map((phim, index) => {
                    return (
                      <Fragment key={index}>
                        <div>
                          <div className="film-info grid grid-cols-12 w-full border-b border-gray-400">
                            <div
                              className="col-span-4 lg:col-span-2 h-full text-center"
                              title={phim.tenPhim}
                              style={{
                                backgroundImage: `url(${phim.hinhAnh})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                              }}
                            ></div>
                            <div className="col-span-8 lg:col-span-10 rounded-b p-4 flex flex-col leading-normal">
                              <div>
                                <div
                                  className="text-gray-100 font-bold text-xl mb-2"
                                  title={phim.tenPhim}
                                >
                                  {phim.tenPhim}
                                </div>
                                <p
                                  className="text-gray-300 text-base"
                                  title={cumRap.diaChi}
                                >
                                  {cumRap.diaChi}
                                </p>
                              </div>
                              <div className="flex items-center">
                                <div className="text-sm">
                                  <div className="booking-film-info-time">
                                    {phim.lstLichChieuTheoPhim
                                      ?.slice(
                                        0,
                                        window.innerWidth < 1100 ? 8 : 12
                                      )
                                      .map((lichChieu, index) => {
                                        return (
                                          <NavLink
                                            to={`/checkout/${lichChieu.maLichChieu}`}
                                            key={index}
                                            title={`Đặt vé lúc ${moment(
                                              lichChieu.ngayChieuGioChieu
                                            ).format("hh:mm A")}`}
                                            className=" text-blue-500 hover:text-red-500 text-xs cursor-pointer w-16"
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
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };

  render() {
    const { tabPosition } = this.state;
    return (
      <section>
        <Tabs>{this.renderHeThongRap()}</Tabs>
        {/* <Tabs tabPosition={tabPosition}>{this.renderHeThongRap()}</Tabs> */}
      </section>
    );
  }
}
