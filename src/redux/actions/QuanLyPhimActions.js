import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_DANH_SACH_PHIM, SET_PHIM_MOI } from "../types";

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
    } catch (error) {
      console.log("error", error);
    }
  };
};







