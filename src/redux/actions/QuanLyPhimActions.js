import { SET_DANH_SACH_PHIM, SET_PHIM_MOI, SET_THONG_TIN_PHIM_TRUOC_CAP_NHAT } from "../types";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";
import { quanLyPhimService } from "../../services/QuanLyPhimService";

export const layDanhSachPhimAction = (tenPhim="") => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      const result = await quanLyPhimService.layDanhSachPhim(tenPhim);
      dispatch({
        type: SET_DANH_SACH_PHIM,
        arrFilm: result.data.content,
      });
      
      dispatch(hideLoadingAction);

    } catch (error) {
      console.log("error", error);
    }
  };
};

export const themPhimMoiAction = (formDataFilm) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.themPhimMoi(formDataFilm);
      dispatch({
        type: SET_PHIM_MOI,
        phimMoi: result.data.content,
      });
      // Thông báo thêm phim thành công
      await alert("Thêm phim thành công");
      // Lấy lại danh sách phim
      await dispatch(layDanhSachPhimAction());

    } catch (error) {
      alert("Thêm phim không thành công");
      console.log("error", error);
    }
  };
};

// Lấy thông tin phim về trước khi cập nhật
export const layThongTinPhimTruocCapNhatAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layThongTinPhimTruocCapNhat(
        maPhim
      );

      dispatch({
        type: SET_THONG_TIN_PHIM_TRUOC_CAP_NHAT,
        thongTinPhimTruocCapNhat: result.data.content,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
};

// Cập nhật phim
export const capNhatFilmAction = (formDataFilmUpdate) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.capNhatPhim(formDataFilmUpdate);

      // Thông báp cập nhật phim thành công
      alert("Cập nhật phim thành công")

      // Lấy lại danh sách phim
      dispatch(layDanhSachPhimAction())

    } catch (error) {
      alert("Cập nhật phim không thành công");
      console.log("error", error);
    }
  };
};

// Xóa phim
export const xoaPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.xoaPhim(maPhim);

      // Thông báo xóa phim thành công
      alert("Xóa phim thành công")

      // Lấy lại danh sách phim
      dispatch(layDanhSachPhimAction())

    } catch (error) {
      alert("Xóa phim không thành công");
      console.log("error", error);
    }
  };
};