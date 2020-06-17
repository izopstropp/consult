<template>
  <div class="container-selecao">
    <div class="container-selecao-item">
      <div class="selecao-titulo">
        <p>Qual opção você deseja consultar?</p>
      </div>
      <div class="selecao-botao">
        <div class="btn-acao">
          <a-button
            @click="ativarBotao(1)"
            :class="[btnAcaoAtivado? 'color-backgroud-azul':'','esconder-bordar-direita']"
          >Ações</a-button>
        </div>
        <div class="btn-acao">
          <a-button
            @click="ativarBotao(2)"
            :class="[btnPreditivoAtivado? 'color-backgroud-azul':'','esconder-bordar-esquerda']"
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
      nameRouterLink: "consulta-acoes"
    };
  },
  methods: {
    ativarBotao(btn) {
      if (btn === 1) {
        this.btnAcaoAtivado = true;
        this.btnPreditivoAtivado = false;
        this.nameRouterLink = "consulta-acoes";
      } else {
        this.btnAcaoAtivado = false;
        this.btnPreditivoAtivado = true;
        this.nameRouterLink = "test";
      }
    }
  }
};
</script>
<style scoped>
p {
  margin: 0;
}
.container-selecao {
  /* position: absolute; */
  /* margin: 100%; */
  /* height: 100vh; */
}
.container-selecao-item {
  margin: 230px auto auto auto;
  max-width: 500px;
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
  max-width: 294px;
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
  border-radius: 0px 5px 5px 0px !important;
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
  width: 147px;
  height: 33px;
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
  background-color: #001a3f81;
}
</style>
