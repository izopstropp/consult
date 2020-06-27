<template>
  <div class="container-Consulta">
    <div class="container-titulo">
      <p>CONSULTAR AÇÕES</p>
    </div>
    <div class="consulta-formulario-line">
      <div class="consulta-form-input">
        <p>Nome*:</p>
        <a-input
          v-model="parametrosConsulta.nome"
          @click="nomeValidado = true"
          :class="[!nomeValidado ? 'erroInput' : 'erroResetInput']"
          style="width: 340px"
        />
        <p v-if="!nomeValidado" style="color:red">
          Preencha o campo corretamente
        </p>
      </div>
      <div class="consulta-form-input">
        <p>CPF/CNPJ</p>
        <a-input
          v-mask="['###.###.###-##', '##.###.###/####-##']"
          v-model="parametrosConsulta.documento"
          style="width: 340px"
        />
      </div>
    </div>
    <div class="consulta-formulario-line align-items-end">
      <div class="consulta-form-input">
        <a-checkbox
          v-model="parametrosConsulta.possuiSigla"
          class="consulta-form-checkbox"
          @click="resetarInputSigla"
          >O nome possui sigla?</a-checkbox
        >
        <a-input
          @click="resetarInputSigla"
          :class="[
            !siglaValidado ? 'erroInput' : 'erroResetInput',
            'tam-input-340',
          ]"
          v-model="parametrosConsulta.sigla"
          :disabled="!parametrosConsulta.possuiSigla"
        />
        <p v-if="!siglaValidado" style="color:red">
          Preencha o campo corretamente
        </p>
      </div>
      <div class="consulta-form-input">
        <a-select style="width:117px" v-model="parametrosConsulta.tipoPessoa">
          <a-select-option value="pf">Pessoa física</a-select-option>
          <a-select-option value="pj">Pessoa jurídica</a-select-option>
        </a-select>
      </div>
      <div style="width:213px">
        <p style="margin-bottom:4px">Data de distribuição</p>
        <div class="consulta-form-calender">
          <a-month-picker
            format="MM/YYYY"
            class="consulta-form-calender-item"
            placeholder="Mês / Ano"
            v-model="parametrosConsulta.dataDistribuicaoInicial"
          />
          <a-month-picker
            format="MM/YYYY"
            class="consulta-form-calender-item"
            placeholder="Mês / Ano"
            v-model="parametrosConsulta.dataDistribuicaoFinal"
          />
        </div>
      </div>
    </div>

    <!-- <div class="consulta-formulario-line">
      
    </div>-->
    <div class="consulta-formulario-line consulta-form-top-33">
      <div class="consulta-form-input">
        <multiSelect
          style="max-width: 225px"
          nomeCampo="Justiça"
          v-model="dataSetJustica"
        />
        <div class="result alt-input-100">
          <div v-for="(item, index) in dataSetJusticaSelecinado" :key="index">
            <span>{{ item.nome }}</span>
            <span @click="desmarcarItemJustica(item)">
              <small><img src="../assets/minix.png" alt="fechar"/></small>
            </span>
          </div>
        </div>
      </div>
      <div class="consulta-form-input">
        <multiSelect
          style="max-width: 225px;"
          nomeCampo="Partes"
          v-model="dataSetParte"
        />
        <div class="result">
          <div v-for="(item, index) in dataSetParteSelecinado" :key="index">
            <span>{{ item.nome }}</span>
            <span @click="desmarcarItemParte(item)">
              <small><img src="../assets/minix.png" alt="fechar"/></small>
            </span>
          </div>
        </div>
      </div>
      <div class="consulta-form-input">
        <multiSelect
          style="max-width: 225px;"
          nomeCampo="UF"
          v-model="dataSetUf"
        />
        <div class="result">
          <div v-for="(item, index) in dataSetUfSelecinado" :key="index">
            <span>{{ item.nome }}</span>
            <span @click="desmarcarItemUf(item)"
              ><small><img src="../assets/minix.png" alt="fechar"/></small
            ></span>
          </div>
        </div>
      </div>
      <div class="btn-consulta">
        <div>
          <a-button @click="consulta" class="consulta-form-btn"
            >Consultar</a-button
          >
        </div>
        <p>Essa primeira Consulta tem um valor de R$10,00</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";
import multiSelect from "@/components/input/select/multiSelect/MultiConsult.vue";
import { dataSetUf } from "../valuesInput/dataSetUf.js";
import { dataSetJustica } from "../valuesInput/dataSetJustica.js";
import { dataSetParte } from "../valuesInput/dataSetParte.js";
export default {
  name: "consulta-acoes",
  directives: { mask },
  components: {
    multiSelect,
  },
  data() {
    return {
      parametrosConsulta: {
        nome: "",
        documento: "",
        possuiSigla: false,
        sigla: "",
        uf: [],
        tipoPessoa: "pf",
        justica: [],
        partes: [],
        dataDistribuicaoInicial: "",
        dataDistribuicaoFinal: "",
      },
      nomeValidado: true,
      siglaValidado: true,
      dataSetUf: dataSetUf,
      dataSetJustica: dataSetJustica,
      dataSetParte: dataSetParte,
    };
  },
  computed: {
    dataSetJusticaSelecinado() {
      let result = this.dataSetJustica.filter((item) => {
        return item.marcado == true;
      });
      return result;
    },
    dataSetParteSelecinado() {
      let result = this.dataSetParte.filter((item) => {
        return item.marcado == true;
      });
      return result;
    },
    dataSetUfSelecinado() {
      let result = this.dataSetUf.filter((item) => {
        return item.marcado == true;
      });
      return result;
    },
  },
  methods: {
    desmarcarItemJustica(index) {
      this.dataSetJustica.map(function(item) {
        if (item.nome == index.nome) {
          item.marcado = false;
        }
      });
    },
    desmarcarItemParte(index) {
      this.dataSetParte.map(function(item) {
        if (item.nome == index.nome) {
          item.marcado = false;
        }
      });
    },
    desmarcarItemUf(index) {
      this.dataSetUf.map(function(item) {
        if (item.nome == index.nome) {
          item.marcado = false;
        }
      });
    },
    consulta() {
      if (this.validar()) {
        this.$router.push("ResultadoConsultaAcoes");
      }
    },
    validar() {
      let validado = false;
      if (!this.parametrosConsulta.nome) {
        this.nomeValidado = false;
        validado = false;
      }

      if (
        this.parametrosConsulta.possuiSigla &&
        !this.parametrosConsulta.sigla
      ) {
        this.siglaValidado = false;
        validado = false;
      }
      return validado;
    },
    resetarInputSigla() {
      this.parametrosConsulta.sigla = "";
      this.siglaValidado = true;
    },
  },
};
</script>
<style scoped>
p {
  margin: 0;
  font-size: 0.8em;
}
.container-Consulta {
  margin-top: 65px;
}

.container-titulo {
  margin-bottom: 59px;
}
.container-titulo > p {
  margin: 0px;
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
}
.consulta-formulario-line {
  display: flex;
  align-items: unset;
  align-content: center;
  flex-wrap: wrap;
  margin: 0 auto 7px auto;
  max-width: 690px;
  justify-content: space-between;
}
.consulta-formulario-line .consulta-form-input {
  max-width: 340px;
  padding: 0;
  margin: 0;
}
.consulta-formulario-line .consulta-form-input p {
  margin-bottom: 11px;
}
.consulta-form-top-33 {
  margin-top: 33px;
}
.consulta-form-checkbox {
  margin-bottom: 8px;
  font-size: 0.8em;
}
.tam-input-340 {
  width: 340px;
}
.alt-input-100 {
  max-height: 147px;
}
.consulta-form-select {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 694px;
  max-height: 100px;
}
.align-items-end {
  align-items: flex-end;
}
.consulta-form-calender {
  display: flex;
  max-width: 490px;
  justify-content: space-between;
}
.consulta-form-calender-item {
  /* margin-right: 50px; */
  max-width: 100px;
}
.consulta-form-btn {
  margin: 67px auto auto auto;
  font-size: 0.9em;
}
.ant-btn {
  background-color: #001a3f;
  width: 148px;
  height: 35px;
  color: #c1c8d1;
}
.ant-btn:active {
  background-color: #001a3f81;
}
p {
  color: #837878;
}
.result {
  display: flex;
  max-width: 225px;
  flex-wrap: wrap;

  margin-top: 6px;
  /* border: 1px solid red; */
  height: 1px;
}
.result div {
  height: 23px;
  margin-right: 5px;
  border-radius: 100px;
  background-color: #e8ebed;
  font-size: 0.9em;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 5px 5px 8px;
  flex-grow: 0.1;
  font-size: 0.8em;
  margin-top: 3px;
}
.result div span:nth-child(2) {
  margin-top: -2px;
}
.result div span img {
  width: 14px;
  border-radius: 50%;
  margin-left: 2px;
}
.btn-consulta {
  margin: 56px auto;
  /* width: 200px; */
  /* position: absolute; */
  /* padding: 0 auto; */
  /* display: flex; */
  /* top: 470px;
  left: 580px; */
}
.btn-consulta div {
  margin: 0 auto;
  width: 149px;
}
.btn-consulta p {
  margin-top: 3px;
  font-size: 0.7em;
  color: #888888;
}
/* @media only screen and (max-width: 1200px) {
  .btn-consulta {
    left: 470px;
  }
}
@media only screen and (max-width: 969px) {
  .btn-consulta {
    left: 390px;
  }
}
@media only screen and (max-width: 889px) {
  .btn-consulta {
    left: 350px;
  }
}
@media only screen and (max-width: 783px) {
  .btn-consulta {
    left: 280px;
  }
}
@media only screen and (max-width: 736px) {
  .btn-consulta {
    left: 260px;
  }
}
@media only screen and (max-width: 462px) {
  .btn-consulta {
    left: 70px;
    top: 570px;
  }
} */
</style>
