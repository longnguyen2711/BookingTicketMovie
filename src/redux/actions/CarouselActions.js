import axios from "axios";
import { DOMAIN } from "../../util/settings/config";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_CAROUSEL } from "../types";

export const getCarouselAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layDanhSachBanner();

      dispatch({
        type: SET_CAROUSEL,
        arrImg: result.data.content,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
};
