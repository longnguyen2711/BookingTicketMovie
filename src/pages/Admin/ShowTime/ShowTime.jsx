import React, { useEffect, useState } from "react";
import { Form, Select } from "antd";
import { Button } from 'antd';
import { Cascader } from "antd";
import { DatePicker } from "antd";
import { InputNumber } from "antd";
import { quanLyRapService } from "../../../services/QuanLyRapService";
import { useFormik } from "formik";
import moment from "moment";
import { quanLyDatVeService } from "../../../services/QuanLyDatVeService";

export default function ShowTime(props) {
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
      console.log(values,"values")
      try{
        const result = await quanLyDatVeService.taoLichChieu(values);
        alert(result.data.content)
      } catch(error){
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
  if(localStorage.getItem('filmParams')){
    film = JSON.parse(localStorage.getItem('filmParams'))
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
        <h3 className="text-4xl">Tạo lịch chiếu - {props.match.params.tenphim}</h3>
        <img src={film.hinhAnh} alt="..." width={150} height={100} className="mb-10"/>
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
          <Button
            htmlType="submit"
            title="Bấm để thêm phim"
         >
            Tạo lịch chiếu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
