import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { layChiTietPhongVeAction } from "../../redux/actions/QuanLyDatVeActions";
import './Checkout.css'


export default function Checkout(props) {

  const {userLogin} = useSelector(state => state.QuanLyNguoiDungReducer)

  const {chiTietPhongVe} = useSelector(state => state.QuanLyDatVeReducer)

  const dispatch = useDispatch;
  useEffect(() => {
    // const action = layChiTietPhongVeAction(props.match.params.id);
    // dispatch(action)    
  }, [])

  return (
    <div className="min-h-screen mt-10" id="checkout">
      <div className="grid grid-cols-12">
        <div className="col-span-9 flex flex-col items-center">
          <div className="w-11/12 bg-black h-3"></div>
          <div className="screen relative">
            <p className="absolute top-0 left-0">MÀN HÌNH</p>
          </div>
        </div>
        <div className="col-span-3 min-h-screen">    
          <h3 className="text-green-400 text-center text-2xl">0đ</h3>
          <hr />
          <h3 className="text-xl">Spiderman</h3>
          <p>Địa điểm</p>
          <p>Ngày chiếu: 27/11/2017 - 12:00 RẠP 5</p>
          <hr />
          <div className="flex my-5">
            <div className="w-4/5">
              <span className="text-red-400">Ghế</span>
            </div>
            <div className="text-right">
              <span className="text-green-500">0đ</span>
            </div>
          </div>
          <hr />
          <div className="my-5">
            <i>Email</i>
            <br />
            {userLogin.email}
          </div>
          <hr />
          <div className="my-5">
            <i>Số điện thoại</i>
            <br />
            {userLogin.soDT}
          </div>
          <hr />
          <div className="mb-0 h-full flex flex-col justify-end items-center">
            <div className="bg-green-500 text-white w-full text-center py-2 font-bold text-xl">
              đặt vé
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
