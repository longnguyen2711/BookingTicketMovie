import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseServices";

export class QuanLyNguoiDungService extends baseService {
  constructor() {
    super();
  }

  dangNhap = (thongTinDangNhap) => {
    //{taiKhoan:'', matKhau:''}
    return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
  };

  layThongTinNguoiDung = () => {
    return this.post('api/QuanLyNguoiDung/ThongTinTaiKhoan');
  };

  dangKyTaiKhoan = (formDataDangKy) => {
    return this.post('/api/QuanLyNguoiDung/DangKy', formDataDangKy);
  };

  capNhatThongTinNguoiDung = (formDataCapNhat) => {
    return this.put('/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung', formDataCapNhat);
  };

  themNguoiDungMoi = (formDataNguoiDungMoi) => {
    return this.post('/api/QuanLyNguoiDung/ThemNguoiDung', formDataNguoiDungMoi);
  };

  layDanhSachNguoiDung = (taiKhoan="") => {
    if(taiKhoan.toLocaleLowerCase().trim() !==""){
      return this.get(`/api/QuanLyNguoiDung/TimKiemNguoiDung?maNhom=${GROUPID}&tuKhoa=${taiKhoan}`);
    }
    return this.get('/api/QuanLyNguoiDung/LayDanhSachNguoiDung');
  };

  xoaNguoiDung = (taiKhoan) => {
    return this.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
 };

}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
