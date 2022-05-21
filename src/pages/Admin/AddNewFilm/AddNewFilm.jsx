import React, { useDebugValue, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  Form,
  Input,
  Button,
  Radio,
  DatePicker,
  InputNumber,
  Switch,
} from "antd";
import moment from "moment";
import { themPhimMoiAction } from "../../../redux/actions/QuanLyPhimActions";
import { GROUPID } from "../../../util/settings/config";

const AddNewFilm = (props) => {
  const [componentSize, setComponentSize] = useState("default");

  const dispatch = useDispatch();

  // Dùng để hiển thị hình ảnh khi cập nhật file
  const [imgSrc, setImgSrc] = useState("");

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
    },
    onSubmit: (values) => {
      // console.log("values", values);
      values.maNhom = GROUPID;
      // Tạo đối tượng form data => đựa giá trị values từ formik vào formData
      let formData = new FormData(); // Cú pháp mặc định
      // formData.append('tenPhim', formik.value.tenPhim) // key và value, tương ứng với backend (phải điền từng cái)
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name); // => vì định dạng file hình ảnh là object phải truyền tới 3 tham số
        }
      }
      // formik ko thể consose.log ra được do tính bảo mật của browser => console.log(formData.get('tenPhim'))
      // console.log(values)

      // Gọi api gửi các giá trị formData về backend xử lý
      // Chưa up được file
      const action = themPhimMoiAction(formData);
      dispatch(action);
    },
  });

  //  Set lại định dạng ngày tháng
  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  // Dùng cho nút radio
  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  // Dùng để up dạng file
  const handleChangeFile = (e) => {
    // Lấy file từ e ra ([0] là chỉ lấy file đầu tiên)
    let file = e.target.files[0];
    // Set định dạng ảnh đầu vào
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      // Tạo đối tượng để đọc file
      // FileReader() cú pháp của JS
      let reader = new FileReader();
      // Đọc file
      reader.readAsDataURL(file);
      // Đọc file và trả ra kết quả ở dạng base64// e.target.result là kết quả trả về sau khi đọc file
      reader.onload = (e) => {
        // console.log("e.target.result", e.target.result);
        setImgSrc(e.target.result);
      };
      // Đem dữ liệu file vào formik
      formik.setFieldValue("hinhAnh", file);

      // Set validation
      // formik.setErrors()
    }
  };

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
      <h3 className="text-4xl mb-6">Thêm phim mới</h3>
      <Form.Item label="Kích cỡ" name="size">
        <Radio.Group>
          <Radio.Button value="small">Nhỏ</Radio.Button>
          <Radio.Button value="default">Vừa</Radio.Button>
          <Radio.Button value="large">Lớn</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên Phim">
        <Input name="tenPhim" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input name="trailer" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Mô tả">
        <Input name="moTa" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Ngày khởi chiếu">
        <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
      </Form.Item>
      <Form.Item label="Số sao">
        <InputNumber
          onChange={(value) => {
            formik.setFieldValue("danhGia", value);
          }}
          min={1}
          max={10}
        />
      </Form.Item>
      <Form.Item label="Đang chiếu">
        <Switch name="dangChieu" onChange={handleChangeSwitch("dangChieu")} />
      </Form.Item>
      <Form.Item label="Sắp chiếu">
        <Switch name="sapChieu" onChange={handleChangeSwitch("sapChieu")} />
      </Form.Item>
      <Form.Item label="Hot">
        <Switch name="hot" onChange={handleChangeSwitch("hot")} />
      </Form.Item>
      <Form.Item label="Hình ảnh">
        <input
          type="file"
          onChange={handleChangeFile}
          accept="image/png, image/jpeg, image/jpg"
        />
        <br />
        <img
          className="border-1 border-gray-400"
          style={{ width: 150, height: 100 }}
          src={imgSrc}
          alt="..."
        />
      </Form.Item>
      <Form.Item label="Tác vụ">
        <button
          type="submit"
          className="py-2 px-3 rounded font-bold border duration-500 border-blue-600 bg-white hover:bg-blue-600 text-blue-600 hover:text-white"
        >
          Thêm phim
        </button>
      </Form.Item>
    </Form>
  );
};

export default AddNewFilm;
