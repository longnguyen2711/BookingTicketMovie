import { capNhatThongTinNguoiDungnAction, layThongTinNguoiDungAction } from "../../../../redux/actions/QuanLyNguoiDungActions";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Form, Input, Radio } from "antd";
import { useFormik } from "formik";


const EditProfile = (props) => {
  const [componentSize, setComponentSize] = useState("default");

  const { thongTinNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const action = layThongTinNguoiDungAction();
    dispatch(action);
  }, []);

  const formik = useFormik({
    //Để xét dữ liệu mặc định cho formik từ props của redux phải bật thuộc tính enableReinitialize, thuộc tính này thường chỉ làm làm cho form edit, ko đụngchạm state khác
    enableReinitialize: true,

    initialValues: {
      taiKhoan: thongTinNguoiDung?.taiKhoan,
      matKhau: thongTinNguoiDung?.matKhau,
      hoTen: thongTinNguoiDung?.hoTen,
      email: thongTinNguoiDung?.email,
      soDt: thongTinNguoiDung?.soDT,
      maNhom: thongTinNguoiDung?.maNhom,
      maLoaiNguoiDung: thongTinNguoiDung?.maLoaiNguoiDung,
    },
    onSubmit: (values) => {
        const action = capNhatThongTinNguoiDungnAction(values);
        dispatch(action);
    },
  });

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
    >
      <h3 className="text-4xl mb-10">
        Cập nhật thông tin cá nhân 
      </h3>
      <Form.Item label="Kích cỡ" name="size">
        <Radio.Group>
          <Radio.Button value="small">Nhỏ</Radio.Button>
          <Radio.Button value="default">Vừa</Radio.Button>
          <Radio.Button value="large">Lớn</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Loại người dùng">
        <div className="relative mb-3">
          <Input name="maLoaiNguoiDung" value={formik.values.maLoaiNguoiDung} />
          <div className="absolute pt-1 pr-1 right-0 top-full italic">Không thể thay đổi loại người dùng</div>
        </div>
      </Form.Item>
      <Form.Item label="Tài khoản">
        <div className="relative mb-3">
          <Input name="taiKhoan" value={formik.values.taiKhoan} />
          <div className="absolute pt-1 pr-1 right-0 top-full italic">Không thể thay đổi tài khoản</div>
        </div>
      </Form.Item>
      <Form.Item label="Mật khẩu">
        <Input
          name="matKhau"
          onChange={formik.handleChange}
          value={formik.values.matKhau}
        />
      </Form.Item>
      <Form.Item label="Email">
        <Input
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </Form.Item>
      <Form.Item label="Họ tên">
        <Input
          name="hoTen"
          onChange={formik.handleChange}
          value={formik.values.hoTen}
        />
      </Form.Item>
      <Form.Item label="Số điện thoại">
        <Input
          name="soDt"
          onChange={formik.handleChange}
          value={formik.values.soDt}
        />
      </Form.Item>
      <Form.Item label="Mã nhóm">
        <Input
          name="maNhom"
          onChange={formik.handleChange}
          value={formik.values.maNhom}
        />
      </Form.Item>

      <Form.Item label="Tác vụ">
        <button
          title="Bấm để cập nhật"
          type="submit"
          className="py-2 px-4 rounded font-bold border-2 duration-500 border-blue-600 bg-white hover:bg-blue-600 text-blue-600 hover:text-white"
        >
          Cập nhật
        </button>
      </Form.Item>
    </Form>
  );
};

export default EditProfile;
