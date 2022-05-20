import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import "./Header.css";

export default function Header(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  // Trạng thái đăng nhập
  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return (
        <Fragment>
          <NavLink
            to="/login"
            title="Bấm để đăng nhập"
            className="sign-in focus:outline-none rounded self-center font-bold px-7 py-2 border-2 border-black mr-3"
          >
            Đăng nhập
          </NavLink>
          <NavLink
            to="/register"
            title="Bấm để đăng ký"
            className="sign-up focus:outline-none rounded self-center font-bold px-7 py-2 border-2 border-black"
          >
            Đăng ký
          </NavLink>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <NavLink
          to="/profile"
          title="Đến trang cá nhân"
          className="to-profile focus:outline-none rounded self-center font-bold px-7 py-2 border-2 border-black mr-3"
        >
          {userLogin.taiKhoan}
        </NavLink>
        <button
          title="Bấm để đăng xuất"
          className="sign-out focus:outline-none rounded self-center font-bold px-7 py-2 border-2 border-black"
        >
          Đăng xuất
        </button>
      </Fragment>
    );
  };

  // Nút ẩn trang thái đăng nhập
  const renderDropdownMenu = () => {
    if (_.isEmpty(userLogin)) {
      return (
        <div class="dropdown-button dropdown inline-block z-50">
          <button className="header__logo md:hidden">
            <img
              src="https://i.imgur.com/lC22izJ.png"
              alt="cyberlearn.vn"
              width={45}
            />
          </button>
          <div class="dropdown-menu hidden text-gray-700 right-0">
            <div className="flex flex-col justify-start items-end">
              <NavLink
                to="/login"
                title="Bấm để đăng nhập"
                className="md-sign-in bg-black w-36 text-center z-50 mb-3 focus:outline-none rounded self-center font-bold px-7 py-2 border-2"
              >
                Đăng nhập
              </NavLink>
              <NavLink
                to="/register"
                title="Bấm để đăng ký"
                className="md-sign-up bg-black w-36 text-center z-50 focus:outline-none rounded self-center font-bold px-7 py-2 border-2"
              >
                Đăng ký
              </NavLink>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div class="dropdown-button dropdown inline-block z-50">
          <button className="header__logo md:hidden">
            <img
              src="https://i.imgur.com/lC22izJ.png"
              alt="cyberlearn.vn"
              width={45}
            />
          </button>
          <div class="dropdown-menu hidden text-gray-700 right-0">
            <div className="flex flex-col justify-start items-end">
              <NavLink
                to="/profile"
                title="Đến trang cá nhân"
                className="md-sign-in bg-black w-36 text-center z-50 mb-3 focus:outline-none rounded self-center font-bold px-7 py-2 border-2"
              >
                {userLogin.taiKhoan}
              </NavLink>
              <button
                title="Bấm để đăng xuất"
                className="md-sign-up bg-black w-36 text-center z-50 focus:outline-none rounded self-center font-bold px-7 py-2 border-2"
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


  // Xét kích thước màn hình
  const [screen, setScreen] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    window.onload = () => {
      setScreen({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.onresize = () => {
      setScreen({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    return () => {
      window.removeEventListener("onload");
      window.removeEventListener("onresize");
    };
  }, []);

  // Chọn kích cỡ navbar theo kích thước màn hình
  const layoutNabar = () => {
    return (
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
            <NavLink to="/contact" className="navLink" title="Liên hệ">
              <span className="icon">
                <i className="fa fa-phone"></i>
              </span>
              <span className="text text-sm">Liên hệ</span>
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
            <NavLink to="/products" className="navLink" title="Sản phẩm">
              <span className="icon">
                <i class="fab fa-react"></i>
              </span>
              <span className="text text-sm">Sản phẩm</span>
            </NavLink>
          </li>
          <div className="navigation-indicator" />
        </ul>
      </div>
    );
  };

  const renderNavbar = () => {
    if (screen.width < 768) {
      return <div className="navbar-mobile">{layoutNabar()}</div>;
    } else {
      return <div className="navbar-laptop">{layoutNabar()}</div>;
    }
  };

  return (
    <header
      id="header"
      className="overflow-hidden p-4 md:p-5 dark:bg-coolGray-800 dark:text-coolGray-100 bg-opacity-40 bg-black text-white fixed top-0 left-0 w-full z-10"
    >
      <div className="container flex justify-between h-16 mx-auto max-w-screen-xl">
        <NavLink
          id="header_home"
          to="/"
          aria-label="Back to homepage"
          className="items-center p-2 hidden lg:flex"
        >
          <img
            src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
            alt="cyberlearn.vn"
            width={150}
          />
        </NavLink>

        {renderNavbar()}

        <div className="sign-in-up items-center flex-shrink-0 hidden md:flex">
          {renderLogin()}
        </div>

        {renderDropdownMenu()}
      </div>
      <a class="back-to-top" href="#" title="Về đầu trang">
        <i class="fa fa-angle-up"></i>
      </a>
    </header>
  );
}
