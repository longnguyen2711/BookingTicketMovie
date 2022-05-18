import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Tabs } from "antd";
// import { Tabs, Radio, Space } from "antd";
import moment from "moment";
import "./HomeMenu.css";
const { TabPane } = Tabs;

export default class HomeMenuMobile extends React.PureComponent {
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
                className="rounded-full"
                width="50"
                alt={heThongRap.logo}
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
                      <img
                        src={heThongRap.logo}
                        className="rounded-full"
                        width="40"
                        alt={heThongRap.logo}
                      />{" "}
                      <div className="text-left ml-5 flex-col justify-center">
                        <p className="mb-0 font-bold">{cumRap.tenCumRap}</p>
                        <p className="mb-0">
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
                        <p className="mb-0 text-red-500 cursor-pointer">
                          Chi tiết
                        </p>
                      </div>
                    </div>
                  }
                  key={index}
                >
                  {cumRap.danhSachPhim.slice(0, 5).map((phim, index) => {
                    return (
                      <Fragment key={index}>
                        <div
                          className="p-10 cursor-pointer"
                          title={phim.tenPhim}
                        >
                          <div className=" w-full lg:max-w-full lg:flex">
                            <div
                              className="w-1/4 border-t border-b border-l border-gray-400 h-48 lg:h-auto flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                              style={{
                                backgroundImage: `url(${phim.hinhAnh})`,
                                backgroundPosition: "center",
                                backgroundClip: "content-box",
                                padding: "5px",
                              }}
                            ></div>
                            <div className="w-3/4 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                              <div>
                                <div className="text-gray-900 font-bold text-xl mb-2">
                                  {phim.tenPhim}
                                </div>
                                <p className="text-gray-700 text-base">
                                  {cumRap.diaChi}
                                </p>
                              </div>
                              <div className="flex items-center">
                                <div className="text-sm">
                                  <div className="grid grid-cols-4 gap-3">
                                    {phim.lstLichChieuTheoPhim
                                      ?.slice(0, 8)
                                      .map((lichChieu, index) => {
                                        return (
                                          <NavLink
                                            to={`/checkout/${lichChieu.maLichChieu}`}
                                            key={index}
                                            className=" text-blue-600 hover:text-red-600 text-xs	font-sans	"
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
      <div>
        {/* <Tabs tabPosition={tabPosition}>{this.renderHeThongRap()}</Tabs> */}

        <div class="p-10">

<div class="dropdown inline-block relative">
  <button class="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
    <span class="mr-1">Dropdown</span>
    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
  </button>
  <ul class="dropdown-menu absolute hidden text-gray-700 pt-1">
    <li class=""><a class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">One</a></li>
    <li class=""><a class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Two</a></li>
    <li class=""><a class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Three is the magic number</a></li>
  </ul>
</div>

</div>
      </div>
    );
  }
}
