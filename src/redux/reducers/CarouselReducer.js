import { SET_CAROUSEL } from "../types";


const stateDefault = {
  arrImg: [],
};

export const CarouselReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_CAROUSEL: {
      state.arrImg = action.arrImg;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { http } from "../../services/baseServices";

// const stateDefault = {
//   arrImg: [],
// };

// const CarouselReducer = createSlice({
//   name: "CarouselReducer",
//   stateDefault,
//   reducers: {
//     getCarouselAction: (state, action) => {},
//   },
// });

// export const { getCarouselAction } = CarouselReducer.actions;

// export default CarouselReducer.reducer;

// //----------------- action thunk -----------------

// export const getCarouselApiAction = () => {
//   return async (dispatch) => {
//     try {
//       // let result = await axios({
//       //   url: "https://movienew.cybersoft.edu.vn/api/api/QuanLyPhim/LayDanhSachBanner",
//       //   method: "GET",
//       //   headers: {
//       //     TokenCybersoft: TOKEN_CYBERSOFT,
//       //   },
//       // });
//       let result = await http.get("/api/QuanLyPhim/LayDanhSachBanner");

//       const action = getCarouselAction(result.data.content);
//       /*
//         action = {
//             type: 'CarouselReducer/getCarouselAction',
//             payload: result.data.content
//         }
//       */
//       dispatch(action);
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };