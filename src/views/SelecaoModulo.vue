<template>
  <div class="container-selecao">
    <div v-if="paginaCarregada" class="container-selecao-item">
      <div class="selecao-titulo">
        <p>Qual opção você deseja consultar?</p>
      </div>
      <div class="selecao-botao">
        <div class="btn-acao">
          <a-button
            @click="ativarBotao(3)"
            style="border-right:none; border-bottom:none; border-radius: 5px 0px 0px 0px !important;"
            :class="[
              btnAlertaJuridicoAtivado ? 'color-backgroud-azul' : '',
            ]"
          >
            Alerta Jurídico
            <span class="qtdAlertaJuridico">2</span>
          </a-button>
        </div>
        <div class="btn-acao">
          <a-button
            @click="ativarBotao(4)"
            style="border-bottom: none; border-radius: 0px 5px 0px 0px !important;"
            :class="[
              btnPassivoJuridicoAtivado ? 'color-backgroud-azul' : ''
            ]"
          >Passivo Jurídico</a-button>
        </div>
        <div class="btn-acao">
          <a-button
            @click="ativarBotao(1)"
            style="border-right:none; border-radius: 0px 0px 0px 5px !important;"
            :class="[
              btnAcaoAtivado ? 'color-backgroud-azul' : ''
            ]"
          >Ações</a-button>
        </div>
        <div class="btn-acao">
          <a-button
            @click="ativarBotao(2)"
            style="border-radius: 0px 0px 5px 0px !important;"
            :class="[
              btnPreditivoAtivado ? 'color-backgroud-azul' : '',
            ]"
          >Preditivo</a-button>
        </div>
      </div>
      <div class="selecao-confirma">
        <router-link class="btn-selecao-confirmar" :to="{ name: nameRouterLink }">Confirmar</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      btnAcaoAtivado: true,
      btnPreditivoAtivado: false,
      btnAlertaJuridicoAtivado: false,
      btnPassivoJuridicoAtivado: false,
      nameRouterLink: "consulta-acoes",
      paginaCarregada: false,
    };
  },
  mounted() {
    this.paginaCarregada = true;
  },
  methods: {
    ativarBotao(btn) {
      if (btn === 1) {
        this.btnAcaoAtivado = true;
        this.btnPreditivoAtivado = false;
        this.btnAlertaJuridicoAtivado = false;
        this.btnPassivoJuridicoAtivado = false;
        this.nameRouterLink = "consulta-acoes";
      } else if (btn === 2) {
        this.btnAcaoAtivado = false;
        this.btnPreditivoAtivado = true;
        this.btnAlertaJuridicoAtivado = false;
        this.btnPassivoJuridicoAtivado = false;
        this.nameRouterLink = "consulta-preditivo";
      } else if (btn === 3) {
        this.btnAcaoAtivado = false;
        this.btnPreditivoAtivado = false;
        this.btnAlertaJuridicoAtivado = true;
        this.btnPassivoJuridicoAtivado = false;
        this.nameRouterLink = "alerta-juridico";
      } else if (btn === 4) {
        this.btnAcaoAtivado = false;
        this.btnPreditivoAtivado = false;
        this.btnAlertaJuridicoAtivado = false;
        this.btnPassivoJuridicoAtivado = true;
        this.nameRouterLink = "passivo-juridico";
      }
    },
  },
};
</script>
<style scoped>
p {
  margin: 0;
}
.container-selecao-item {
  margin: 230px auto auto auto;
  max-width: 500px;
  animation: fadeOut 0.8s;
}
@keyframes fadeOut {
  from {
    opacity: 0;
    margin-top: 216px;
  }
  to {
    opacity: 1;
    /* margin-top: 17px; */
  }
}
.selecao-titulo {
  margin-bottom: 52px;
}
.selecao-titulo > p {
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
}
.selecao-botao {
  display: flex;
  max-width: 314px;
  flex-wrap: wrap;
  margin: 0 auto;
  /* background-color: #001a3f; */
  border-color: #aaaaaa;
}
.btn-acao .ant-btn {
  font-size: 0.9em;
  border-color: #aaaaaa;
}
.esconder-bordar-direita {
  border-right: none;
  border-radius: 5px 0px 0px 5px !important;
}
.esconder-bordar-esquerda {
  border-left: none;
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
  width: 157px;
  height: 43px;
  color: #1a1919a9;
}

.color-backgroud-azul {
  background-color: #001a3f;
  color: #cfd5dc;
}
.ant-btn {
  border-color: #aaaaaa;
  border-radius: 0px;
}
.btn-selecao-confirmar:active {
  background-color: #052f6b;
}
.qtdAlertaJuridico {
  width: 15px;
  background-color: rgba(187, 7, 7, 0.657);
  color: white;
  margin-left: 5px;
  border-radius: 2px;
}
</style>
