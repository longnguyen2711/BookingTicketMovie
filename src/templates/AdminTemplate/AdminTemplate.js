import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { history } from "../../App";
import { USER_LOGIN } from "../../util/settings/config";

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

  // Kiểm tra trong localStorage nếu không phải admin thì chuyển về trang chủ
  //   if (userLogin.maLoaiNguoiDung !== "QuanTri") {
  //     alert("Bạn không có quyền truy cập vào trang này !");
  //     return <Redirect to="/" />;
  //   }

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        //props.location, props.history, props.match
        return (
          <Fragment>
            <Layout style={{ minHeight: "100vh" }}>
              <Sider>
                <div className="logo p-5">
                  <img
                    src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
                    alt="..."
                  />
                </div>

                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                  {/* Nếu key giống nhau sẽ sổ ra nội dung bên nhau cùng lúc */}

                  <Menu.Item key="1" icon={<UserOutlined />}>
                    <NavLink to="/admin/users">Người dùng</NavLink>
                  </Menu.Item>

                  {/* Submenu là dropdown button */}
                  <SubMenu key="2" icon={<FileOutlined />} title="Phim">
                    <Menu.Item key="10" icon={<FileOutlined />}>
                      <NavLink to="/admin/films">Phim</NavLink>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<FileOutlined />}>
                      <NavLink to="/admin/addnewfilm">Thêm phim</NavLink>
                    </Menu.Item>
                  </SubMenu>

                  <Menu.Item key="4" icon={<DesktopOutlined />}>
                    <NavLink to="/admin/showtimes">Showtime</NavLink>
                  </Menu.Item>
                </Menu>
              </Sider>

              <Layout className="site-layout">
                <Header
                  className="site-layout-background"
                  style={{ padding: 0 }}
                >
                  <div className="text-right pr-10 pt-1"></div>
                </Header>
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
                    style={{ padding: 24, minHeight: "85vh" }}
                  >
                    <Component {...propsRoute} />
                  </div>
                </Content>
                <Footer
                  style={{ textAlign: "center" }}
                  className="site-layout-background"
                >
                  ©2022 All rights reserved
                </Footer>
              </Layout>
            </Layout>
          </Fragment>
        );
      }}
    />
  );
};
