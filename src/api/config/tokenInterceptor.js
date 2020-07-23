import store from "@/store/index";

export default function(config) {
  
  if (store.getters.autenticado) {
    console.log("entrei aqui -- >" + store.state.auth.token)
    config.headers["Authorization"] = `Bearer ${store.state.auth.token}`;
  }
  return config;
}
