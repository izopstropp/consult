<template>
  <div class="aj-container">
    <p class="aj-titulo">ALERTAS DE MONITORAMENTO</p>
    <div class="aj-bl1">
      <div>
        <p>Filtrar pelo termo:</p>
        <a-input class="aj-filtro"></a-input>
      </div>
      <div>
        <a-button @click="test" class="ant-btn">Obter dados selecionados</a-button>
      </div>
    </div>
    <div class="aj-bl2">
      <p>
        Você possui
        <span class="color-red">{{qtdDadosNaoObtidos}}</span> novo alerta!
      </p>
      <p>
        <a-checkbox v-model="selecinarTodos">Selecionar todos</a-checkbox>
      </p>
    </div>
    <table>
      <thead>
        <th>Termo Monitorado</th>
        <th>Data do Alerta</th>
        <th style="width: 290px">Descrição do Alerta</th>
        <th>Obter Dados</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in listaAlerta" :key="index">
          <td>{{item.termoMonitorado}}</td>
          <td>{{item.dataAlerta}}</td>
          <td
            :class="[!item.dadosObtidos ? 'color-red':'text-align-left padding-left-20']"
          >{{item.descricaoAlerta ? item.descricaoAlerta : "Acesse Aqui"}}</td>
          <td style="width:90px">
            <a-checkbox v-model="item.obterDados" v-if="!item.dadosObtidos"></a-checkbox>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "alertaMonitoramento",
  computed: {
    qtdDadosNaoObtidos() {
      return this.listaAlerta.filter((x) => x.dadosObtidos === false).length;
    },
  },
  watch: {
    selecinarTodos: {
      handler() {
        this.listaAlerta
          .filter((x) => x.dadosObtidos === false)
          .map((y) => (y.obterDados = this.selecinarTodos));
      },
    },
  },
  data() {
    return {
      selecinarTodos: false,
      listaAlerta: [
        {
          termoMonitorado: "americanas",
          dataAlerta: "12/01/2010",
          descricaoAlerta: "",
          dadosObtidos: false,
          obterDados: false,
          novoItem: false,
        },
        {
          termoMonitorado: "americanas",
          dataAlerta: "12/01/2010",
          descricaoAlerta: "",
          dadosObtidos: false,
          obterDados: false,
          novoItem: false,
        },
        {
          termoMonitorado: "americanas",
          dataAlerta: "12/01/2010",
          descricaoAlerta:
            "Foram encontrados 5 novos processos. Justiça: 2 Estadual, 3 Federal, 4 Trabalhista. Partes: 5 Réu, 2 Autor",
          dadosObtidos: true,
          obterDados: false,
          novoItem: false,
        },
      ],
    };
  },
  methods: {
    test() {
      let listaAlerta2 = [
        {
          termoMonitorado: "NOVO",
          dataAlerta: "12/01/2010",
          descricaoAlerta: "NOVO",
          dadosObtidos: false,
          obterDados: false,
          novoItem: false,
        },
      ];

      let r1 = listaAlerta2;
      let r2 = this.listaAlerta;
      let r3 = r1.filter((a) => !r2.includes(a));
      console.log(r3);
      r3.map((y) => this.listaAlerta.unshift(y));
    },
  },
};
</script>
<style scoped>
p {
  margin: 0px;
}
/* *{
    border: 1px solid red;
} */
.aj-container {
  margin: 0 auto;
  max-width: 1000px;
}
.aj-titulo {
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 65px;
  margin-bottom: 80px;
}
.aj-bl1 {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
}
.aj-filtro {
  width: 300px;
}
.ant-btn {
  background-color: #1d375c;
  height: 35px;
  color: #c1c8d1;
  border: none;
}

.ant-btn:active {
  background-color: #001a3f81;
}
.aj-bl2 {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}
.color-red {
  color: rgba(187, 7, 7, 0.657);
  font-weight: bold;
}
.text-align-left {
  text-align: left;
}
.padding-left-20 {
  padding-left: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
table,
th,
td {
  border: 1px solid #a8b2c0;
  text-align: center;
}
th {
  height: 32px;
  background-color: #1d375c;
  color: white;
  font-size: 0.9em;
}
td {
  height: 60px;
}
</style>