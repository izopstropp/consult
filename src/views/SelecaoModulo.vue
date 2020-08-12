<template>
  <div class="container-selecao">
    <div v-if="paginaCarregada" class="container-selecao-item">
      <img style="width:380px; margin: 0 auto; display:flex; margin-bottom:40px;" src="../assets/logo-soluções-color.png" alt="">
      <div class="selecao-titulo">
        <p>Selecione uma opção:</p>
      </div>
      <div class="selecao-botao">
        <div class="btn-acao">
          <router-link
            tag="a-button"
            :to="{name:'alerta-juridico'}"
          >
            Alerta Jurídico
            <span class="qtdAlertaJuridico">2</span>
          </router-link>
        </div>
        <div class="btn-acao">
          <router-link
            tag="a-button"
            :to="{name:'passivo-juridico'}"
          >Passivo Jurídico</router-link>
        </div>
        <div class="btn-acao">
          <router-link tag="a-button" :to="{ name: 'consulta-acoes' }"
          >Ações</router-link>
        </div>
        <div class="btn-acao">
          <router-link
            tag="a-button"
            :to="{name:'consulta-preditivo'}"
          >Preditivo</router-link>
        </div>
      </div>
      <!-- <div class="selecao-confirma">
        <router-link class="btn-selecao-confirmar" :to="{ name: nameRouterLink }">Confirmar</router-link>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nameRouterLink: "consulta-acoes",
      paginaCarregada: false,

    };
  },
  mounted() {
    this.paginaCarregada = true;
  },
  methods: {
    
  },
};
</script>
<style scoped>
p {
  margin: 0;
}
.container-selecao-item {
  margin: 100px auto auto auto;
  max-width: 659px;
  animation: fadeOut 0.8s;
}
@keyframes fadeOut {
  from {
    opacity: 0;
    margin-top: 80px;
  }
  to {
    opacity: 1;
    /* margin-top: 17px; */
  }
}
.selecao-titulo {
  margin-bottom: 12px;
}
.selecao-titulo > p {
  /* text-align: center; */
  font-size: 2em;

}
.selecao-botao {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 659px;
  /* border-color: #aaaaaa; */
}
.btn-acao{
  padding:10px;
}
.btn-acao:hover{
transform: scale3d(1.3);
}
.btn-acao .ant-btn:hover{
  background-color:#001a3f;
  color: white;
  
}
.btn-acao button{
  height: 180px
}
.btn-acao .ant-btn {
  font-size: 0.9em;
  width: 144px;
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
