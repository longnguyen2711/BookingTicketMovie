import React from "react";
import "./Detail.css";
import { Tabs, Radio, Space } from "antd";

const { TabPane } = Tabs;

export default function Detail(props) {
  return (
    <div
      className="Detail"
      style={{ backgroundImage: "url(https://picsum.photos/1000)" }}
    >
      <div className="Detail__overlay flex items-center justify-center flex-wrap">
        <div className="grid grid-cols-12 w-full">
          <div className="col-span-4 col-start-4">
            <div className="grid grid-cols-2">
              <img
                src="https://picsum.photos/1000"
                alt="https://picsum.photos/1000"
              />
              <div>
                <p>Tên phim</p>
                <p>Mô tả</p>
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="c100 p25">
              <span>25%</span>
              <div className="slice">
                <div className="bar" />
                <div className="fill" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <Tabs tabPosition={"left"}>
            <TabPane tab="Tab 1" key="1">
              Content of Tab 1
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              Content of Tab 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              Content of Tab 3
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
