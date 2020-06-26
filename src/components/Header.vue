<template>
  <div class="container">
    <div class="menu">
      <div class="menu-itens">
        <div class="menu-logokurier">
          <img src="../assets/LogoKurierConsultMenu.png" alt="logo kurier" />
        </div>
        <div class="menu-esquerdo" @click="iterarMenuUsuario">
          <img src="../assets/perfilUsuario.png" alt="perfil usuário" />
          <div class="menu-esquerdo-usuario">
            <p>Nome do usuário</p>
          </div>
          <div>
            <img
              class="menu-esquerdo-seta"
              src="../assets/setaMenuLateral.png"
              alt="seta"
            />
          </div>
          <div
            class="menu-itens-esquerdo-usuario"
            :class="nomeClassAbrirMenuUsuario"
          >
            <ul>
              <router-link
                class="menu-itens-esquerdo-usuario-configuracao"
                to="/selecao"
                tag="li"
                >Inicio</router-link
              >
              <router-link
                class="menu-itens-esquerdo-usuario-configuracao"
                to="/historico"
                tag="li"
                >Histórico de pesquisa</router-link
              >
              <li class="menu-itens-esquerdo-usuario-configuracao">
                Configuração
                <!-- <img src="../assets/miniEngrenagem.png" alt="mini engrenagem" /> -->
              </li>
              <li @click="sair">Sair</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { DO_LOGOUT } from "../store/actions";
export default {
  data() {
    return {
      nomeClassAbrirMenuUsuario: "",
    };
  },
  methods: {
    iterarMenuUsuario() {
      this.nomeClassAbrirMenuUsuario =
        this.nomeClassAbrirMenuUsuario == "fadeInDown"
          ? "fadeInOut"
          : "fadeInDown";
    },
    sair() {
      this.$store.dispatch(DO_LOGOUT);
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.menu {
  width: 100vw;
  height: 56px;
  background-color: #001a3f;
}
.menu-itens {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* display: flex; */
  max-width: 1174px;
  margin: 0 auto;
}

.menu-esquerdo {
  display: flex;
  align-items: center;
  margin-top: 8px;
  cursor: pointer;
}
.menu-itens-esquerdo-usuario {
  -webkit-animation-duration: 0.6s;
  z-index: -1;
  opacity: 0;
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
  position: absolute;
  width: 179px;
  height: 130px;
  top: 50px;
  right: 90px;
  list-style-type: none;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 7px;
  -webkit-box-shadow: 10px 14px 23px -15px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 14px 23px -15px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 14px 23px -15px rgba(0, 0, 0, 0.75);
}
.menu-itens-esquerdo-usuario ul {
  list-style-type: none;
  padding: 2px;
  margin: 0;
  cursor: pointer;
}
.menu-itens-esquerdo-usuario > ul li:hover {
  background-color: #001a3f;
  color: white;
}

.menu-itens-esquerdo-usuario > ul li:active {
  background-color: #001a3fb0;
  color: white;
}
.menu-itens-esquerdo-usuario > ul li {
  text-align: right;
  /* border-bottom: 1px solid #0415203b; */
  padding-bottom: 7px;
  padding-right: 5px;
}
.menu-itens-esquerdo-usuario > ul li:nth-child(3) {
  border-bottom: 1px solid #0415203b;
}
.menu-itens-esquerdo-usuario-configuracao > img {
  margin-top: -5px;
}
.menu-itens-esquerdo-usuario ul li:last-child {
  border-bottom: none;
  margin-top: 5px;
}
@media only screen and (max-width: 1200px) {
  .menu-itens-esquerdo-usuario {
    right: 0px;
  }
}
.menu-logokurier img {
  width: 120px;
  height: 38px;
  margin-top: 9px;
}
.menu-esquerdo-usuario > p {
  color: #dee2e7;
  margin: 0;
  margin-left: 15px;
  font-size: 1em;
}
.menu-esquerdo-seta {
  margin-left: 10px;
  cursor: pointer;
}
@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    z-index: 1;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    z-index: 1;
  }
}

@-webkit-keyframes fadeInOut {
  0% {
    opacity: 1;
    -webkit-transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
    opacity: 0;
  }
}

@keyframes fadeInOut {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    transform: transla teY(-20px);
    opacity: 0;
  }
}
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
}
.fadeInOut {
  -webkit-animation-name: fadeInOut;
  animation-name: fadeInOut;
}
</style>
