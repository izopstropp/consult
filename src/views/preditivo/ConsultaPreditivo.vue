<template>
  <div class="container">
    <div v-if="solicitarPred" @click="fecharModal" class="modal">
      <transition appear name="slide-resul-volum">
        <div class="modal-container">
          <div class="fecharModal" @click="fecharModalClick">
            <p>X</p>
          </div>
          <img src="../../assets/confir-envio.png" alt="imagem de confirmação" />
          <p>Sua pesquisa</p>
          <p>{{nucmeracaoConsultaFormatada}}</p>
          <p>será enviada para seu e-mail dentro de alguns minutos</p>
        </div>
      </transition>
    </div>
    <div class="titulo">
      <p>CONSULTAR DE PREDITIVO</p>
    </div>
    <div class="bl-processo">
      <div class="input-processo">
        <div class="titulo-processo">
          <p>Número do Processo (NPU)</p>
        </div>
        <textarea
          :class="[npuInvalido || semNpu ? 'borderColorRed':'']"
          @focus="[npuInvalido = false, semNpu = false]"
          v-model="npus"
          id
          cols="30"
          rows="2"
          wrap="on"
        ></textarea>
        <p class="aviso-input">NPU deve seguir o padrão com "-" e ".".</p>
        <p v-if="npuInvalido" style="color:red">Numeração processual inválida.</p>
        <p v-if="semNpu" style="color:red">É necessário que possua no mínimo 1 npu.</p>
      </div>
    </div>
    <div class="grid-processo">
      <p>Listagem dos Processos</p>
      <div class="his-bl-table">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Qt de Processos</th>
              <th>R$</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Preditivo</td>
              <td>{{qtdProcessos}}</td>
              <td>{{valorTotal}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="btn-solic-pred" @click="solicitarPreditivo">
        <a>solicitar preditivo</a>
      </div>
    </div>
    <notifications
      classes="style-notification"
      group="general"
      position="bottom center"
      :ignoreDuplicates="true"
      animation-name="v-fade-left"
    />
  </div>
</template>
<script>
import consultProcessosApi from "../../api/consultProcessosApi.js";
export default {
  name: "ConsultaPreditivo",
  data() {
    return {
      consultaId:"",
      npus: "",
      npuInvalido: false,
      semNpu: false,
      solicitarPred: false
    };
  },
  computed: {
     nucmeracaoConsultaFormatada(){
      return ("0000000" + this.consultaId ).slice(-7)
    },
    npuFormatados() {
      var re = /\s+/;
      return this.npus.split(re).filter(y => y != null && y != "");
      //
    },
    qtdProcessos() {
      if (this.npus[0]) return this.npuFormatados.length;
      return 0;
    },
    valorTotal() {
      return this.qtdProcessos * 7;
    }
  },
  beforeMount() {
    this.npus = "";
  },
  methods: {
    fecharModal(event) {
      if (event.target === event.currentTarget) {
        this.fecharModalClick();
      }
    },
    fecharModalClick() {
      this.solicitarPred = false;
      this.npus = "";
    },
    solicitarPreditivo() {
      if (this.npus !== "") {
        if (this.validarNpus()) {
          consultProcessosApi.enviarSolicitacaoPreditivo({"NPUs": this.npuFormatados}).then(response =>{
              if (response.status == 200) {
                  this.consultaId = response.data.Content
                  this.solicitarPred = true;
            }else {
              this.$notify({
                group: "general",
                title:
                  "Ocorreu um erro inesperado, tente novamente em alguns instantes.",

                duration: 5000,

                speed: 700
              });
              this.realizandoRequisicaoFiltro = false;
            }
          })

        } else {
          this.npuInvalido = true;
        }
      } else {
        this.semNpu = true;
      }
    },
    validarNpus() {
      let patern = /\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}/;
      let paternEspecial = /[@!,#$%^&*()/\\]/;
      let paternLetra = /[a-zA-z]/;
      let npusValidados = this.npuFormatados.filter(
        y =>
          y.match(patern) && !y.match(paternEspecial) && !y.match(paternLetra)
      );

      // console.log(qtdEspecial);
      if (npusValidados.length == this.qtdProcessos) {
        console.log(npusValidados.length + " = " + this.qtdProcessos);
        return true;
      }
      return false;
    }
  }
};
</script>
<style scoped>
p {
  margin: 0;
}
a {
  text-decoration: none;
  color: rgb(197, 193, 193);
}
.container {
  margin: 0 auto;
  max-width: 1480px;
  animation: fadeOut 0.3s;
}
@keyframes fadeOut {
  from {
    opacity: 0;
    margin-top: -10px;
  }
  to {
    opacity: 1;
    /* margin-top: 17px; */
  }
}
.titulo {
  text-align: center;
  margin-top: 65px;
}
.titulo p {
  font-size: 1.5em;
  font-weight: bold;
}
.bl-processo {
  margin-top: 44px;
}
.input-processo {
  max-width: 200px;
  margin: 0 auto;
}
.titulo-processo > p {
  color: rgb(124, 124, 124);
  font-size: 0.9em;
  margin-bottom: 10px;
}
textarea::-webkit-scrollbar {
  width: 3px;
}

textarea::-webkit-scrollbar-thumb {
  background: #1d375c;
}
textarea {
  outline: none;
  border-color: rgb(197, 193, 193);
  padding: 10px;
  /* resize: none; */
}
.input-processo > input {
  height: 200px;
}
.aviso-input {
  color: rgb(161, 158, 158);
  font-size: 0.7em;
}
.grid-processo {
  margin-top: 60px;
  text-align: center;
}
.grid-processo {
  margin-top: 60px;
  text-align: center;
}
.grid-processo p {
  text-align: center;
  margin-left: -520px;
  margin-bottom: 5px;
  font-size: 0.9em;
  font-weight: bold;
}
.his-bl-table {
  display: flex;
}

table {
  width: 665px;
  margin: 0 auto;
}
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
  border-color: #a8b2c0;
  padding: 5px;
  font-size: 0.9em;
  text-align: center;
}
th:nth-child(1) {
  width: 300px;
}
th:nth-child(2) {
  width: 200px;
}
th {
  text-align: center;
  height: 33px;
  background-color: #1d375c;
  color: rgb(197, 193, 193);
}
.btn-solic-pred {
  height: 34px;
  width: 148px;
  font-size: 0.9em;
  background-color: #001a3f;
  text-align: center;
  padding-top: 7px;
  cursor: pointer;
  margin: 62px auto;
}
.btn-solic-pred:active {
  background-color: #052f6b;
}
.borderColorRed {
  border-color: red;
}
.slide-resul-volum-enter-active {
  transition: all 0.9s ease;
  z-index: 1;
}
.slide-resul-volum-enter, .slide-resul-volum-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}
.modal::before {
  content: "";
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.644);
  /* background: url("../assets/back-desf.png") no-repeat; */
  z-index: 1;
}
.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  padding: 80px;
}
.modal-container {
  position: relative;
  background-color: #ffffff;
  text-align: center;
  margin-top: 100px;
  width: 646px;
  height: 349px;
  z-index: 2;
  border-radius: 4px;
}
.modal-container {
  line-height: 4em;
}
.fecharModal {
  position: absolute;
  top: -4px;
  right: 6px;
  color: #001a3f;
  font-size: 2.3em;
  width: 30px;
  cursor: pointer;
}
.modal-container img:nth-child(2) {
  margin-top: 38px;
}
.modal-container p:nth-child(3),
.modal-container p:nth-child(5) {
  font-size: 1.5em;
  font-weight: bold;
  color: #595959;
}
.modal-container p:nth-child(4) {
  font-size: 3.7em;
  color: #668464;
}
.modal-container p:nth-child(6) {
  background-color: #001a3f;
  margin: 10px auto;
  width: 416px;
  height: 36px;
  color: #c4cad2;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
/* --- fim modal -- */
</style>
