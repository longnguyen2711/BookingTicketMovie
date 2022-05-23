import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { DANG_KY_ACTION, DANG_NHAP_ACTION, SET_THONG_TIN_NGUOI_DUNG } from "../types";
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
        history.push('/');
      }
    } catch (error) {
      console.log("error", error.response.data);
    }
  };
};

export const layThongTinNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinNguoiDung();

      console.log(" console.log(result.data.content)", result);

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
      const result = await quanLyNguoiDungService.dangKyTaiKhoan(formDataDangKy);

      console.log("đăng ký tài khoản", result);

      if (result.data.statusCode === 200) {
        dispatch({
          type: DANG_KY_ACTION,
          formDataDangKy: result.data.content,
        });
      }
      alert('Đăng ký thành công')
      
    } catch (error) {
      console.log("error", error.response.data);
    }
  };
};