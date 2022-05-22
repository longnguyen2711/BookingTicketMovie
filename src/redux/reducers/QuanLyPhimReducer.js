import {
  SET_CHI_TIET_PHIM,
  SET_DANH_SACH_PHIM,
  SET_PHIM_CAP_NHAT,
  SET_PHIM_DANG_CHIEU,
  SET_PHIM_MOI,
  SET_PHIM_SAP_CHIEU,
  SET_THONG_TIN_PHIM_TRUOC_CAP_NHAT,
} from "../types";

const stateDefault = {
  arrFilm: [],
  dangChieu: true,
  sapChieu: true,
  arrFilmDefault: [],
  filmDetail: {},
  newFilm: {},
  thongTinPhimTruocCapNhat: {},
};

export const QuanLyPhimReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_DANH_SACH_PHIM: {
      state.arrFilm = action.arrFilm;
      state.arrFilmDefault = action.arrFilm;
      return { ...state };
    }

    case SET_PHIM_DANG_CHIEU: {
      state.dangChieu = !state.dangChieu;
      state.arrFilm = state.arrFilmDefault.filter(
        (film) => film.dangChieu === state.dangChieu
      );
      return { ...state };
    }

    case SET_PHIM_SAP_CHIEU: {
      state.sapChieu = !state.sapChieu;
      state.arrFilm = state.arrFilmDefault.filter(
        (film) => film.sapChieu === state.sapChieu
      );
      return { ...state };
    }

    case SET_CHI_TIET_PHIM:{
      state.filmDetail = action.filmDetail
      return { ...state };
    }

    case SET_PHIM_MOI:{
      state.newFilm = action.phimMoi
      return { ...state };
    }

    case SET_THONG_TIN_PHIM_TRUOC_CAP_NHAT:{
      state.thongTinPhimTruocCapNhat = action.thongTinPhimTruocCapNhat
      return { ...state };
    }


    default:
      return { ...state };
  }
};
