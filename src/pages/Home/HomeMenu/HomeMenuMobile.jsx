import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Tabs } from "antd";
// import { Tabs, Radio, Space } from "antd";
import moment from "moment";
import "./HomeMenuMobile.css";
const { TabPane } = Tabs;

export default class HomeMenuMobile extends React.PureComponent {
  state = {
    tabPosition: "top",
    // screen: {
    //   width: window.innerWidth,
    //   height:   window.innerHeight,
    // }
  };

  componentDidMount() {
    // window.onload = () => {
    //   this.setState({
    //     screen: {
    //       width: window.innerWidth,
    //       height: window.innerHeight,
    //     }
    //   });
    // };
    // window.onresize = () => {
    //   this.setState({
    //     screen: {
    //       width: window.innerWidth,
    //       height: window.innerHeight,
    //     }
    //   });
    // };
    // return () => {
    //   window.removeEventListener("onload");
    //   window.removeEventListener("onresize");
    // };
  }

  changeTabPosition = (e) => {
    this.setState({ tabPosition: e.target.value });
  };

  renderHeThongRap = () => {
    return this.props.heThongRapChieu?.map((heThongRap, index) => {
      let { tabPosition } = this.state;
      return (
        <TabPane
          tab={
            <div className="flex justify-center">
              {" "}
              <img
                src={heThongRap.logo}
                className="rounded-full cursor-pointer"
                width="50"
                alt={heThongRap.logo}
                title={heThongRap.tenHeThongRap}
              />
            </div>
          }
          key={index}
        >
          <Tabs tabPosition={tabPosition}>
            {heThongRap.lstCumRap?.map((cumRap, index) => {
              return (
                <TabPane
                  tab={
                    <div className="flex items-center" title={cumRap.diaChi}>
                      <div className="text-left flex-col justify-center">
                        <p className="mb-0 font-bold cursor-pointer">
                          {cumRap.tenCumRap}
                        </p>
                        <p className="mb-0 cursor-pointer">
                          {" "}
                          {cumRap.diaChi.length > 40 ? (
                            <span className="text-gray-600">
                              {cumRap.diaChi.slice(0, 40)}...
                            </span>
                          ) : (
                            <span className="text-gray-600">
                              {cumRap.diaChi}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  }
                  key={index}
                >
                  {cumRap.danhSachPhim.slice(0, 12).map((phim, index) => {
                    return (
                      <Fragment key={index}>
                        <div className="booking-film w-full grid grid-cols-12">
                          <div
                            className="booking-film-img col-span-2 bg-cover"
                            title={phim.tenPhim}
                            style={{
                              backgroundImage: `url(${phim.hinhAnh})`,
                              backgroundPosition: "center",
                              backgroundClip: "content-box",
                              padding: "",
                            }}
                          ></div>
                          <div className="booking-film-info col-span-10 flex flex-col justify-between leading-normal">
                            <div>
                              <div
                                className="text-gray-900 font-bold mb-2"
                                title={phim.tenPhim}
                              >
                                {phim.tenPhim}
                              </div>
                              <p
                                className="text-gray-700 text-base"
                                title={cumRap.diaChi}
                              >
                                {cumRap.diaChi}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <div className="text-sm">
                                <div className="booking-film-info-time">
                                  {phim.lstLichChieuTheoPhim
                                    ?.slice(0, window.innerWidth < 450 ? 8 : 12)
                                    .map((lichChieu, index) => {
                                      return (
                                        <NavLink
                                          to={`/checkout/${lichChieu.maLichChieu}`}
                                          key={index}
                                          title={`Đặt vé lúc ${moment(
                                            lichChieu.ngayChieuGioChieu
                                          ).format("hh:mm A")}`}
                                          className=" text-blue-600 hover:text-red-600 text-xs cursor-pointer w-16"
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
                        <hr />
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
        <Tabs tabPosition={tabPosition}>{this.renderHeThongRap()}</Tabs>
      </section>
    );
  }
}
