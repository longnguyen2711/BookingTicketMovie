import React from "react";
import { useFormik } from 'formik';
import {NavLink} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { dangNhapAction } from "../../redux/actions/QuanLyNguoiDungActions";
import './Login.css'

 

export default function Login(props) {

  const {userLogin} = useSelector(state => state.QuanLyNguoiDungReducer)

  console.log(userLogin)

  const  dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
    },
    onSubmit: values => {
      const action = dangNhapAction(values);
      dispatch(action)
      console.log({values})
    },
  })
  //formik đã xử lý luôn e.preventDefault();

  return (
    <form onSubmit={formik.handleSubmit} className="lg:w-1/2 xl:max-w-screen-sm bg-black pb-10" id="Login">
      <div className="py-12 flex justify-around lg:px-12">
        <div className="cursor-pointer flex items-center">
          <NavLink to="/" title="Về trang chủ"><img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="cyberlearn.vn"/></NavLink>
        </div>
        {/* <div className="back-to-homepage font-bold">
          <NavLink to="/home" title="Bấm để quay về trang chủ" className="back-to-homepage-button flex justify-center items-center"><i class="fa fa-home"></i></NavLink>
        </div> */}
      </div>
      <div className="px-12 sm:px-24 md:px-48 lg:px-12 xl:px-24 xl:max-w-2xl">
        <h2 className="text-center text-4xl font-display lg:text-left xl:text-4xl xl:text-bold">Đăng nhập</h2>
        <div className="mt-12">
          <div className="form-login">
            <div>
              <label for="taiKhoan" className="mb-0 ml-1 text-lg font-bold tracking-wide">Tài khoản</label>
              <input
                className="w-full rounded-md text-lg pl-4 py-2 mt-2 focus:outline-none"
                type = 'text'
                placeholder="Nhập vào email"
                name="taiKhoan"
                id="taiKhoan"
                onChange={formik.handleChange}
              />
            </div>
            <div className="forgot-password mt-8">
              <div className="flex justify-between items-center">
                <label for="matKhau" className="mb-0 ml-1 text-lg font-bold tracking-wide">Mật khẩu</label>
                <div>
                  <a className="forgot-password-title text-md font-display font-semibold text-indigo-500 cursor-pointer" title="Bấm để tìm lại mật khẩu">Quên mật khẩu?</a>
                </div>
              </div>
              <input
                className="w-full rounded-md text-lg pl-4 py-2 mt-2 focus:outline-none"
                type="password"
                placeholder="Nhập vào mật khẩu"
                name="matKhau"
                id="matKhau"
                onChange={formik.handleChange}
              />
            </div>
            <div className="mt-10 flex justify-center">
              <button
                title="Bấm để đăng nhập"
                type="submit"
                className="login-button text-xl text-white bg-indigo-600 p-3 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline shadow-lg">
                Đăng nhập
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center flex-wrap register mt-10 text-lg text-white font-display text-gray-700 text-center">
            <p className="mb-0 text-right text-white">Bạn chưa có tài khoản ?</p> 
            <NavLink to="/register" className="register-button text-left ml-3 cursor-pointer text-indigo-500 font-semibold" title="Bấm để đăng ký tài khoản">Đăng ký</NavLink>
          </div>
        </div>
      </div>
    </form>
  );
}
