import { quanLyDatVeService } from "../../../services/QuanLyDatVeService";
import { quanLyRapService } from "../../../services/QuanLyRapService";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Form, Select } from "antd";
import { InputNumber } from "antd";
import { useFormik } from "formik";
import { DatePicker } from "antd";
import { Button } from "antd";
import moment from "moment";

export default function ShowTime(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });

  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieugioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: async (values) => {
      try {
        const result = await quanLyDatVeService.taoLichChieu(values);
        alert(result.data.content);
      } catch (error) {
        console.log("error", error.response?.data);
      }
    },
  });

  useEffect(async () => {
    try {
      let result = await quanLyRapService.layThongTinHeThongRap();
      setState({
        ...state,
        heThongRapChieu: result.data.content,
      });
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  const handleChangeHeThongRap = async (value) => {
    // Từ hệ thống rạp call api lấy thông tin rap
    try {
      let result = await quanLyRapService.layThongTinCumRap(value);
      setState({
        ...state,
        cumRapChieu: result.data.content,
      });
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };

  const handleChangeCumRap = async (value) => {
    formik.setFieldValue("maRap", value);
  };

  const onOk = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
  };

  const onChangDate = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
  };

  const onChangeInputNumner = (value) => {
    formik.setFieldValue("giaVe", value);
  };

  const convertSelectHTR = () => {
    // state.heThongRapChieu?.map((htr, index) => ({label: htr.tenHeThongRap, value: htr.tenHeThongRap, }))}
    return state.heThongRapChieu?.map((htr, index) => {
      return { label: htr.tenHeThongRap, value: htr.maHeThongRap };
    });
  };

  let film = {};
  if (localStorage.getItem("filmParams")) {
    film = JSON.parse(localStorage.getItem("filmParams"));
  }
  // Kiểm tra trong localStorage nếu không phải admin thì chuyển về trang profile
  if (userLogin.maLoaiNguoiDung !== "QuanTri") {
    alert("Bạn không có quyền truy cập vào trang này !");
    return <Redirect to="/admin/films" />;
  }

  return (
    <div className="pr-5 md:pr-10 xl:pr-20">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        onSubmitCapture={formik.handleSubmit}
      >
        <h3 className="text-4xl">
          Tạo lịch chiếu - {props.match.params.tenphim}
        </h3>
        <img
          src={film.hinhAnh}
          alt="..."
          width={150}
          height={100}
          className="mb-10"
        />
        <Form.Item label="Hệ thống rạp">
          <Select
            options={convertSelectHTR()}
            //   state.heThongRapChieu?.map((htr, index) => ({
            //   label: htr.tenHeThongRap,
            //   value: htr.tenHeThongRap,
            // }))}
            onChange={handleChangeHeThongRap}
            placeholder="Chọn hệ thống rạp"
          />
        </Form.Item>

        <Form.Item label="Cụm rạp">
          <Select
            options={state.cumRapChieu?.map((cumRap, index) => ({
              label: cumRap.tenCumRap,
              value: cumRap.maCumRap,
            }))}
            onChange={handleChangeCumRap}
            placeholder="Chọn cụm rạp"
          />
        </Form.Item>

        <Form.Item label="Ngày chiếu - Giờ chiếu">
          <DatePicker
            format="DD/MM/YYYY hh:mm:ss"
            onChange={onChangDate}
            showTime
            onOk={onOk}
          />
        </Form.Item>

        <Form.Item label="Giá vé">
          <InputNumber
            min={75000}
            max={150000}
            onChange={onChangeInputNumner}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button htmlType="submit" title="Bấm để thêm phim">
            Tạo lịch chiếu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
