import React, { Fragment, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";
import { layThongTinNguoiDungAction } from "../../../redux/actions/QuanLyNguoiDungActions";

export default function Profile() {
  const { thongTinNguoiDung } = useSelector((state) => state.QuanLyNguoiDungReducer);

  console.log({thongTinNguoiDung})

  const dispatch = useDispatch()

    useEffect(() => {
    const action = layThongTinNguoiDungAction();
    dispatch(action);
  }, []);

  return (
    <div id="Profile">
      <h3 className="text-4xl">Thông tin tài khoản</h3>
      <div className="flex justify-center px-5">
        <table className="w-3/4">
          <tbody >
            <tr className="text-md w-1/3">
              <td><span>Tài khoản</span></td>
              <td>{thongTinNguoiDung.taiKhoan}</td>
              <td></td>
            </tr>
            <tr className="text-md w-1/3">
              <td><span>Mật khẩu</span></td>
              <td>{thongTinNguoiDung.matKhau}</td>
              <td><input type="text" /> </td>
            </tr>
            <tr className="text-md w-1/3">
              <td><span>Họ tên</span></td>
              <td>{thongTinNguoiDung.hoTen}</td>
              <td><input type="text"/> </td>
            </tr>
            <tr className="text-md w-1/3">
              <td><span>Email</span></td>
              <td>{thongTinNguoiDung.email}</td>
              <td><input type="text"/> </td>
            </tr>
            <tr className="text-md w-1/3">
              <td><span>Số điện thoại</span></td>
              <td>{thongTinNguoiDung.soDT}</td>
              <td><input type="text"/> </td>
            </tr>
            <tr className="text-md w-1/3">
              <td><span>Mã nhóm</span></td>
              <td>{thongTinNguoiDung.maNhom}</td>
              <td><input type="text"/> </td>
            </tr>
            <tr className="text-md w-1/3">
              <td><span>Loại người dùng</span></td>
              <td>
                {thongTinNguoiDung.maLoaiNguoiDung === "QuanTri" ? "Quản trị" : "Khách hàng"}
              </td>
              <td><input type="text"/> </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
