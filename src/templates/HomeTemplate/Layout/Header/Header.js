import React, { useEffect, useState, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Select } from "antd";
import "./Header.scss";
import _ from "lodash";
import {
  ACCESSTOKEN,
  USER_LOGIN,
} from "../../../../util/settings/config";

export default function Header(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { Option } = Select;

  const handleChange = (value) => {
    // console.log(`selected ${value}`);
  };

  // Trạng thái đăng nhập
  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return (
        <Fragment>
          <NavLink
            to="/register"
            title="Bấm để đăng ký"
            className="sign-up focus:outline-none rounded self-center font-bold px-7 py-2 border-2 border-black mr-3"
          >
            Đăng ký
          </NavLink>
          <NavLink
            to="/login"
            title="Bấm để đăng nhập"
            className="sign-in focus:outline-none rounded self-center font-bold px-7 py-2 border-2 border-black"
          >
            Đăng nhập
          </NavLink>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <button
          className="sign-out focus:outline-none rounded self-center font-bold px-7 py-2 border-2 border-black mr-5"
          title="Bấm để đăng xuất"
          onClick={() => {
            if (window.confirm("Bạn có chắc muốn đăng xuất ?")) {
              // Xóa trong localStorage
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(ACCESSTOKEN);
              // Chuyển hướng về home
              props.history.push("/home");
              // Reload lại trang web
              window.location.reload();
            }
          }}
        >
          Đăng xuất
        </button>
        <button
          onClick={() => {
            props.history.push("/admin/profile");
          }}
          className="to-profile focus:outline-none rounded self-center font-bold p-2 flex justify-center items-center h-full"
          title="Đến trang cá nhân"
        >
          <div className="font-bold">{userLogin.hoTen}</div>
          <div className="icon-user w-10 h-10 rounded-full bg-black font-bold flex justify-center items-center ml-3 text-xl">
            <p className="mb-0 pb-1">{userLogin.taiKhoan.substr(0, 1)}</p>
          </div>
        </button>
      </Fragment>
    );
  };

  // Nút ẩn trang thái đăng nhập
  const renderDropdownMenu = () => {
    if (_.isEmpty(userLogin)) {
      return (
          <div className="dropdown-button dropdown inline-block z-50">
            <button className="header__logo md:hidden">
              <img
                src="https://i.imgur.com/lC22izJ.png"
                alt="cyberlearn.vn"
                width={45}
              />
            </button>
                      {/* <Select
            defaultValue="Đăng nhập"
            style={{ width: 120 }}
            onChange={handleChange}
          >
            <Option value="Đăng nhập">Lucy</Option>
            <Option value="Đăng ký">Lucy</Option>
          </Select> */}
            <div className="dropdown-menu hidden text-gray-700 right-0">
              <div className="flex flex-col justify-start items-end">
                <NavLink
                  to="/register"
                  title="Bấm để đăng ký"
                  className="md-sign-up bg-black w-36 text-center z-50 focus:outline-none rounded self-center font-bold px-7 py-2 border-2  mb-3"
                >
                  Đăng ký
                </NavLink>
                <NavLink
                  to="/login"
                  title="Bấm để đăng nhập"
                  className="md-sign-in bg-black w-36 text-center z-50 focus:outline-none rounded self-center font-bold px-7 py-2 border-2"
                >
                  Đăng nhập
                </NavLink>
              </div>
            </div>
          </div>
      );
    } else {
      return (
        <div className="dropdown-button dropdown inline-block z-50">
          <button className="header__logo md:hidden">
            <img
              src="https://i.imgur.com/lC22izJ.png"
              alt="cyberlearn.vn"
              width={45}
            />
          </button>
          <div className="dropdown-menu hidden text-gray-700 right-0">
            <div className="flex flex-col justify-start items-end">
              <NavLink
                to="/admin/profile"
                title="Đến trang cá nhân"
                className="md-sign-in bg-black w-40 text-center z-50 mb-3 focus:outline-none rounded self-center font-bold px-5 py-2 border-2"
              >
                {userLogin.hoTen}
              </NavLink>

              <button
                className="md-sign-up bg-black w-40 text-center z-50 focus:outline-none rounded self-center font-bold px-5 py-2 border-2"
                title="Bấm để đăng xuất"
                onClick={() => {
                  if (window.confirm("Bạn có chắc muốn đăng xuất ?")) {
                    // Xóa trong localStorage
                    localStorage.removeItem(USER_LOGIN);
                    localStorage.removeItem(ACCESSTOKEN);
                    // Chuyển hướng về home
                    props.history.push("/home");
                    // Reload lại trang web
                    window.location.reload();
                  }
                }}
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  // Hiệu ứng trượt navbar
  const navigation_list = document.querySelectorAll(".navigation_list");
  function activeLink() {
    navigation_list.forEach((item) =>
      item.classList.remove("navigation-active")
    );
    this.classList.add("navigation-active");
  }
  navigation_list.forEach((item) => item.addEventListener("click", activeLink));

  return (
    <header
      id="header"
      style={{
        backgroundImage: `url("/assets/images/bg-home-page.jpeg")`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
      className="overflow-hidden p-4 md:p-5 dark:bg-coolGray-800 dark:text-coolGray-100 bg-opacity-50 text-white fixed top-0 left-0 w-full z-10"
    >
      <div className="container flex justify-between h-16 mx-auto max-w-screen-xl">
        <NavLink
          id="header_home"
          to="/"
          aria-label="Back to homepage"
          className="items-center p-2 hidden lg:flex"
          title="Về trang chủ"
        >
          <img
            src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
            alt="cyberlearn.vn"
            width={150}
          />
        </NavLink>

        <div className="navigation">
          <ul>
            <li className="navigation_list navigation-active">
              <NavLink to="/home" className="navLink" title="Trang chủ">
                <span className="icon">
                  <i className="fa fa-home" />
                </span>
                <span className="text text-sm cursor-pointer">Trang chủ</span>
              </NavLink>
            </li>
            <li className="navigation_list">
              <NavLink to="/products" className="navLink" title="Sản phẩm">
                <span className="icon">
                  <i className="fab fa-react"></i>
                </span>
                <span className="text text-sm">Sản phẩm</span>
              </NavLink>
            </li>
            <li className="navigation_list">
              <NavLink to="/news" className="navLink" title="Tin tức">
                <span className="icon">
                  <i className="fa fa-newspaper"></i>
                </span>
                <span className="text text-sm">Tin tức</span>
              </NavLink>
            </li>
            <li className="navigation_list">
              <NavLink to="/contact" className="navLink" title="Liên hệ">
                <span className="icon">
                  <i className="fa fa-phone"></i>
                </span>
                <span className="text text-sm">Liên hệ</span>
              </NavLink>
            </li>
            <div className="navigation-indicator" />
          </ul>
        </div>

        <div className="sign-in-up hidden md:flex">
          {renderLogin()}
        </div>

        {renderDropdownMenu()}
      </div>
      <a className="back-to-top" href="#" title="Về đầu trang">
        <i className="fa fa-angle-up"></i>
      </a>
    </header>
  );
}
