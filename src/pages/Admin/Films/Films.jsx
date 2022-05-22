import React, { Fragment, useEffect } from "react";
import { Table } from "antd";
import { Input, Space } from "antd";
import { AudioOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd/lib/radio";
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachPhimAction, xoaPhimAction } from "../../../redux/actions/QuanLyPhimActions";
import { NavLink } from "react-router-dom";
import moment from "moment";

export default function Films(props) {
  const { arrFilmDefault } = useSelector((state) => state.QuanLyPhimReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const action = layDanhSachPhimAction();
    dispatch(action);
  }, []);

  const { Search } = Input;

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );

  const onSearch = (value) => console.log(value);

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
      width: "35%",
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
      width: "10%",
    },
    {
      title: "Hành động",
      dataIndex: "hanhDong",
      render: (text, film, index) => {
        return (
          <Fragment key={index} className="flex items-center">
            <NavLink key={1} to={`/admin/films/editfilm/${film.maPhim}`} className="ml-3 text-blue-700 text-lg">
              <EditOutlined />{" "}
            </NavLink>            
            <span key={2} className="ml-3 text-red-700 text-lg cursor-pointer" onClick={() => {
              // Gọi action xóa
              if(window.confirm('Bạn có chắc muốn xóa phim ' + film.tenPhim) + ' ?'){
                //Gọi action
                dispatch(xoaPhimAction(film.maPhim))
              }
            }}>
              <DeleteOutlined />{" "}
            </span>
             </Fragment>
        );
      },
      sortDirections: ["descend", "ascend"],
      width: "15%",
    },
  ];

  // Gán lại data
  const data = arrFilmDefault;

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <div>
      <h3 className="text-4xl">Quản lý phim</h3>
      <div className="mt-8 mb-6"><NavLink to="/admin/addnewfilm" className="px-3 py-2 boder-1 font-bold duration-0 bg-white text-black hover:bg-black hover:text-white rounded">Thêm phim mới</NavLink></div>
      <Search
        className="mb-5"
        placeholder="input search text"
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
