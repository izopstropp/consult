<template>
  <div class="container">
    <div class="titulo">
      <p>CONSULTAR DE PREDITIVO</p>
    </div>
    <div class="bl-processo">
      <div class="input-processo">
        <div class="titulo-processo">
          <p>Número do Processo (NPU)</p>
        </div>
        <textarea v-model="npus" id cols="30" rows="2" wrap="on"></textarea>
        <p class="aviso-input">NPU deve seguir o padrão com "-" e ".".</p>
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
      <div class="btn-solic-pred">
        <a>solicitar preditivo</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ConsultaPreditivo",
  data() {
    return {
      npus: ""
    };
  },
  computed: {
    npuFormatados() {
      var re = /\s+/;
      return this.npus.split(re);
    },
    qtdProcessos() {
      if (this.npus[0]) return this.npuFormatados.length;
      return 0;
    },
    valorTotal() {
      return this.qtdProcessos * 7;
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
</style>
