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
  autenticar(usuario, senha) {
    let grant = "password";
    var params = new URLSearchParams();

    params.append("username", usuario);
    params.append("password", senha);
    params.append("grant_type", grant);

    return instanceAxios({
      method: "post",
      baseURL,
      //url: "api/auth"

      url: "/auth",
      responseType: "json",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      params: params,
    });
  },
};
