import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import SelecaoTipoConsulta from "../views/SelecaoTipoConsulta.vue";
import ConsultaAcoes from "../components/ConsultaAcoes";
import ResultadoConsultaAcoes from "../views/ResultadoConsultaAcoes.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/selecao",
        name: "selecao-tipo-consulta",
        component: SelecaoTipoConsulta,
      },
      {
        path: "/consulta-acoes/",
        name: "consulta-acoes",
        component: ConsultaAcoes,
      },
      {
        path: "/acoes",
        name: "ResultadoConsultaAcoes",
        component: ResultadoConsultaAcoes,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
