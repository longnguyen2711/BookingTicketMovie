import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  Form,
  Input,
  Radio,
  DatePicker,
  InputNumber,
  Switch,
} from "antd";
import moment from "moment";
import {
  capNhatFilmAction,
  layThongTinPhimTruocCapNhatAction,
  themPhimMoiAction,
} from "../../../redux/actions/QuanLyPhimActions";
import { GROUPID } from "../../../util/settings/config";

const EditFilm = (props) => {
  const [componentSize, setComponentSize] = useState("default");

  // Dùng để hiển thị hình ảnh khi cập nhật file
  const [imgSrc, setImgSrc] = useState("");

  const dispatch = useDispatch();

  // Lấy thông tin phim trước khi cập nhật từ reducer
  const { thongTinPhimTruocCapNhat } = useSelector(
    (state) => state.QuanLyPhimReducer
  );

  useEffect(() => {
    let { id } = props.match.params;
    const action = layThongTinPhimTruocCapNhatAction(id);
    dispatch(action);
  }, []);

  const formik = useFormik({
    //Để xét dữ liệu mặc định cho formik từ props của redux phải bật thuộc tính enableReinitialize, thuộc tính này thường chỉ làm làm cho form edit, ko đụngchạm state khác
    enableReinitialize: true,

    // Cơ chế formik lần đầu tiên render sẽ không có dữ liệu vì chưa gọi api, sau khi render giao diện thì useEffect mới chạy, khi đó mới call api và có dữ liệu và cập nhật vào formik
    initialValues: {
      maPhim: thongTinPhimTruocCapNhat?.maPhim,
      tenPhim: thongTinPhimTruocCapNhat?.tenPhim,
      trailer: thongTinPhimTruocCapNhat?.trailer,
      moTa: thongTinPhimTruocCapNhat?.moTa,
      ngayKhoiChieu: thongTinPhimTruocCapNhat?.ngayKhoiChieu,
      dangChieu: thongTinPhimTruocCapNhat?.dangChieu,
      sapChieu: thongTinPhimTruocCapNhat?.sapChieu,
      hot: thongTinPhimTruocCapNhat?.hot,
      danhGia: thongTinPhimTruocCapNhat?.danhGia,
      // Null là giữ lại ảnh cũ
      hinhAnh: null,
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
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name); // => vì định dạng file hình ảnh là object phải truyền tới 3 tham số
          }
        }
      }
      // formik ko thể consose.log ra được do tính bảo mật của browser => console.log(formData.get('tenPhim'))


      // Gọi api gửi các giá trị formData về backend xử lý
      const action = capNhatFilmAction(formData);
      dispatch(action);
      
      //Quay về trang trang film sau khi bấm cập nhật
      setTimeout(() => {
        props.history.push('/admin/films');
      }, 1000);
    },
  });

  //  Set lại định dạng ngày tháng
  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value);
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  // Dùng cho nút radio
  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  // Dùng để up dạng file
  const handleChangeFile = async (e) => {
    // Lấy file từ e ra ([0] là chỉ lấy file đầu tiên)
    let file = e.target.files[0];
    // Set định dạng ảnh đầu vào
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      // Đem dữ liệu file vào formik trước
      await formik.setFieldValue("hinhAnh", file);
      // Tạo đối tượng để đọc file load hình ảnh ra giao diện
      // FileReader() cú pháp của JS
      let reader = new FileReader();
      // Đọc file
      reader.readAsDataURL(file);
      // Đọc file và trả ra kết quả ở dạng base64// e.target.result là kết quả trả về sau khi đọc file
      reader.onload = (e) => {
        // console.log("e.target.result", e.target.result);
        setImgSrc(e.target.result);
      };

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
      <h3 className="text-4xl mb-6">Cập nhật phim {formik.values.tenPhim}</h3>
      <Form.Item label="Kích cỡ" name="size">
        <Radio.Group>
          <Radio.Button value="small">Nhỏ</Radio.Button>
          <Radio.Button value="default">Vừa</Radio.Button>
          <Radio.Button value="large">Lớn</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên Phim">
        <Input
          name="tenPhim"
          onChange={formik.handleChange}
          value={formik.values.tenPhim}
        />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input
          name="trailer"
          onChange={formik.handleChange}
          value={formik.values.trailer}
        />
      </Form.Item>
      <Form.Item label="Mô tả">
        <Input
          name="moTa"
          onChange={formik.handleChange}
          value={formik.values.moTa}
        />
      </Form.Item>
      <Form.Item label="Ngày khởi chiếu">
        <DatePicker
          format={"DD/MM/YYYY"}
          onChange={handleChangeDatePicker}
          value={moment(formik.values.ngayKhoiChieu)}
        />
      </Form.Item>
      <Form.Item label="Số sao">
        <InputNumber
          onChange={(value) => {
            formik.setFieldValue("danhGia", value);
          }}
          value={formik.values.danhGia}
          min={1}
          max={10}
        />
      </Form.Item>
      <Form.Item label="Đang chiếu">
        <Switch
          name="dangChieu"
          onChange={handleChangeSwitch("dangChieu")}
          checked={formik.values.dangChieu}
        />
      </Form.Item>
      <Form.Item label="Sắp chiếu">
        <Switch
          name="sapChieu"
          onChange={handleChangeSwitch("sapChieu")}
          checked={formik.values.sapChieu}
        />
      </Form.Item>
      <Form.Item label="Hot">
        <Switch
          name="hot"
          onChange={handleChangeSwitch("hot")}
          checked={formik.values.hot}
        />
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
          src={imgSrc === "" ? thongTinPhimTruocCapNhat.hinhAnh : imgSrc}
          alt="..."
        />
      </Form.Item>
      <Form.Item label="Tác vụ">
        <button
          type="submit"
          className="py-2 px-4 rounded font-bold border-2 duration-500 border-blue-600 bg-white hover:bg-blue-600 text-blue-600 hover:text-white"
        >
          Cập nhật
        </button>
      </Form.Item>
    </Form>
  );
};

export default EditFilm;
