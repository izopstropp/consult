<template>
  <div class="his-bl">
    <div class="his-bl-block">
      <div class="his-bl-titulo">HISTÓRICO DE CONSULTAS</div>
      <div class="his-bl-table">
        <table>
          <thead>
            <th>Nº Identificação</th>
            <th>Data</th>
            <th>Tipo de consulta</th>
            <th>Valor</th>
          </thead>
          <tbody>
            <template v-for="(item, index) in this.dadosHistorico">
              <tr :key="index">
                <td>{{ formatarId(item.ID) }}</td>
                <td>{{ item.DataCriacao }}</td>
                <td>{{ item.TipoConsulta }}</td>
                <td>{{ item.ValorConsulta.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import consultProcessosApi from "../api/consultProcessosApi.js";

export default {
  name: "HistoricoConsulta",

  data() {
    return {
      dadosHistorico: []
    };
  },
  computed: {
  },
  beforeMount(){
    consultProcessosApi.buscarAcoesPorUsuario().then(response => {
      console.log(response)
      if(response.status == 200){
        this.dadosHistorico = response.data.Result.Content
        // this.dadosHistorico.response.data.Content
      }

    })
  },
  methods: {
    formatarId(id){
      return ("0000000" + id.toString().slice(-7))
    }
  },
};
</script>
<style scoped>
.his-bl-titulo {
  margin: 0 auto;
  width: 300px;
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 65px;
  margin-bottom: 68px;
}
.his-bl-table {
  display: flex;
}
table {
  width: 1162px;
  margin: 0 auto;
}
thead {
  font-size: 1.3em;
}
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
  border-color: #a8b2c0;
  padding: 10px;
  font-size: 0.9em;
  text-align: center;
}
th {
  text-align: center;
  height: 73px;
  background-color: #1d375c;
  color: white;
}
</style>
