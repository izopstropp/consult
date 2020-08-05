<template>
  <div class="container">
    <div class="menu">
      <div class="menu-itens">
        <div class="menu-logokurier">
          <img style="width:150px;" src="../assets/logo-soluções-negativo.png" alt="logo kurier" />
        </div>
        <div class="menu-direito-rapido">
          <div>
            <router-link v-show="this.$route.path != '/modulo'" class="linkFastStyle" tag ="p" :to="{name: 'alerta-juridico'}">Alerta Jurídico</router-link>
            <router-link v-show="this.$route.path != '/modulo'" class="linkFastStyle"  tag ="p" :to="{name: 'consulta-acoes'}">Ações</router-link>
            <router-link v-show="this.$route.path != '/modulo'" class="linkFastStyle" tag ="p" :to="{name: 'passivo-juridico'}">Passivo Jurídico</router-link>
            <router-link v-show="this.$route.path != '/modulo'" class="linkFastStyle" tag ="p" :to="{name: 'consulta-preditivo'}">Preditivo</router-link> 
          </div>
          <div class="menu-esquerdo" @click="iterarMenuUsuario">
            
            <img style="width:35px" src="../assets/icons/07.png" alt="perfil usuário" />
            <div class="menu-esquerdo-usuario">
              <p>{{$store.getters.nomeUsuario.toLowerCase()}}</p>
            </div>
            <div>
              <img class="menu-esquerdo-seta" src="../assets/setaMenuLateral.png" alt="seta" />
            </div>
            <div class="menu-itens-esquerdo-usuario" :class="nomeClassAbrirMenuUsuario">
              <ul>
                <router-link class="menu-itens-esquerdo-usuario-configuracao" to="/modulo" tag="li">
                  Inicio
                  <img src="../assets/icons/02.png" alt="mini ampulheta" />
                </router-link>
                <router-link
                  class="menu-itens-esquerdo-usuario-configuracao"
                  to="/historico"
                  tag="li"
                >
                  Histórico de pesquisa
                  <img src="../assets/icons/03.png" alt="mini ampulheta" />
                </router-link>
                <li class="menu-itens-esquerdo-usuario-configuracao">
                  Configuração
                  <img src="../assets/icons/04.png" alt="mini engrenagem" />
                </li>
                <li @click="sair">Sair</li>
              </ul>
            </div>
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
      nomeClassAbrirMenuUsuario: ""
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
      this.$router.push({name: 'login'});
    }
  }
};
</script>
<style scoped>
p{
  margin: 0px;
}
.menu-direito-rapido{
  display: flex;
  align-items: center;
  width: 550px;
  justify-content: space-between;
}
.menu-direito-rapido div:nth-child(1){
margin-top: 8px;
  width:490px;
  display: flex;
  align-items: center;
}

.linkFastStyle{
  padding: 10px;
  color: white;
  transition: all 0.4s;
  cursor: pointer;
  
}
.linkFastStyle:hover{
  transform: scale(1.1);
  text-decoration: underline;
}
img {
  width: 20px;
}
.menu {
  max-width: 100vw;
  height: 56px;
  background-color: #001a3f;
}
.menu-itens {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: calc(100% - 100px);
  margin: 0 auto;
}

.menu-esquerdo {
  display: flex;
  position: relative;
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
  width: 199px;
  height: 137px;
  top: 38px;
  right: 0px;
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
  /* padding: 2px; */
  margin: 0;
  cursor: pointer;
}
.menu-itens-esquerdo-usuario > ul li:hover {
  background-color: #001a3ff1;
  color: white;
}

.menu-itens-esquerdo-usuario > ul li:active {
  background-color: #001a3fb0;
  color: white;
}
.menu-itens-esquerdo-usuario > ul li {
  text-align: right;
  padding-top: 3px;
  height: 30px;
}
.menu-itens-esquerdo-usuario > ul li:nth-child(3) {
  border-bottom: 1px solid #0415203b;
}

.menu-itens-esquerdo-usuario > ul li:nth-child(4) {
  padding-right: 30px;
}
.menu-itens-esquerdo-usuario-configuracao > img {
  margin-top: -4px;
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
