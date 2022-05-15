import React, { useEffect } from "react";
import "./Detail.css";
import { Tabs, Radio, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinChiTietPhim } from "../../redux/actions/QuanLyRapActions";
import moment from "moment";
import { Rate } from "antd";
import { NavLink } from "react-router-dom";

const { TabPane } = Tabs;

export default function Detail(props) {
  const filmDetail = useSelector((state) => state.QuanLyPhimReducer.filmDetail);

  console.log(filmDetail, "trâm anh");

  const dispatch = useDispatch();

  useEffect(() => {
    // Lấy thông tin param từ url
    let { id } = props.match.params;
    dispatch(layThongTinChiTietPhim(id));
  }, []);

  return (
    <div
      className="Detail relative"
      style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, height:"700px" }}
    >
      <div className="Detail__overlay flex items-center justify-center flex-wrap">
        <div className="grid grid-cols-12 w-full">
          <div className="col-span-5 col-start-3">
            <div className="grid grid-cols-3">
              <img
                src={filmDetail.hinhAnh}
                alt={filmDetail.biDanh}
                title={filmDetail.tenPhim}
                style={{ width: "200px", height: "300px" }}
              />
              <div>
                <p>{filmDetail.tenPhim}</p>
                <p>{filmDetail.moTa}</p>
                <p>
                  Ngày chiếu:{" "}
                  {moment(filmDetail.ngayKhoiChieu).format("DD.MM.YYYY")}
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <h1>Đánh giá</h1>
            <h1>
              <Rate allowHalf value={filmDetail.danhGia / 2} />
            </h1>
            <div className={`c100 p${filmDetail.danhGia * 10} z-0`}>
              <span>{filmDetail.danhGia * 10}%</span>
              <div className="slice">
                <div className="bar" />
                <div className="fill" />
              </div>
            </div>
          </div>
        </div>

<div className=" absolute top-20 w-2/3 bg-white px-5 py-5">
<Tabs defaultActiveKey="1" centered>
    <TabPane tab="Lịch chiếu" key="1" style={{minHeight: 320}}>
    <div>
          <Tabs tabPosition={"left"}>
            {filmDetail.heThongRapChieu?.map((htr, index) => {
              return (
                <TabPane
                  tab={
                    <div className="flex items-center justify-center">
                      <img
                        src={htr.logo}
                        width={50}
                        height={50}
                        alt={htr.logo}
                      />
                      <p className="ml-3 mb-0">{htr.tenHeThongRap}</p>                      
                    </div>
                  }
                  key={index}>
                  {htr.cumRapChieu?.map((cumRap, index) => {
                    return <div className="mt-2" key={index}>
                      <div className="flex items-center justify-start">
                        <img src={htr.logo} width={50} height={50} alt={htr.logo} />
                        <div className="text-left">
                            <p className="ml-3 mb-0 font-bold">{cumRap.tenCumRap}</p>
                            <p className="ml-3 mb-0">{cumRap.diaChi}</p></div>
                      </div>
                      <div className="thong-tin-lich-chieu grid grid-cols-4 gap-4">
                        <div>{cumRap.lichChieuPhim?.slice(0, 8).map((lichChieu, index) => {
                          return <NavLink to="" key={index} className="col-span-1">
                            {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                          </NavLink>
                        })}</div>
                      </div>
                    </div>
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </div>
    </TabPane>
    <TabPane tab="Thông tin" key="2" style={{minHeight: 320}}>
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Đánh giá" key="3" style={{minHeight: 320}}>
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
</div>


      </div>
    </div>
  );
}
