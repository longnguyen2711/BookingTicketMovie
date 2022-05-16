import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseServices";

export class QuanLyNguoiDungService extends baseService {
  constructor() {
    super();
  }

  dangNhap = (thongTinDangNhap) => { //{taiKhoan:'', matKhau:''}
    return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
  };

    
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();