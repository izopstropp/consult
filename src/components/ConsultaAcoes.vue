<template>
  <div class="container-Consulta">
    <div class="container-titulo">
      <p>CONSULTAR AÇÕES</p>
    </div>
    <div class="consulta-formulario-line">
      <div class="consulta-form-input">
        <p>Nome</p>
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
    <div class="consulta-formulario-line">
      <div class="consulta-form-input">
        <a-checkbox
          v-model="parametrosConsulta.possuiSigla"
          class="consulta-form-checkbox"
          @click="resetarInputSigla"
          >O nome possui sigla?</a-checkbox
        >
        <a-input
          @click="resetarInputSigla"
          :class="[!siglaValidado ? 'erroInput' : 'erroResetInput']"
          v-model="parametrosConsulta.sigla"
          :disabled="!parametrosConsulta.possuiSigla"
        />
        <p v-if="!siglaValidado" style="color:red">
          Preencha o campo corretamente
        </p>
      </div>
      <div class="consulta-form-input">
        <p style="margin-bottom:8px">UF</p>
        <a-select
          v-model="parametrosConsulta.uf"
          mode="multiple"
          style="width: 340px"
        >
          <a-select-option value=" Todas">Todas</a-select-option>
          <a-select-option value="AC">AC</a-select-option>
          <a-select-option value="AL">AL</a-select-option>
          <a-select-option value="AP">AP</a-select-option>
          <a-select-option value="AM">AM</a-select-option>
          <a-select-option value="BA">BA</a-select-option>
          <a-select-option value="CE">CE</a-select-option>
          <a-select-option value="DF">DF</a-select-option>
          <a-select-option value="ES">ES</a-select-option>
          <a-select-option value="GO">GO</a-select-option>
          <a-select-option value="MA">MA</a-select-option>
          <a-select-option value="MT">MT</a-select-option>
          <a-select-option value="MS">MS</a-select-option>
          <a-select-option value="MG">MG</a-select-option>
          <a-select-option value="PA">PA</a-select-option>
          <a-select-option value="PB">PB</a-select-option>
          <a-select-option value="PR">PR</a-select-option>
          <a-select-option value="PE">PE</a-select-option>
          <a-select-option value="PI">PI</a-select-option>
          <a-select-option value="RJ">RJ</a-select-option>
          <a-select-option value="RN">RN</a-select-option>
          <a-select-option value="RS">RS</a-select-option>
          <a-select-option value="RO">RO</a-select-option>
          <a-select-option value="RR">RR</a-select-option>
          <a-select-option value="SC">SC</a-select-option>
          <a-select-option value="SP">SP</a-select-option>
          <a-select-option value="SE">SE</a-select-option>
          <a-select-option value="TO">TO</a-select-option>
        </a-select>
      </div>
    </div>
    <!-- <div class="consulta-formulario-line">
      
    </div>-->
    <div class="consulta-formulario-line">
      <a-radio-group v-model="parametrosConsulta.tipoPessoa" name="radioGroup">
        <a-radio :value="1">PF</a-radio>
        <a-radio :value="2">PJ</a-radio>
      </a-radio-group>
      <div class="consulta-form-select">
        <a-select
          v-model="parametrosConsulta.justica"
          mode="tags"
          style="max-width: 300px; min-width:200px"
          placeholder="Justiça"
        >
          <a-select-option value="ESTADUAL">Estadual</a-select-option>
          <a-select-option value="FEDERAL">Federal</a-select-option>
          <a-select-option value="TRABALHISTA">Trabalhista</a-select-option>
        </a-select>
        <a-select
          v-model="parametrosConsulta.partes"
          mode="tags"
          placeholder="Partes"
          style="width: 160px"
        >
          <a-select-option value="REU">Réu</a-select-option>
          <a-select-option value="AUTOR">Autor</a-select-option>
        </a-select>
        <div style="width:222px">
          <p>Data de distribuição</p>
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
      <a-button @click="consulta" class="consulta-form-btn">Consultar</a-button>
    </div>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";
export default {
  name: "consulta-acoes",
  directives: { mask },
  data() {
    return {
      parametrosConsulta: {
        nome: "",
        documento: "",
        possuiSigla: false,
        sigla: "",
        uf: [],
        tipoPessoa: "",
        justica: [],
        partes: [],
        dataDistribuicaoInicial: "",
        dataDistribuicaoFinal: "",
      },
      nomeValidado: true,
      siglaValidado: true,
    };
  },
  methods: {
    consulta() {
      this.validar();
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
.container-Consulta {
  margin-top: 104px;
}

.container-titulo {
  margin-bottom: 30px;
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
  margin: 0 auto 21px auto;
  max-width: 694px;
  justify-content: space-between;
}
.consulta-formulario-line .consulta-form-input {
  max-width: 340px;
  padding: 0;
  margin: 0;
}
.consulta-formulario-line .consulta-form-input p {
  margin-bottom: 2px;
}
.consulta-form-checkbox {
  margin-bottom: 8px;
}
.consulta-form-select {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  width: 694px;
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
  height: 33px;
  color: #edf0f2;
}
.ant-btn:active {
  background-color: #001a3f81;
}
p {
  color: #676767;
}
</style>
