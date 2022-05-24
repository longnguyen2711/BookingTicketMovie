
import { layThongTinNguoiDungAction } from "../../../redux/actions/QuanLyNguoiDungActions";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import React, { useEffect } from "react";
import "./Profile.css";

export default function Profile() {
  const { thongTinNguoiDung } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const dispatch = useDispatch()

    useEffect(() => {
    const action = layThongTinNguoiDungAction();
    dispatch(action);
  }, []);

  return (
    <div id="Profile">
      <h3 className="text-4xl mb-10">Thông tin tài khoản</h3>
      <div title="Bấm để đến trang cập nhật" className="mt-8"><NavLink to="/admin/profile/editprofile" className="py-3 px-3 rounded font-bold border-2 duration-500 border-blue-600 bg-white hover:bg-blue-600 text-blue-600 hover:text-white">Cập nhật hồ sơ</NavLink></div>
      <div className="flex justify-start px-5">
        <table>
          <tbody >
            <tr className="text-md">
              <td><span>Loại người dùng</span><span>:</span></td>
              <td>
                {thongTinNguoiDung.maLoaiNguoiDung === "QuanTri" ? "Quản trị" : "Khách hàng"}
              </td>
            </tr>
            <tr className="text-md">
              <td><span>Tài khoản</span><span>:</span></td>
              <td>{thongTinNguoiDung.taiKhoan}</td>
            </tr>
            <tr className="text-md">
              <td><span>Mật khẩu</span><span>:</span></td>
              <td>{thongTinNguoiDung.matKhau}</td>
            </tr>
            <tr className="text-md">
              <td><span>Họ tên</span><span>:</span></td>
              <td>{thongTinNguoiDung.hoTen}</td>
            </tr>
            <tr className="text-md">
              <td><span>Email</span><span>:</span></td>
              <td>{thongTinNguoiDung.email}</td>
            </tr>
            <tr className="text-md">
              <td><span>Số điện thoại</span><span>:</span></td>
              <td>{thongTinNguoiDung.soDT}</td>
            </tr>
            <tr className="text-md">
              <td><span>Mã nhóm</span><span>:</span></td>
              <td>{thongTinNguoiDung.maNhom}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
