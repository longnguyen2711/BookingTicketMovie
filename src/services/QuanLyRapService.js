import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseServices";

export class QuanLyRapService extends baseService {
  constructor() {
    super();
  }

  layDanhSachHeThongRap = () => {
    return this.get(
      `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`
    );
  };

  layThongTinLichChieuPhim = (maPhim) => {
    return this.get(`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
  };

  // Để tạo lịch chiếu trong admin template
  layThongTinHeThongRap = () => {
    return this.get(`api/QuanLyRap/LayThongTinHeThongRap`);
  };

  layThongTinCumRap = (maHeThongRap) => {
    return this.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`);
  };



}

export const quanLyRapService = new QuanLyRapService();
