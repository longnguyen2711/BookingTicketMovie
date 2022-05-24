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
    return this.post('/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung', formDataCapNhat);
  };

  themNguoiDungMoi = (formDataNguoiDungMoi) => {
    return this.post('/api/QuanLyNguoiDung/ThemNguoiDung', formDataNguoiDungMoi);
  };
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
