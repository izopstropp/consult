import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import store from '@/store/index.js'
import SelecaoTipoConsulta from "../views/SelecaoModulo.vue";
import ConsultaAcoes from "../views/acoes/ConsultaAcoes";
import RelatorioConsultaAcoes from "../views/acoes/RelatorioConsultaAcoes.vue";
import HistoricoConsulta from "../views/HistoricoConsulta";
import ConsultaPreditivo from "../views/preditivo/ConsultaPreditivo";
import Volumetria from "../views/acoes/Volumetria";
import PassivoJuridico from "../views/passivoJuridico/PassivoJuridico";
import AlertaJuridico from "../views/alertaJuridico/ConsultaAlertaJuridico";
import monitoramentoCadastrado from "../views/alertaJuridico/MonitoramentoCadastrado";
// import auth from "../store/Modules/auth.js"


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "*",
    redirect: "/login",
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/modulo",
        name: "selecaoTipoConsulta",
        component: SelecaoTipoConsulta,
        meta: {
          requiresAuth: true
        }
       
      },
      {
        path: "/consulta-acoes",
        name: "consulta-acoes",
        component: ConsultaAcoes,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/volumetria",
        name: "ResultadoConsultaAcoes",
        component: Volumetria,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/volumetria/:consultaId/:pag",
        name: "RelatorioConsultaAcoes",
        component: RelatorioConsultaAcoes,
        props: true,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/historico",
        name: "historico",
        component: HistoricoConsulta,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/consulta-preditivo",
        name: "consulta-preditivo",
        component: ConsultaPreditivo,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/passivo-juridico",
        name: "passivo-juridico",
        component: PassivoJuridico,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/alerta-juridico",
        name: "alerta-juridico",
        component: AlertaJuridico,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/alerta-juridico/monitorados",
        name: "monitoramento-cadastrado",
        component: monitoramentoCadastrado,
        meta: {
          requiresAuth: true
        }
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

router.beforeEach((to, from, next) => {
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.autenticado) {
      next()
    } else {
      next({ path: '/' })
    }
  } else {
    next()
  }
})

export default router;
