import store from "../../store/index";
import { DO_LOGOUT } from "@/store/actions";
import router from "../../router/index";
// import Vue from 'vue'

export default function(error) {
  if (error.response && error.response.status === 401) {
    store.dispatch(DO_LOGOUT);
    router.push({ name: "login" });
    return error.response;
  } else {
    router.push({ name: "login" });
    return error.response;
  }
}
