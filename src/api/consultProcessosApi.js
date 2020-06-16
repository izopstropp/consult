import axios from "axios";
import tokenInterceptor from "./config/tokenInterceptor";
import unauthorizedAccessInterceptor from "./config/unauthorizedAccessInterceptor";

const baseURL = process.env.VUE_APP_KURIERCONSULTAPI;
const instanceAxios = axios.create();

instanceAxios.interceptors.request.use(tokenInterceptor);

instanceAxios.interceptors.response.use((response) => {
  return response;
}, unauthorizedAccessInterceptor);

export default {
  buscarProcessosResumo() {
    return instanceAxios({
      method: "get",
      baseURL,
      //url: "api/auth",
      url: "/processosResumido",
      responseType: "json",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      //   data: {
      //     email,
      //     senha,
      //   },
    });
  },
};
