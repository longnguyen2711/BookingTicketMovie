import React from "react";
import "./Film_Flip.css";

export default function Film_Flip(props) {
  const { item } = props;

  return (
    <div className="card col-span-6 p-2">
      <div className="card-inner flex-col relative">
        <div className="card-img">
          <img
            src={item.hinhAnh}
            alt="Avatar"
            title={item.tenPhim}
            style={{ width: 200, height: 300}}
          />
        </div>
        <div className="card-booking" title="Bấm để đặt vé">
          ĐẶT VÉ
        </div>
      </div>{" "}
    </div>
  );
}
