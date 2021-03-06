import {
  DANG_KY_ACTION,
  DANG_NHAP_ACTION,
  SET_DANH_SACH_TAI_KHOAN,
  SET_THONG_TIN_NGUOI_DUNG,
} from "../types";
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";
import { history } from "../../App";

export const dangNhapAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
      if (result.data.statusCode === 200) {
        await dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: result.data.content,
        });

        alert("Đăng nhập thành công");
        history.push('/'); 
        window.location.reload();      
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

        // Link thay đổi nhưng ko tự chuyển trang phải bấm relaod mới được
        alert("Đăng ký thành công, chuyển đến trang đăng nhập");
        history.push("/login");
        window.location.reload();
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
      window.location.reload();
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

      // Chưa tự load lại được tên trên header
      // if (result.data.statusCode === 200) {
      //   dispatch({
      //     type: DANG_KY_ACTION,
      //     formDataDangKy: result.data.content,
      //   });
      alert("Thêm người dùng mới thành công");
      // history.push("/login");
    } catch (error) {
      alert("Thêm người dùng thất bại, vui lòng kiểm tra lại");
      console.log("error", error.response.data);
    }
  };
};

export const layDanhSachNguoiDungAction = (taiKhoan="") => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await quanLyNguoiDungService.layDanhSachNguoiDung(taiKhoan);
      if (result.data.statusCode === 200) {
        dispatch({
          type: SET_DANH_SACH_TAI_KHOAN,
          danhSachTaiKhoan: result.data.content,
        });
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      console.log("error", error.response.data);
    }
  };
};

export const xoaNguoiDungAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      
      const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);
      alert("Xóa người dùng thành công");
      dispatch(layDanhSachNguoiDungAction())
    } catch (error) {
      alert("Xóa người dùng thất bại, vui lòng kiểm tra lại");
      console.log("error", error.response.data);
    }
  };
};
