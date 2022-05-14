import React from "react";
import { NavLink } from "react-router-dom";
import "./Film.css";
import {history} from '../../App'

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
        <NavLink to={`/detail/${item.maPhim}`} className="card-booking" title="Bấm để đặt vé">
          ĐẶT VÉ
        </NavLink>

        {/* Cách 2: Dùng history */}
        {/* <div className="card-booking" title="Bấm để đặt vé" onClick={() => {
          history.push(`/detail/${item.maPhim}`)
        }}>
          ĐẶT VÉ
        </div> */}
        
      </div>{" "}
    </div>
  );
}
