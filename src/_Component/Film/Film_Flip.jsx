import React from "react";
import "./Film_Flip.css";

export default function Film_Flip(props) {
  const { item } = props;

  return (
    <div className="flip-card mt-2">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img
            src={item.hinhAnh}
            alt="Avatar"
            style={{ width: 300, height: 300 }}
          />
        </div>
        <div
          className="flip-card-back relative"
          style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
        >
          <div style={{ position: "absolute", top: 0, left: 0 }}>
            <img
              src={item.hinhAnh}
              alt="Avatar"
              style={{ width: 300, height: 300 }}
            />
          </div>

          <div
            className="w-full h-full relative flex flex-row justify-center items-center"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div>
              <div className="rounded-full cursor-pointer"></div>
              <div className="text-2xl mt-2 font-bold">{item.tenPhim}</div>
            </div>
          </div>
        </div>
      </div>{" "}
      <div className="bg-orange-300 text-center py-2 cursor-pointer bg-indigo-300 my-2 text-success-50 font-bold ">
        ĐẶT VÉ
      </div>
    </div>
  );
}
