import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import { Tabs, Radio, Space } from "antd";
import { connect } from "react-redux";
import moment from "moment";
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
            <img src={heThongRap.logo} className="rounded-full" width="50"/>
          }
          key={index}
        >
          <Tabs tabPosition={tabPosition}>
            {heThongRap.lstCumRap?.map((cumRap, index) => {
              return (
                <TabPane
                  tab={
                    <div
                      className="flex items-center"
                      style={{ width: "300px" }}
                      title={cumRap.diaChi}
                    >
                      <img
                        src={heThongRap.logo}
                        className="rounded-full"
                        width="40"
                      />{" "}
                      <div className="text-left ml-3 flex-col justify-center">
                        <p className="mb-0 font-bold"> {cumRap.tenCumRap}</p>
                        <p className="mb-0"> {cumRap.diaChi.length > 20 ? <span>{cumRap.diaChi.slice(0,30)}...</span> : <span>{cumRap.diaChi}</span>}</p>
                        <p className="mb-0 text-red-500 cursor-pointer">
                          Chi tiết
                        </p>
                      </div>
                    </div>
                  }
                  key={index}
                >{cumRap.danhSachPhim.slice(0, 4).map((phim,index) => {
                  return <Fragment key={index}>
                    <div className="p-5 hover:bg-violet-600">
                      <div className="flex items-start">
                        <img style={{width:75, height:75}} src={phim.hinhAnh} alt={phim.tenPhim} onError={e => {
                          e.target.onError = null; e.target.src = 'https://picsum.photos/75/75'
                        }}/>
                        <div className="ml-3">
                          <h1 className="text-2xl text-blue-700">{phim.tenPhim}</h1>
                          <p>{cumRap.diaChi}</p>
                          <div className="grid grid-cols-4 gap-3">
                          {phim.lstLichChieuTheoPhim?.slice(0, 8).map((lichChieu, index) => {
                            return <NavLink to="/" key={index} className=" text-blue-400">
                              {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                            </NavLink> 
                          })}
                          </div>
                        </div>
                      </div>
                                       </div>
                  </Fragment>
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
      <>
        <Tabs tabPosition={tabPosition}>{this.renderHeThongRap()}</Tabs>
      </>
    );
  }
}
