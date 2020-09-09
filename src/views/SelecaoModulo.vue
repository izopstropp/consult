<template>
  <div class="container-selecao">
    <div v-if="paginaCarregada" class="container-selecao-item">
      <img
        style="width:250px; margin: 0 auto; display:flex; margin-bottom:40px;"
        src="../assets/logo-soluções-color.png"
        alt
      />
      <div class="selecao-titulo">
        <p>Selecione uma opção:</p>
      </div>
      <div class="selecao-botao">
        <div
          @mouseover="alertaJuridicoAtivado = true"
          @mouseleave="alertaJuridicoAtivado = false"
          class="btn-acao"
        >
          <router-link tag="a-button" :to="{name:'alerta-juridico'}">
            <div class="botao-imagem-info">
              <div>
                <img v-if="!alertaJuridicoAtivado" src="../assets/icons/alerta-juridico.png" alt />
                <img v-else src="../assets/icons/alerta-juridico-branco.png" alt />
                <span v-if="qtdNovosAlertasJuridicos > 0" class="qtdAlertaJuridico">{{qtdNovosAlertasJuridicos}}</span>
              </div>
              <div>
                <p>Alerta Jurídico</p> 
              </div>
            </div>
          </router-link>
        </div>
        <div
          @mouseover="passivoJuridicoAtivado = true"
          @mouseleave="passivoJuridicoAtivado = false"
          class="btn-acao"
        >
          <router-link tag="a-button" :to="{name:'passivo-juridico'}">
            <div class="botao-imagem-info">
              <div>
                <img v-if="!passivoJuridicoAtivado" src="../assets/icons/passivo-juridico.png" alt />
                <img v-else src="../assets/icons/passivo-juridico-branco.png" alt />
              </div>
              <div>
                <p>Passivo Jurídico</p>
              </div>
            </div>
          </router-link>
        </div>
        <div @mouseover="acoesAtivado = true" @mouseleave="acoesAtivado = false" class="btn-acao">
          <router-link tag="a-button" :to="{name:'consulta-acoes'}">
            <div class="botao-imagem-info">
              <div>
                <img v-if="!acoesAtivado" src="../assets/icons/acoes.png" alt />
                <img v-else src="../assets/icons/acoes-branco.png" alt />
              </div>
              <div>
                <p>Ações</p>
              </div>
            </div>
          </router-link>
        </div>
        <div
          @mouseover="preditivoAtivado = true"
          @mouseleave="preditivoAtivado = false"
          class="btn-acao"
        >
          <router-link tag="a-button" :to="{name:'consulta-preditivo'}">
            <div class="botao-imagem-info">
              <div>
                <img v-if="!preditivoAtivado" src="../assets/icons/preditivo.png" alt />
                <img v-else src="../assets/icons/preditivo-branco.png" alt />
              </div>
              <div>
                <p>Preditivo</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <!-- <div class="selecao-confirma">
        <router-link class="btn-selecao-confirmar" :to="{ name: nameRouterLink }">Confirmar</router-link>
      </div>-->
    </div>
  </div>
</template>
<script>
import alertaJuridicoApi from "../api/consultAlertaJuridico.js"
export default {
  data() {
    return {
      nameRouterLink: "consulta-acoes",
      paginaCarregada: false,
      alertaJuridicoAtivado: false,
      passivoJuridicoAtivado: false,
      acoesAtivado: false,
      preditivoAtivado: false,
      qtdNovosAlertasJuridicos: 0
    };
  },
  mounted() {
    this.paginaCarregada = true;
    this.carregarQtdNovosAlertasJuridicos()
  },
  methods: {
    carregarQtdNovosAlertasJuridicos(){
       alertaJuridicoApi.solicitarQtdNovosAlertas().then(response => {
        if(response.status == 200){
          this.qtdNovosAlertasJuridicos =  response.data.Content
        }
      })
    }
  },
};
</script>
<style scoped>
p {
  margin: 0;
}
.container-selecao {
  /* height: 100vh; */
}
.container-selecao-item {
  margin: 80px auto auto auto;
  width: 43%;
  animation: fadeOut 0.9s;
}
@keyframes fadeOut {
  from {
    opacity: 0;
    margin-top: 60px;
  }
  to {
    opacity: 1;
    /* margin-top: 17px; */
  }
}
.selecao-titulo {
  margin-bottom: 12px;
}
@media screen and (max-width: 700px) {
  .selecao-titulo {
    display: flex;
    justify-content: center;
  }
}
.selecao-titulo > p {
  /* text-align: center; */
  font-size: 1.3em;
  font-weight: bold;
  opacity: 0.9;
}
.selecao-botao {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  height: 200px;

  justify-content: space-between;
  /* border-color: #aaaaaa; */
}

@media screen and (max-width: 700px) {
  .selecao-botao {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    max-width: 409px;
    justify-content: center;
    /* border-color: #aaaaaa; */
  }
}
.btn-acao {
}

.botao-imagem-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 130px;
  position: relativo;
}
.botao-imagem-info img {
  padding-top: 30px;
  width: 43px;
}

.btn-acao .ant-btn:hover {
  background-color: #022350 !important;
  opacity: 0.9;

  color: white;
  -webkit-box-shadow: 9px 9px 5px -2px rgba(0, 0, 0, 0.39);
  -moz-box-shadow: 9px 9px 5px -2px rgba(0, 0, 0, 0.39);
  box-shadow: 9px 9px 5px -2px rgba(0, 0, 0, 0.39);
}

.btn-acao {
  width: 24%;
}
@media screen and (max-width: 700px) {
  .btn-acao {
    width: 124px;
    border: 1px solid pink;
  }
}
.btn-acao .ant-btn {
  width: 100%;
  /* height: 40%; */
  background-color: rgba(194, 190, 190, 0.253);
  border: none;
}

.btn-acao .ant-btn {
  font-size: 0.9em;
  /* width: 124px; */
}
.selecao-confirma {
  margin-top: 38px;
}
.btn-selecao-confirmar {
  display: block;
  width: 148px;
  height: 33px;
  margin: 0 auto;
  text-align: center;
  background-color: #001a3f;
  color: #cfd5dc;
  padding-top: 7px;
  font-size: 0.9em;
  border-radius: 2px;
}
.ant-btn {
  /* width: 157px; */
  height: 87%;
  color: #1a1919a9;
  transition: none !important;
}

.color-backgroud-azul {
  background-color: #001a3f;
  color: #cfd5dc;
}
.btn-selecao-confirmar:active {
  background-color: #052f6b;
}
.qtdAlertaJuridico {
  width: 15px;
  background-color: rgba(187, 7, 7, 0.829);
  color: white;
  border-radius: 2px;
  position: absolute;
  top: 48px;
  right: calc(100% - 63%);
}
</style>
