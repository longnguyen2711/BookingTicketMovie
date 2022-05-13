import React, { useState } from "react";
import { Tabs, Radio, Space } from "antd";
import { connect } from "react-redux";
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
            <img src={heThongRap.logo} className="rounded-full" width="50" />
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
                >{cumRap.danhSachPhim.map((phim,index) => {
                  return <div></div>
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
