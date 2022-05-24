import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import {
  DANG_KY_ACTION,
  DANG_NHAP_ACTION,
  SET_THONG_TIN_NGUOI_DUNG,
} from "../types";
import { history } from "../../App";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";

export const dangNhapAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
      if (result.data.statusCode === 200) {
       await  dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: result.data.content,
        });
       await alert("Đăng nhập thành công");
       await history.push("/");
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
      dispatch(displayLoadingAction);

      const result = await quanLyNguoiDungService.layThongTinNguoiDung();
      if (result.data.statusCode === 200) {
        dispatch({
          type: SET_THONG_TIN_NGUOI_DUNG,
          thongTinNguoiDung: result.data.content,
        });
      }

      dispatch(hideLoadingAction);

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
        alert("Đăng ký thành công");
        history.push("/login");
      }
    } catch (error) {
      alert("Đăng ký thất bại, vui lòng kiểm tra lại");
      console.log("error", error.response.data);
    }
  };
};

export const capNhatThongTinNguoiDungnAction = (formDataCapNhat) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(
        formDataCapNhat
      );

      alert("Cập nhật thành công");
      history.push("/admin/profile");
    } catch (error) {
      alert("Cập nhật thất bại, vui lòng kiểm tra lại");
      console.log("error", error.response.data);
    }
  };
};

export const themNguoiDungMoiAction = (formDataNguoiDungMoi) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.themNguoiDungMoi(
        formDataNguoiDungMoi
      );

      // if (result.data.statusCode === 200) {
      //   dispatch({
      //     type: DANG_KY_ACTION,
      //     formDataDangKy: result.data.content,
      //   });
        alert("Thêm người dùng mới thành công");
        history.push("/login");
      
    } catch (error) {
      alert("Thêm người dùng thất bại, vui lòng kiểm tra lại");
      console.log("error", error.response.data);
    }
  };
};