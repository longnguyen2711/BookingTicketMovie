import { dangNhapAction } from "../../redux/actions/QuanLyNguoiDungActions";
import { USER_LOGIN } from "../../util/settings/config";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { useFormik } from "formik";
import { Input } from "antd";
import React from "react";
import "./Login.css";

export default function Login(props) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      const action = dangNhapAction(values);
      dispatch(action);
    },
  });
  //formik đã xử lý luôn e.preventDefault();

  // Kiểm tra xem nếu đã đăng nhập rồi mà nhập đường dẫn login thì sẽ quay về trang chủ
  if (localStorage.getItem(USER_LOGIN)) {
    alert("Đăng nhập thành công");
    return <Redirect to="/" />;
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full lg:w-1/2 z-50 mt-3"
      id="Login"
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
          Đăng nhập tài khoản
        </h2>
        <div className="mt-12">
          <div className="form-login">
            <div>
              <div className="mb-2">
                {" "}
                <label
                  for="taiKhoan"
                  className="mb-1 ml-1 pb-2 text-lg font-bold tracking-wide"
                >
                  Tài khoản
                </label>
              </div>
              <Input
                className="w-full rounded-md text-lg pl-4 py-2 mt-4 focus:outline-none"
                type="text"
                placeholder="Nhập vào tài khoản (vd: nhlong2711)"
                name="taiKhoan"
                id="taiKhoan"
                onChange={formik.handleChange}
              />
            </div>
            <div className="forgot-password mt-6">
              <div className="flex justify-between items-center">
                <label
                  for="matKhau"
                  className="mb-0 ml-1 text-lg font-bold tracking-wide"
                >
                  Mật khẩu
                </label>
                <div>
                  <a
                    href="#"
                    className="forgot-password-title text-md font-display font-semibold text-indigo-500 cursor-pointer"
                    title="Bấm để tìm lại mật khẩu"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
              </div>
              <Input.Password
                className="input-password w-full rounded-md text-lg pl-4 py-4 mt-2 focus:outline-none"
                type="password"
                placeholder="Nhập vào mật khẩu (vd: nhlong2711)"
                name="matKhau"
                id="matKhau"
                onChange={formik.handleChange}
              />
            </div>
            <div className="mt-10 flex justify-center">
              <button
                title="Bấm để đăng nhập"
                type="submit"
                className="login-button text-xl text-white bg-indigo-600 p-3 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline shadow-lg"
              >
                Đăng nhập
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center flex-wrap register mt-10 text-lg text-white font-display text-center">
            <p className="mb-0 text-right text-white">
              Bạn chưa có tài khoản ?
            </p>
            <NavLink
              to="/register"
              className="register-button text-left ml-3 cursor-pointer text-indigo-500 font-semibold"
              title="Bấm để đăng ký tài khoản"
            >
              Đăng ký
            </NavLink>
          </div>
        </div>
      </div>
    </form>
  );
}
