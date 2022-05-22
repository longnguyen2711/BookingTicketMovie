import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseServices";

export class QuanLyPhimService extends baseService {
  constructor() {
    super();
  }

  layDanhSachBanner = () => {
    return this.get(`/api/QuanLyPhim/LayDanhSachBanner`);
  };

  layDanhSachPhim = (tenPhim="") => {
    if(tenPhim.trim() !==""){
      return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`);
    }
    return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`);
  };
  
  themPhimMoi = (formDataFilm) => {
    return this.post(`/api/QuanLyPhim/ThemPhimUploadHinh`, formDataFilm);
  };
  
  layThongTinPhimTruocCapNhat = (maPhim) => {
    return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
  };

  capNhatPhim = (formDataFilm) => {
    return this.post(`/api/QuanLyPhim/CapNhatPhimUpload`, formDataFilm);
  };

  xoaPhim = (maPhim) => {
    return this.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
  };
  
} 

export const quanLyPhimService = new QuanLyPhimService();
