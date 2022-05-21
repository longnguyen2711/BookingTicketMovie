import React, { Fragment, useEffect } from "react";
import { Table } from "antd";

import { Input, Space } from "antd";
import { AudioOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd/lib/radio";
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachPhimAction } from "../../../redux/actions/QuanLyPhimActions";
import { NavLink } from "react-router-dom";

export default function Films(props) {
  const { arrFilmDefault } = useSelector((state) => state.QuanLyPhimReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const action = layDanhSachPhimAction();
    dispatch(action);
  }, []);

  console.log(arrFilmDefault, "rrFilmDefault");

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
      width: "10%"
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (text, film, index) => {
        return (
          <Fragment>
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
      width: "12%"
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
    },
    {
      title: "Hành động",
      dataIndex: "hanhDong",
      render: (text, film, index) => {
        return (
          <Fragment>
              <NavLink to="/" className="bg-dark "><EditOutlined/> </NavLink>
              <NavLink to="/" className="bg-red-500 text-white"><DeleteOutlined/> </NavLink>
          </Fragment>
        );
      },

      sortDirections: ["descend", "ascend"],
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
      <Button className="mb-5">Thêm phim</Button>
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
