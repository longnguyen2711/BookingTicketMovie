import { DAT_VE, SET_CHI_TIET_PHONG_VE } from "../types";
import {ThongTinLichChieu} from '../../_core/models/ThongTinPhongVe'

const stateDefault = {
  chiTietPhongVe: new ThongTinLichChieu(),
  danhSachGheDangDat: [  {
    // Không call được api nên copy tạm để làm bước check ghế đăng đặt
    "maGhe": 50283,
    "tenGhe": "03",
    "maRap": 469,
    "loaiGhe": "Thuong",
    "stt": "03",
    "giaVe": 90000,
    "daDat": false,
    "taiKhoanNguoiDat": null
    
  }],

};

export const QuanLyDatVeReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_CHI_TIET_PHONG_VE:{
        state.chiTietPhongVe = action.chiTietPhongVe
        return{...state}
    }

    case DAT_VE:{
      let danhSachGheCapNhat = [...state.danhSachGheDangDat];

      let index = danhSachGheCapNhat.findIndex(gheDD => gheDD.maGhe === action.gheDuocChon.maGhe)

      if(index !== -1){
        danhSachGheCapNhat.splice(index,1)
      } else {
        danhSachGheCapNhat.push(action.gheDuocChon)
      }
      return {...state, danhSachGheDangDat:danhSachGheCapNhat}
    }

    default:
      return { ...state };
  }
};
