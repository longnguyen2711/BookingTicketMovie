
import { themNguoiDungMoiAction } from "../../../../redux/actions/QuanLyNguoiDungActions";
import { useDispatch, useSelector } from "react-redux";
import { Select, Form, Input, Radio } from "antd";
import { Redirect } from "react-router-dom";
import React, { useState } from "react";
import { useFormik } from "formik";


const AddUser = (props) => {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const [componentSize, setComponentSize] = useState("default");

  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDt: "",
      maNhom: "",
      maLoaiNguoiDung: "",
    },
    onSubmit: (values) => {
      const action = themNguoiDungMoiAction(values);
      dispatch(action);
    },
  });

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const { Option } = Select;

  // Kiểm tra trong localStorage nếu không phải admin thì chuyển về trang profile
  if (userLogin.maLoaiNguoiDung !== "QuanTri") {
    alert("Bạn không có quyền truy cập vào trang này !");
    return <Redirect to="/admin/profile" />;
  }

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
      <h3 className="text-4xl mb-10">Thêm người dùng mới</h3>
      <Form.Item label="Kích cỡ" name="size">
        <Radio.Group>
          <Radio.Button value="small">Nhỏ</Radio.Button>
          <Radio.Button value="default">Vừa</Radio.Button>
          <Radio.Button value="large">Lớn</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Loại người dùng">
        <div className="relative mb-3">
          <Input name="maLoaiNguoiDung" onChange={formik.handleChange} />
          <div className="absolute pt-1 pr-1 right-0 top-full italic">
            QuanTri / KhachHang
          </div>
        </div>
      </Form.Item>
      <Form.Item label="Tài khoản">
        <Input name="taiKhoan" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Mật khẩu">
        <Input name="matKhau" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Email">
        <Input name="email" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Họ tên">
        <Input name="hoTen" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Số điện thoại">
        <Input name="soDt" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Mã nhóm">
        <Input name="maNhom" onChange={formik.handleChange} />
      </Form.Item>

      <Form.Item label="Tác vụ">
        <button
          title="Bấm để thêm người"
          type="submit"
          className="py-2 px-4 rounded font-bold border-2 duration-500 border-blue-600 bg-white hover:bg-blue-600 text-blue-600 hover:text-white"
        >
          Thêm người dùng
        </button>
      </Form.Item>
    </Form>
  );
};

export default AddUser;
