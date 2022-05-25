import { dangKyTaiKhoanAction } from "../../redux/actions/QuanLyNguoiDungActions";
import { TOKEN_CYBERSOFT } from "../../util/settings/config";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { Input } from "antd";
import React from "react";
import "./Register.css";

export default function Register(props) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "",
      hoTen: "",
      accessToken: TOKEN_CYBERSOFT,
      maLoaiNguoiDung: "KhachHang",
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(dangKyTaiKhoanAction(values));
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full lg:w-1/2 z-50 mt-3"
      id="Register"
    >
      <div className="py-12 flex justify-around lg:px-12">
        <div className="cursor-pointer flex items-center">
          <NavLink to="/" title="Về trang chủ">
            <img
              src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
              alt="cyberlearn.vn"
            />
          </NavLink>
        </div>
        {/* <div className="back-to-homepage font-bold">
        <NavLink to="/home" title="Bấm để quay về trang chủ" className="back-to-homepage-button flex justify-center items-center"><i class="fa fa-home"></i></NavLink>
      </div> */}
      </div>
      <div className="px-12 sm:px-24 md:px-48 lg:px-12 xl:px-24">
        <h2 className="text-center text-4xl font-display lg:text-left xl:text-4xl xl:text-bold font-bold">
          Đăng ký tài khoản
        </h2>
        <div className="mt-12 pb-12">
          <div className="form-register">
            <div>
              <div className="mb-2">
                {" "}
                <label
                  for="maLoaiNguoiDung"
                  className="mb-0 ml-1 text-lg font-bold tracking-wide"
                >
                  Loại tài khoản
                </label>
              </div>
              <Input
                className="w-full rounded-md text-lg pl-4 py-2 mt-2 focus:outline-none"
                type="text"
                placeholder="BC23"
                name="maLoaiNguoiDung"
                id="maLoaiNguoiDung"
                value="Khách hàng"
              />
            </div>
            <div className="mt-5">
              <div className="mb-2">
                {" "}
                <label
                  for="email"
                  className="mb-0 ml-1 text-lg font-bold tracking-wide"
                >
                  Email
                </label>
              </div>
              <Input
                className="w-full rounded-md text-lg pl-4 py-2 mt-4 focus:outline-none"
                type="email"
                placeholder="nguyenhoanglong@gmail.com"
                name="email"
                id="email"
                onChange={formik.handleChange}
              />
            </div>
            <div className="mt-5">
              <div className="mb-2">
                {" "}
                <label
                  for="taiKhoan"
                  className="mb-0 ml-1 text-lg font-bold tracking-wide"
                >
                  Tài khoản
                </label>
              </div>
              <Input
                className="w-full rounded-md text-lg pl-4 py-2 mt-4 focus:outline-none"
                type="text"
                placeholder="nhlong2711"
                name="taiKhoan"
                id="taiKhoan"
                onChange={formik.handleChange}
              />
            </div>
            <div className="mt-5">
              <div className="mb-2">
                {" "}
                <label
                  for="matKhau"
                  className="mb-0 ml-1 text-lg font-bold tracking-wide"
                >
                  Mật khẩu
                </label>
              </div>
              <Input.Password
                className="w-full rounded-md text-lg pl-4 py-2 focus:outline-none"
                type="password"
                placeholder="Mật khẩu"
                name="matKhau"
                id="matKhau"
                onChange={formik.handleChange}
              />
            </div>
            <div className="mt-5">
              <div className="mb-2">
                {" "}
                <label
                  for="hoTen"
                  className="mb-0 ml-1 text-lg font-bold tracking-wide"
                >
                  Họ tên
                </label>
              </div>
              <Input
                className="w-full rounded-md text-lg pl-4 py-2 mt-4 focus:outline-none"
                type="text"
                placeholder="Nguyễn Hoàng Long"
                name="hoTen"
                id="hoTen"
                onChange={formik.handleChange}
              />
            </div>
            <div className="mt-5">
              <div className="mb-2">
                {" "}
                <label
                  for="soDt"
                  className="mb-0 ml-1 text-lg font-bold tracking-wide"
                >
                  Số điện thoại
                </label>
              </div>
              <Input
                className="w-full rounded-md text-lg pl-4 py-2 mt-4 focus:outline-none"
                type="text"
                placeholder="0123456789"
                name="soDt"
                id="soDt"
                onChange={formik.handleChange}
              />
            </div>
            {/* <div className="mt-5">
              <div className="mb-2">
                {" "}
                <label
                  for="maNhom"
                  className="mb-0 ml-1 text-lg font-bold tracking-wide"
                >
                  Mã nhóm
                </label>
              </div>
              <Input
                className="w-full rounded-md text-lg pl-4 py-2 mt-4 focus:outline-none"
                type="text"
                placeholder="BC23"
                name="maNhom"
                id="maNhom"
                onChange={formik.handleChange}
              />
            </div> */}

            <div className="mt-10 flex justify-center">
              <button
                title="Bấm để đăng ký tài khoản"
                type="submit"
                className="login-button text-xl text-white bg-indigo-600 p-3 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline shadow-lg"
              >
                Đăng ký
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center flex-wrap register mt-10 text-lg text-white font-display text-center">
            <p className="mb-0 text-right text-white">Bạn đã có tài khoản ?</p>
            <NavLink
              to="/login"
              className="register-button text-left ml-3 cursor-pointer text-indigo-500 font-semibold"
              title="Bấm để đăng nhập tài khoản"
            >
              Đăng nhập
            </NavLink>
          </div>
        </div>
      </div>
    </form>
  );
}
