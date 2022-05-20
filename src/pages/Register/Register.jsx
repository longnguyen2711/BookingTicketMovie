import React from 'react'
import { useFormik } from 'formik';
import {NavLink} from 'react-router-dom'
import './Register.css'
import { useDispatch, useSelector } from "react-redux";


export default function Register(props) {
  const formik = useFormik({
    initialValues: {
      emailDangKy: '',
      tenDangNhapRegister: '',
      taiKhoanRegister: '',
      tenDangNhapRegister: '',
      matKhauRegister: '',
      xacNhanMatKhauRegister: ''
    },
    // onSubmit: values => {
    //   const action = dangNhapAction(values);
    //   dispatch(action)
    //   setTimeout(() => {
    //     props.history.goBack();
    //   }, 1000);
    // },
  })
  return (
    <form onSubmit={formik.handleSubmit} className="lg:w-1/2 xl:max-w-screen-sm bg-black pb-10" id="Register">
    <div className="py-12 flex justify-around lg:px-12">
      <div className="cursor-pointer flex items-center">
        <NavLink to="/" title="Về trang chủ"><img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="cyberlearn.vn"/></NavLink>
      </div>
      {/* <div className="back-to-homepage font-bold">
        <NavLink to="/home" title="Bấm để quay về trang chủ" className="back-to-homepage-button flex justify-center items-center"><i class="fa fa-home"></i></NavLink>
      </div> */}
    </div>
    <div className="px-12 sm:px-24 md:px-48 lg:px-12 xl:px-24 xl:max-w-2xl">
      <h2 className="text-center text-4xl font-display lg:text-left xl:text-4xl xl:text-bold">Đăng ký tài khoản</h2>
      <div className="mt-12">
        <div className="form-register">
        <div>
            <label for="emailDangKy" className="mb-0 ml-1 text-lg font-bold tracking-wide">Email</label>
            <input
              className="w-full rounded-md text-lg pl-4 py-2 mt-2 focus:outline-none"
              type = 'email'
              placeholder="cybersoft@gmail.com"
              name="emailDangKy"
              id="emailDangKy"
              onChange={formik.handleChange}
            />
          </div>
          <div className="mt-6">
            <label for="tenDangNhapRegister" className="mb-0 ml-1 text-lg font-bold tracking-wide">Tên đăng nhập</label>
            <input
              className="w-full rounded-md text-lg pl-4 py-2 mt-2 focus:outline-none"
              type = 'text'
              placeholder="Cybersoft"
              name="tenDangNhapRegister"
              id="tenDangNhapRegister"
              onChange={formik.handleChange}
            />
          </div>
          <div className="mt-6">
            <label for="taiKhoanRegister" className="mb-0 ml-1 text-lg font-bold tracking-wide">Tài khoản</label>
            <input
              className="w-full rounded-md text-lg pl-4 py-2 mt-2 focus:outline-none"
              type = 'text'
              placeholder="cybersoft"
              name="taiKhoanRegister"
              id="taiKhoanRegister"
              onChange={formik.handleChange}
            />
          </div>
          <div className="mt-6">
            <label for="matKhauRegister" className="mb-0 ml-1 text-lg font-bold tracking-wide">Mật khẩu</label>
            <input
              className="w-full rounded-md text-lg pl-4 py-2 mt-2 focus:outline-none"
              type = 'password'
              placeholder="Mật khẩu"
              name="matKhauRegister"
              id="matKhauRegister"
              onChange={formik.handleChange}
            />
          </div>
          <div className="mt-6">
            <label for="xacNhanMatKhauRegister" className="mb-0 ml-1 text-lg font-bold tracking-wide">Nhập lại mật khẩu</label>
            <input
              className="w-full rounded-md text-lg pl-4 py-2 mt-2 focus:outline-none"
              type = 'password'
              placeholder="Nhập lại mật khẩu"
              name="xacNhanMatKhauRegister"
              id="xacNhanMatKhauRegister"
              onChange={formik.handleChange}
            />
          </div>

          <div className="mt-10 flex justify-center">
            <button
              title="Bấm để đăng ký tài khoản"
              type="submit"
              className="login-button text-xl text-white bg-indigo-600 p-3 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline shadow-lg">
              Đăng ký
            </button>
          </div>
        </div>
        
        <div className="flex justify-center items-center flex-wrap register mt-10 text-lg text-white font-display text-center">
          <p className="mb-0 text-right text-white">Bạn đã có tài khoản ?</p> 
          <NavLink to="/login" className="register-button text-left ml-3 cursor-pointer text-indigo-500 font-semibold" title="Bấm để đăng nhập tài khoản">Đăng nhập</NavLink>
        </div>
      </div>
    </div>
  </form>
  )
}
