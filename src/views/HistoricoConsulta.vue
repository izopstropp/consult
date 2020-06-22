<template>
  <div class="his-bl">
    <div class="his-bl-block">
      <div class="his-bl-titulo">HISTÓRICO DE CONSULTAS</div>
      <div class="his-bl-table">
        <table>
          <thead>
            <th>
              Nº Identificação
            </th>
            <th>
              Data
            </th>
            <th>
              Tipo de consulta
            </th>
            <th>
              Valor
            </th>
          </thead>
          <tbody>
            <template v-for="(item, index) in dadosHistorico">
              <tr :key="index">
                <td>{{ item.identificacao }}</td>
                <td>{{ item.data }}</td>
                <td>{{ item.tipoConsulta }}</td>
                <td>{{ item.valor }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "HistoricoConsulta",
  data() {
    return {
      dadosHistorico: [
        {
          identificacao: "123",
          data: "19/06/2020",
          tipoConsulta: "açõe",
          valor: "R$ 110,00",
        },
        {
          identificacao: "123",
          data: "19/06/2020",
          tipoConsulta: "açõe",
          valor: "R$ 110,00",
        },
        {
          identificacao: "123",
          data: "19/06/2020",
          tipoConsulta: "açõe",
          valor: "R$ 110,00",
        },
      ],
    };
  },
};
</script>
<style scoped>
.his-bl-titulo {
  margin: 0 auto;
  width: 270px;
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 65px;
  margin-bottom: 68px;
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
