import { ACCESSTOKEN, USER_LOGIN } from "../../util/settings/config";
import { DANG_KY_ACTION, DANG_NHAP_ACTION, DANG_XUAT_ACTION, SET_THONG_TIN_NGUOI_DUNG } from "../types";

// Kiểm tra trong localStorage đã có thông tin đăng nhập hay chưa, nếu có rồi thì không cần đăng nhập lại
let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin: user,
  thongTinNguoiDung: {},
  userRegister: {},
};

export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DANG_NHAP_ACTION: {
      const { thongTinDangNhap } = action;
      // Lưu thông tin đăng nhập vào localStorege
      localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
      localStorage.setItem(ACCESSTOKEN, thongTinDangNhap.accessToken);
      // Lưu thông tin đăng nhập vào state
      return { ...state, userLogin: thongTinDangNhap };
    }

    // CHƯA ĐƯỢC
    case SET_THONG_TIN_NGUOI_DUNG: {
      console.log(action)
      state.thongTinNguoiDung = action.thongTinNguoiDung;
      console.log(state.thongTinNguoiDung)
      return { ...state };
    }

    case DANG_KY_ACTION: {
      state.userRegister = action.formDataDangKy;
      return { ...state };
    }
 
    default:
      return { ...state };
  }
};
