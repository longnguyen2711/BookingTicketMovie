import { layDanhSachNguoiDungAction, xoaNguoiDungAction } from "../../../../redux/actions/QuanLyNguoiDungActions";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import React, { Fragment, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router";
import { Table, Input } from "antd";

export default function ListUser(props) {
  const { userLogin, danhSachTaiKhoan } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const action = layDanhSachNguoiDungAction();
    dispatch(action);
  }, []);

  const { Search } = Input;

  const columns = [
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      sorter: (a, b) => {
        let tenA = a.hoTen.toLowerCase().trim();
        let tenB = b.hoTen.toLowerCase().trim();
        if (tenA > tenB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      width: "20%",
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      sorter: (a, b) => {
        let taiKhoanA = a.taiKhoan.toLowerCase().trim();
        let taiKhoanB = b.taiKhoan.toLowerCase().trim();
        if (taiKhoanA > taiKhoanB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      width: "15%",
    },
    {
      title: "Mật khẩu",
      dataIndex: "matKhau",
      width: "15%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "12.5%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      width: "10%",
    },
    {
      title: "Loại tài khoản",
      dataIndex: "maLoaiNguoiDung",
      render: (text, object) => {
        if (text === "QuanTri") {
          return <span>Quản Trị</span>;
        } else {
          return <span>Khách hàng</span>;
        }
      },
      sorter: (a, b) => {
        let nguoiDungA = a.maLoaiNguoiDung.toLowerCase().trim();
        let nguoiDungB = b.maLoaiNguoiDung.toLowerCase().trim();
        if (nguoiDungA > nguoiDungB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      width: "15%",
    },
    {
      title: "Thao tác",
      dataIndex: "taiKhoan",
      render: (text, object, index) => {
        return (
          <Fragment key={index} className="flex items-center">
            <NavLink
              key={1}
              to={`/admin/films/editfilm/`}
              className="ml-2 text-blue-700 text-lg"
            >
              <EditOutlined />{" "}
            </NavLink>

            <span
              key={2}
              className="ml-2 text-red-700 text-lg cursor-pointer"
              onClick={() => {
                // Gọi action xóa
                if (userLogin.maLoaiNguoiDung !== "QuanTri") {
                  alert("Tài khoản của bạn không có quyền xóa phim !");
                  return <Redirect to="/admin/user/listuser" />;
                }
                if (
                  window.confirm(
                    "Bạn có chắc muốn xóa tài khoản " + object.taiKhoan + " ?"
                  )
                ) {
                  dispatch(xoaNguoiDungAction(text));
                }
              }}
            >
              <DeleteOutlined />{" "}
            </span>
          </Fragment>
        );
      },
      sortDirections: ["descend", "ascend"],
      width: "12.5%",
    },
  ];

  // Gán lại data
  const data = danhSachTaiKhoan;

  const onSearch = (value) => {
    // Gọi api lấy danh sách phim, trong đó xét điều kiện nếu tai khoản = " " thì load ra toàn bộ
    dispatch(layDanhSachNguoiDungAction(value));
  };

  function onChange(pagination, filters, sorter, extra) {
    // console.log("params", pagination, filters, sorter, extra);
  }

  // Kiểm tra trong localStorage nếu không phải admin thì chuyển về trang profile
  if (userLogin.maLoaiNguoiDung !== "QuanTri") {
    alert("Bạn không có quyền truy cập vào trang này !");
    return <Redirect to="/admin/profile" />;
  }

  return (
    <div>
      <h3 className="text-4xl mb-10">Danh sách tài khoản</h3>
      <div title="Bấm để thêm tài khoản mới" className="mt-8 mb-10">
        <NavLink
          to="/admin/user/adduser"
          className="py-3 px-3 rounded font-bold border-2 duration-500 border-blue-600 bg-white hover:bg-blue-600 text-blue-600 hover:text-white"
        >
          Thêm tài khoản
        </NavLink>
      </div>
      <Search
        className="mb-8 py-1 px-1 rounded font-bold border duration-500 border-blue-600 bg-white hover:bg-blue-600 text-blue-600 hover:text-white"
        placeholder="Nhập từ khóa"
        // Nếu bỏ enterButton sẽ hiện kính lúp
        enterButton="Search"
        size="large"
        // suffix là search giọng nói
        // suffix={suffix}
        onSearch={onSearch}
      />
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
}
