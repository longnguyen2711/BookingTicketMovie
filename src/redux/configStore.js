import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { CarouselReducer } from "./reducers/CarouselReducer";
import { QuanLyPhimReducer } from "./reducers/QuanLyPhimReducer";
import { QuanLyRapReducer } from "./reducers/QuanLyRapReducer";
import { QuanLyNguoiDungReducer } from "./reducers/QuanLyNguoiDungReducer";
import { QuanLyDatVeReducer } from "./reducers/QuanLyDatVeReducer";
import { LoadingReducer } from "./reducers/LoadingReducer";


const rootReducer = combineReducers({
  // state ứng dụng
  CarouselReducer,
  QuanLyPhimReducer,
  QuanLyRapReducer,
  QuanLyNguoiDungReducer,
  QuanLyDatVeReducer,
  LoadingReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

// import {configureStore} from '@reduxjs/toolkit'
// import  CarouselReducer  from "./reducers/CarouselReducer";
// import  {QuanLyPhimReducer}  from "./reducers/QuanLyPhimReducer";
// import { QuanLyRapReducer}  from "./reducers/QuanLyRapReducer";

// export const store = configureStore({
//     reducer: {
//       CarouselReducer: CarouselReducer,
//       QuanLyPhimReducer: QuanLyPhimReducer,
//       QuanLyRapReducer: QuanLyPhimReducer,
//     }
// })
