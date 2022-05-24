import { ACCESSTOKEN, DOMAIN, TOKEN_CYBERSOFT } from "../util/settings/config";
import axios from "axios";

export class baseService {

  put = (url, model) => {  //put json về phía backend
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "PUT",
      data: model,
      headers: { Authorization: "Bearer " + localStorage.getItem(ACCESSTOKEN), TokenCybersoft: TOKEN_CYBERSOFT }, //JWT
      
    });
  };

  post = (url, model) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "POST",
      data: model,
      headers: { Authorization: "Bearer " + localStorage.getItem(ACCESSTOKEN), TokenCybersoft: TOKEN_CYBERSOFT }, //JWT
      
    });
  };

  get = (url) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem(ACCESSTOKEN), TokenCybersoft: TOKEN_CYBERSOFT }, //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
      
    });
  };

  delete = (url) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem(ACCESSTOKEN), TokenCybersoft: TOKEN_CYBERSOFT }, //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
      
    });
  };
}

// Setup axios interceptor
export const http = axios.create({
  baseURL: DOMAIN, // Dommain khi request api sẽ được ghép vào với link
  timeout: 30000, // Thời gian tối đa chờ response trả về
});