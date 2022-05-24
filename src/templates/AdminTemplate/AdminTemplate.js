import {
  AlignLeftOutlined,
  PlusCircleOutlined,
  CodeSandboxOutlined,
  UserOutlined,
  HistoryOutlined,
  ProfileOutlined,
  FormOutlined,
  UserAddOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import { ACCESSTOKEN, USER_LOGIN } from "../../util/settings/config";
import { Fragment, useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { history } from "../../App";
import { Layout, Menu } from "antd";
import "./AdminTemplate.scss";
import _ from "lodash";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export const AdminTemplate = (props) => {
  const { Component, ...restProps } = props; // path, exact, Component

  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  // Chuyển hướng về đầu trang khi trở lại trang trước đó
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  // Kiểm tra trong localStorage nếu chưa đăng nhập thì chuyển về trang login
  if (!localStorage.getItem(USER_LOGIN)) {
    alert("Bạn chưa đăng nhập !");
    return <Redirect to="/login" />;
  }

  // // Kiểm tra trong localStorage nếu không phải admin thì chuyển về trang chủ
  //   if (userLogin.maLoaiNguoiDung !== "QuanTri") {
  //     alert("Bạn không có quyền truy cập vào trang này !");
  //     return <Redirect to="/" />;
  //   }

  // Trạng thái đăng nhập
  const renderLogin = () => {
    return (
      <div className="absolute top-5 right-10 z-10 flex">
        <button
          className="sign-out focus:outline-none rounded self-center font-bold px-7 py-2 border-2 border-black mr-5"
          title="Bấm để đăng xuất"
          onClick={() => {
            if (window.confirm("Bạn có chắc muốn đăng xuất ?")) {
              // Xóa trong localStorage
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(ACCESSTOKEN);
              // Chuyển hướng về home
              history.push("/home");
              // Reload lại trang web
              window.location.reload();
            }
          }}
        >
          Đăng xuất
        </button>
        <NavLink
          to="/admin/profile"
          className="to-profile focus:outline-none rounded self-center font-bold p-2 flex justify-center items-center h-full"
          title={`Tài khoản: ${userLogin.taiKhoan}`}
        >
          <div className="font-bold">{userLogin.hoTen}</div>
          <div className="icon-user w-10 h-10 rounded-full bg-black font-bold flex justify-center items-center ml-3 text-xl">
            <p className="mb-0 pb-1">{userLogin.taiKhoan.substr(0, 1)}</p>
          </div>
        </NavLink>
      </div>
    );
  };

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        //props.location, props.history, props.match
        return (
          <div id="AdminTemplate" className="realative">
            {renderLogin()}

            <Fragment>
              <Layout style={{ minHeight: "100vh" }}>
                <Sider>
                  <div className="mt-2 mb-7">
                    <NavLink to="/" className="logo relative top-3 left-5">
                      <img
                        src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
                        alt="..."
                        style={{ width: 150 }}
                        title="Về trang chủ"
                      />
                    </NavLink>
                  </div>

                  <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                    {/* Nếu key giống nhau sẽ sổ ra nội dung bên nhau cùng lúc */}
                    {/* Submenu là dropdown button */}

                    <SubMenu key="1" icon={<UserOutlined />} title="Cá nhân">
                      <Menu.Item key="2" icon={<ProfileOutlined />}>
                        <NavLink to="/admin/profile">Thông tin cá nhân</NavLink>
                      </Menu.Item>
                      <Menu.Item key="3" icon={<FormOutlined />}>
                        <NavLink to="/admin/profile/editprofile">
                          Cập nhật hồ sơ
                        </NavLink>
                      </Menu.Item>
                      <Menu.Item key="4" icon={<HistoryOutlined />}>
                        <NavLink to="/admin/profile/historybooking">
                          Lịch sử đặt vé
                        </NavLink>
                      </Menu.Item>
                    </SubMenu>

                    <SubMenu
                      key="1"
                      icon={<ApartmentOutlined />}
                      title="Quản lý"
                    >
                      <Menu.Item key="5" icon={<AlignLeftOutlined />}>
                        <NavLink to="/admin/user/listuser">
                          Danh sách
                        </NavLink>
                      </Menu.Item>
                      <Menu.Item key="6" icon={<UserAddOutlined />}>
                        <NavLink to="/admin/user/adduser">
                          Thêm người dùng
                        </NavLink>
                      </Menu.Item>
                      <Menu.Item key="7" icon={<FormOutlined />}>
                        <NavLink to="/admin/user/edituser">
                          Sửa người dùng
                        </NavLink>
                      </Menu.Item>
                    </SubMenu>

                    <SubMenu
                      key="1"
                      icon={<CodeSandboxOutlined />}
                      title="Phim"
                    >
                      <Menu.Item key="8" icon={<AlignLeftOutlined />}>
                        <NavLink to="/admin/films">Danh sách phim</NavLink>
                      </Menu.Item>
                      <Menu.Item key="9" icon={<PlusCircleOutlined />}>
                        <NavLink to="/admin/addnewfilm">Thêm phim</NavLink>
                      </Menu.Item>
                    </SubMenu>
                  </Menu>
                </Sider>

                <Layout className="site-layout">
                  {/* <Header
                  className="site-layout-background"
                  style={{ padding: 0 }}
                >
                  <div className="text-right pr-10 pt-1"></div>
                </Header> */}
                  <Content style={{ margin: "0 16px" }}>
                    {/* Breadcrumb sẽ cho ra những / nhánh */}
                    {/* <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill2</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill3</Breadcrumb.Item>
                  </Breadcrumb> */}
                    <div
                      className="site-layout-background"
                      style={{
                        paddingTop: 75,
                        paddingLeft: 25,
                        paddingRight: 25,
                      }}
                    >
                      <Component {...propsRoute} />
                    </div>
                  </Content>
                  <Footer
                    style={{ textAlign: "center" }}
                    className="site-layout-background"
                  >
                    {" "}
                    <div className="text-right mr-10">
                      {" "}
                      ©2022 All rights reserved
                    </div>
                  </Footer>
                </Layout>
              </Layout>
            </Fragment>
            <a className="back-to-top" href="#" title="Về đầu trang">
              <i className="fa fa-angle-up"></i>
            </a>
          </div>
        );
      }}
    />
  );
};
