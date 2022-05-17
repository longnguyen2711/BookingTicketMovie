import { ACCESSTOKEN, USER_LOGIN } from "../../util/settings/config";
import { SET_CHI_TIET_PHONG_VE } from "../types";

const stateDefault = {
  chiTietPhongVe: {},

};

export const QuanLyDatVeReducer = (state = stateDefault, action) => {
  switch (action.type) {
    // case SET_CHI_TIET_PHONG_VE:{
    //     state.chiTietPhongVe = action.chiTietPhongVe
    //     return{...state}
    // }
    default:
      return { ...state };
  }
};
