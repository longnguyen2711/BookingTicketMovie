import React from "react";
import { Carousel } from "antd";

const contentStyle = {
  height: "400px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
export default function HomeCarousel() {
  return (
    <Carousel effect="fade" className="relative, z-1">
      <div>
        <div style={contentStyle}>
          <img src="https:/picsum.photos/1000" alt="123" className="w-full" />
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <img src="https:/picsum.photos/1002" alt="123" className="w-full" />
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <img src="https:/picsum.photos/1003" alt="123" className="w-full" />
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <img src="https:/picsum.photos/1004" alt="123" className="w-full" />
        </div>
      </div>
    </Carousel>
  );
}
