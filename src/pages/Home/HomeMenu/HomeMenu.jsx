import React, { useState } from "react";
import { Tabs, Radio, Space } from "antd";
const { TabPane } = Tabs;

export default function HomeMenu(props) {
    const [state, setState] = useState({
        tabPosition: "left",
      });
    
      const changeTabPosition = (e) => {
        setState({ tabPosition: e.target.value });
      };
    
      const { tabPosition } = state;
  return (
    <>
      <Tabs tabPosition={tabPosition}>
        <TabPane tab={<img src="https://picsum.photos/200" className="rounded-full" width="40"/>} key="1">
          Content of Tab 1
        </TabPane>
        <TabPane tab={<img src="https://picsum.photos/201" className="rounded-full" width="40"/>} key="2">
          Content of Tab 2
        </TabPane>
        <TabPane tab={<img src="https://picsum.photos/202" className="rounded-full" width="40"/>} key="3">
          Content of Tab 3
        </TabPane>
      </Tabs>
    </>
  );
}
