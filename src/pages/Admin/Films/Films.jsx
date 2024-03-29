import {
  layDanhSachPhimAction,
  xoaPhimAction,
} from "../../../redux/actions/QuanLyPhimActions";
import {
  DeleteOutlined,
  EditOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import React, { Fragment, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router";
import { Table, Input } from "antd";
import moment from "moment";

export default function Films(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const { arrFilmDefault } = useSelector((state) => state.QuanLyPhimReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const action = layDanhSachPhimAction();
    dispatch(action);
  }, []);

  const { Search } = Input;

  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      value: (text, object) => {
        return <span>{text}</span>;
      },
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend", "ascend"],
      width: "12.5%",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (text, film, index) => {
        return (
          <Fragment key={index}>
            <img
              src={film.hinhAnh}
              alt={film.tenPhim}
              width={50}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photos/id/${index}/50/50`;
              }}
            />
          </Fragment>
        );
      },
      width: "12.5%",
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      width: "28%",
    },
    {
      title: "Khởi chiếu",
      dataIndex: "ngayKhoiChieu",
      render: (text, object) => {
        return <span>{moment(object.ngayKhoiChieu).format("DD/MM/YYYY")}</span>;
      },
      width: "15%",
    },
    {
      title: "Đánh giá",
      dataIndex: "danhGia",
      render: (text, object) => {
        return <span>{object.danhGia}/10</span>;
      },
      sorter: (a, b) => a.danhGia - b.danhGia,
      sortDirections: ["descend", "ascend"],
      width: "12%",
    },
    {
      title: "Thao tác",
      dataIndex: "maPhim",
      render: (text, film, index) => {
        return (
          <Fragment key={index} className="flex items-center">
            <NavLink
              key={1}
              to={`/admin/films/editfilm/${film.maPhim}`}
              className="ml-2 text-blue-700 text-lg"
            >
              <EditOutlined />{" "}
            </NavLink>
            <NavLink
              key={1}
              to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`}
              className="ml-2 text-green-700 text-lg"
              onClick={() => {
                localStorage.setItem("filmParams", JSON.stringify(film));
              }}
            >
              <CalendarOutlined />{" "}
            </NavLink>
            <span
              key={2}
              className="ml-2 text-red-700 text-lg cursor-pointer"
              onClick={() => {
                // Gọi action xóa
                if (userLogin.maLoaiNguoiDung !== "QuanTri") {
                  alert("Tài khoản của bạn không có quyền xóa phim !");
                  return <Redirect to="/admin/profile" />;
                }
                if(window.confirm("Bạn có chắc muốn xóa phim " + film.tenPhim + " ?" )){
                  dispatch(xoaPhimAction(film.maPhim));
                }
              }}
            >
              <DeleteOutlined />{" "}
            </span>
          </Fragment>
        );
      },
      sortDirections: ["descend", "ascend"],
      width: "20%",
    },
  ];

  // Gán lại data
  const data = arrFilmDefault;

  const onSearch = (value) => {
    // Gọi api lấy danh sách phim, trong đó xét điều kiện nếu tên phim = " " thì load ra toàn bộ
    dispatch(layDanhSachPhimAction(value));
  };

  function onChange(pagination, filters, sorter, extra) {
    // console.log("params", pagination, filters, sorter, extra);
  }

   return (
    <div>
      <h3 className="text-4xl mb-10">Quản lý phim</h3>
      <div title="Bấm để thêm phim mới" className="mt-8 mb-10">
        <NavLink
          to="/admin/addnewfilm"
          className="py-3 px-3 rounded font-bold border-2 duration-500 border-blue-600 bg-white hover:bg-blue-600 text-blue-600 hover:text-white"
        >
          Thêm phim mới
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
