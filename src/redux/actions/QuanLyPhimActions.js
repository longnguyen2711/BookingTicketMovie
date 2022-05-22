import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_DANH_SACH_PHIM, SET_PHIM_MOI, SET_THONG_TIN_PHIM_TRUOC_CAP_NHAT } from "../types";
import { history } from "../../App";

export const layDanhSachPhimAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layDanhSachPhim();

      dispatch({
        type: SET_DANH_SACH_PHIM,
        arrFilm: result.data.content,
      });
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
      alert("Thêm phim thành công")
      // Lấy lại danh sách phim
      dispatch(layDanhSachPhimAction())
      // Chuyển hướng về trang admin danh sách phim
      history.push('admin/films/')
    } catch (error) {
      console.log("error", error);
    }
  };
};

// Lấy thông tin phim về trước khi cập nhật
export const layThongTinPhimTruocCapNhatAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layThongTinPhimTruocCapNhat(maPhim);

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
      const result = await quanLyPhimService.themPhimMoi(formDataFilmUpdate);
      // Thông báp cập nhật phim thành công
      alert("Cập nhật phim thành công")
      // Lấy lại danh sách phim
      dispatch(layDanhSachPhimAction())
      // Chuyển hướng về trang admin danh sách phim
      history.push('admin/films/')
    } catch (error) {
      console.log("error", error);
    }
  };
};

// Xóa phim
export const xoaFilmAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.xoaPhim(maPhim);
      console.log(result)
      // Thông báo xóa phim thành công
      alert("Xóa phim thành công")

      // Lấy lại danh sách phim
      dispatch(layDanhSachPhimAction())

    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};







