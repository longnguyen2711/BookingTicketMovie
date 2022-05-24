import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import {
  DANG_KY_ACTION,
  DANG_NHAP_ACTION,
  SET_THONG_TIN_NGUOI_DUNG,
} from "../types";
import { history } from "../../App";

export const dangNhapAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
      if (result.data.statusCode === 200) {
        dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: result.data.content,
        });
        alert("Đăng nhập thành công");
        history.push("/");
      }
    } catch (error) {
      alert(
        "Đăng nhập không thành công, tên đăng nhập hoặc mật khẩu không chính xác"
      );
      console.log("error", error.response.data);
    }
  };
};

export const layThongTinNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinNguoiDung();
      if (result.data.statusCode === 200) {
        dispatch({
          type: SET_THONG_TIN_NGUOI_DUNG,
          thongTinNguoiDung: result.data.content,
        });
      }
    } catch (error) {
      console.log("error", error.response.data);
    }
  };
};

export const dangKyTaiKhoanAction = (formDataDangKy) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangKyTaiKhoan(
        formDataDangKy
      );

      if (result.data.statusCode === 200) {
        dispatch({
          type: DANG_KY_ACTION,
          formDataDangKy: result.data.content,
        });
        alert("Đăng ký thành công, chuyển đến trang đăng nhập");
        history.push("/login"); 
      }

    } catch (error) {
      alert("Đăng ký thất bại, vui lòng kiểm tra lại");
      console.log("error", error.response.data);
    }
  };
};
