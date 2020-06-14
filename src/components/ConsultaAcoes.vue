<template>
  <div class="container-Consulta">
    <div class="container-titulo">
      <p>CONSULTAR AÇÕES</p>
    </div>
    <div class="Consulta-formulario-line">
      <div class="Consulta-form-input">
        <p>Nome</p>
        <a-input />
      </div>
      <div class="Consulta-form-input">
        <p>CPF/CNPJ</p>
        <a-input />
      </div>
    </div>
    <div class="Consulta-formulario-line">
      <div class="Consulta-form-input">
        <a-checkbox class="Consulta-form-checkbox"
          >O nome possui sigla?</a-checkbox
        >
        <a-input />
      </div>
      <div class="Consulta-form-input">
        <p style="margin-bottom:8px">UF</p>
        <a-select mode="tags" style="width: 320px">
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
    <!-- <div class="Consulta-formulario-line">
      
    </div> -->
    <div class="Consulta-formulario-line">
      <!-- <div class="Consulta-form-input"></div> -->
      <div class="Consulta-form-select">
        <a-radio-group name="radioGroup" :default-value="1">
          <a-radio :value="1">PF</a-radio>
          <a-radio :value="2">PJ</a-radio>
        </a-radio-group>
        <a-select style="width: 100px" default-value="Justiça">
          <a-select-option value="ESTADUAL">Estadual</a-select-option>
          <a-select-option value="FEDERAL">Federal</a-select-option>
          <a-select-option value="TRABALHISTA">Trabalhista</a-select-option>
        </a-select>
        <a-select default-value="Partes" style="width: 100px">
          <a-select-option value="REU">Estadual</a-select-option>
          <a-select-option value="AUTOR">Federal</a-select-option>
        </a-select>
        <div style="width:312px">
          <p>Data de distribuição</p>
          <div class="Consulta-form-calender">
            <a-month-picker
              format="MM/YYYY"
              class="Consulta-form-calender-item"
              placeholder="Mês / Ano"
            />
            <a-month-picker
              format="MM/YYYY"
              class="Consulta-form-calender-item"
              placeholder="Mês / Ano"
            />
          </div>
        </div>
      </div>
      <a-button class="Consulta-form-btn">Consultar</a-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
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
.Consulta-formulario-line {
  display: flex;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  margin: 0 auto 21px auto;
  max-width: 674px;
  justify-content: space-between;
}
.Consulta-formulario-line .Consulta-form-input {
  width: 323px;
  padding: 0;
  margin: 0;
}
.Consulta-formulario-line .Consulta-form-input p {
  margin-bottom: 5px;
}
.Consulta-form-checkbox {
  margin-bottom: 8px;
}
.Consulta-form-select {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  width: 674px;
}
.Consulta-form-calender {
  display: flex;
  max-width: 490px;
  justify-content: space-between;
}
.Consulta-form-calender-item {
  /* margin-right: 50px; */
  max-width: 150px;
}
.Consulta-form-btn {
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
</style>
