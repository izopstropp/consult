<template>
  <div class="aj-container">
    <p class="aj-titulo">ALERTAS DE MONITORAMENTO</p>
    <div class="aj-bl1">
      <div>
        <p>Filtrar pelo termo:</p>
        <a-input class="aj-filtro"></a-input>
      </div>
      <div>
        <a-button class="ant-btn">Obter dados selecionados</a-button>
      </div>
    </div>
    <div class="aj-bl2">
      <p>
        Você possui
        <span class="color-red">{{qtdDadosNaoObtidos}}</span> novo(s) alerta(s)!
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
        <tr v-for="(item, index) in gerarRegistroPorPagina" :key="index">
          <td>{{item.termoMonitorado}}</td>
          <td>{{item.dataAlerta}}</td>
          <td
            v-if="item.dadosObtidos"
            :class="[!item.dadosObtidos ? 'color-red':'text-align-left padding-left-20']"
          >
            {{item.descricaoFake.qtdProcesso}}
            <br />
            {{item.descricaoFake.justica}}
            <br />
            {{item.descricaoFake.partes}}
            <br />
            {{item.descricaoFake.UF}}
          </td>
          <td v-else :class="[!item.dadosObtidos ? 'link-alert-open':'text-align-left padding-left-20']">
            <p
              @click="[item.descricaoAlerta=item.descricaoFake, item.dadosObtidos = true]"
            >{{item.descricaoAlerta}}</p>
          </td>
          <td style="width:90px">
            <!-- <a-checkbox v-model="item.obterDados" v-if="!item.dadosObtidos"></a-checkbox> -->
            <a-checkbox v-model="item.obterDados"></a-checkbox>
          </td>
        </tr>
      </tbody>
    </table>
    <p style="display: flex; justify-content: flex-end; margin-top: 10px">
      <a-checkbox v-model="selecinarTodos">Selecionar todos</a-checkbox>
    </p>
    <div class="rel-bl1">
      <div>
        <router-link
          :to="{name:'monitoramento-cadastrado'}"
          tag="a-button"
          a-button
          class="ant-btn-green"
        >Consultar meus monitoramentos</router-link>
      </div>
      <div class="rel-bl1-page">
        <div>
          <div class="rel-bl1-page-selec">
            <a-input class="rel-bl1-page-selec-input" :value="this.paginacao.paginaAtual" />
            <p>/{{ totalPage }}</p>
          </div>
          <div class="rel-bl1-page-direc">
            <div
              @click="navegacaoPagina('a')"
              :class="[
                this.paginacao.paginaAtual <= 1? 'page-direct-disable' : '',
                'rel-bl1-page-direc-a',
              ]"
            >
              <p>&lt;</p>
            </div>
            <div
              @click="navegacaoPagina('p')"
              :class="[
                this.paginacao.paginaAtual>= totalPage
                  ? 'page-direct-disable'
                  : '',
                'rel-bl1-page-direc-p',
              ]"
            >
              <p>&gt;</p>
            </div>
          </div>
        </div>
        <div>
          <a-button class="ant-btn">Obter dados selecionados</a-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "alertaMonitoramento",
  data() {
    return {
      selecinarTodos: false,
      paginacao: {
        limiteItensPagina: 7,
        paginaAtual: 1,
      },
      listaAlerta: [
        {
          termoMonitorado: "Ricardo Eletro",
          dataAlerta: "03/08/2020",
          descricaoAlerta: "Acesse Aqui",
          descricaoFake: {
            qtdProcesso: "Foram encontrados 3 novos processos.",
            justica: "Justiça: 2 Estadual; 1 Federal",
            partes: "Partes: 1 Réu; 2 Autor",
            UF: "UF: 2 SP; 1 RJ",
          },
          // "Foram encontrados 1 novo processo. Justiça: 1 Trabalhista. Partes: 1 Réu. UF: 1 SP",
          dadosObtidos: false,
          obterDados: false,
          novoItem: false,
        },
        {
          termoMonitorado: "Americanas",
          dataAlerta: "29/07/2020",
          descricaoAlerta: "Acesse Aqui",
          descricaoFake: {
            qtdProcesso: "Foram encontrados 1 novo processo.",
            justica: "Justiça: 1 Trabalhista",
            partes: "Partes: 1 Réu",
            UF: "UF: 1 SP",
          },
          // "Foram encontrados 1 novo processo. Justiça: 1 Trabalhista. Partes: 1 Réu. UF: 1 SP",
          dadosObtidos: false,
          obterDados: false,
          novoItem: false,
        },
        {
          termoMonitorado: "Ricardo Eletro",
          dataAlerta: "27/07/2020",
          descricaoAlerta: "Acesse Aqui",
          descricaoFake: {
            qtdProcesso: "Foram encontrados 9 novos processos.",
            justica: "Justiça: 2 Estadual; 3 Federal; 4 Trabalhista",
            partes: "Partes: 9 Réu;",
            UF: "UF: 4 SP; 5 BA",
          },
          // "Foram encontrados 1 novo processo. Justiça: 1 Trabalhista. Partes: 1 Réu. UF: 1 SP",
          dadosObtidos: true,
          obterDados: false,
          novoItem: false,
        },
        {
          termoMonitorado: "americanas",
          dataAlerta: "12/01/2010",
          descricaoAlerta: "Acesse Aqui",
          descricaoFake: {
            qtdProcesso: "Foram encontrados 3 novos processos.",
            justica: "Justiça: 2 Estadual; 1 Federal",
            partes: "Partes: 1 Réu; 2 Autor",
            UF: "UF: 2 SP;1 RJ",
          },
          // "Foram encontrados 1 novo processo. Justiça: 1 Trabalhista. Partes: 1 Réu. UF: 1 SP",
          dadosObtidos: true,
          obterDados: false,
          novoItem: false,
        },
        {
          termoMonitorado: "Ricardo Eletro",
          dataAlerta: "24/07/2010",
          descricaoAlerta: "Acesse Aqui",
          descricaoFake: {
            qtdProcesso: "Foram encontrados 2 novos processos.",
            justica: "Justiça: 1 Estadual; 1 Trabalhista",
            partes: "Partes: 1 Réu; 1 Autor",
            UF: "UF: 2 RJ",
          },
          // "Foram encontrados 1 novo processo. Justiça: 1 Trabalhista. Partes: 1 Réu. UF: 1 SP",
          dadosObtidos: true,
          obterDados: false,
          novoItem: false,
        },
        {
          termoMonitorado: "Americanas",
          dataAlerta: "23/07/2010",
          descricaoAlerta: "Acesse Aqui",
          descricaoFake: {
            qtdProcesso: "Foi encontrado 1 novo processo.",
            justica: "Justiça: 1 Trabalhista",
            partes: "Partes: 1 Réu",
            UF: "UF: 1 SC",
          },
          // "Foram encontrados 1 novo processo. Justiça: 1 Trabalhista. Partes: 1 Réu. UF: 1 SP",
          dadosObtidos: true,
          obterDados: false,
          novoItem: false,
        },
        {
          termoMonitorado: "Americanas",
          dataAlerta: "21/07/2010",
          descricaoAlerta: "Acesse Aqui",
          descricaoFake: {
            qtdProcesso: "Foram encontrados 5 novos processos.",
            justica: "Justiça: 3 Federal; 2 Trabalhista",
            partes: "Partes: 5 Réu",
            UF: "UF: 4 PE; 1 SC",
          },
          // "Foram encontrados 1 novo processo. Justiça: 1 Trabalhista. Partes: 1 Réu. UF: 1 SP",
          dadosObtidos: true,
          obterDados: false,
          novoItem: false,
        },
        {
          termoMonitorado: "Ricardo Eletro",
          dataAlerta: "20/07/2010",
          descricaoAlerta: "Acesse Aqui",
          descricaoFake: {
            qtdProcesso: "Foram encontrados 3 novos processos.",
            justica: "Justiça: 1 Estadual; 2 Federal",
            partes: "Partes: 2 Réu; 1 Autor",
            UF: "UF: 3 SP",
          },
          // "Foram encontrados 1 novo processo. Justiça: 1 Trabalhista. Partes: 1 Réu. UF: 1 SP",
          dadosObtidos: true,
          obterDados: false,
          novoItem: false,
        },
        {
          termoMonitorado: "Ricardo Eletro",
          dataAlerta: "16/07/2020",
          descricaoAlerta: "Acesse Aqui",
          descricaoFake: {
            qtdProcesso: "Foram encontrados 3 novos processos.",
            justica: "Justiça: 1 Estadual; 2 Trabalhista",
            partes: "Partes: 3 Réu",
            UF: "UF: 1 SP; 2 BA",
          },
          // "Foram encontrados 1 novo processo. Justiça: 1 Trabalhista. Partes: 1 Réu. UF: 1 SP",
          dadosObtidos: true,
          obterDados: false,
          novoItem: false,
        },
        {
          termoMonitorado: "Americanas",
          dataAlerta: "15/07/2020",
          descricaoAlerta: "Acesse Aqui",
          descricaoFake: {
            qtdProcesso: "Foram encontrados 10 novos processos.",
            justica: "Justiça: 7 Estadual; 1 Federal; 2 Trabalhista",
            partes: "Partes: 8 Réu; 2 Autor",
            UF: "UF: 9 SP; 1 PE",
          },
          // "Foram encontrados 1 novo processo. Justiça: 1 Trabalhista. Partes: 1 Réu. UF: 1 SP",
          dadosObtidos: true,
          obterDados: false,
          novoItem: false,
        },
        {
          termoMonitorado: "Ricardo Eletro",
          dataAlerta: "13/07/2010",
          descricaoAlerta: "Acesse Aqui",
          descricaoFake: {
            qtdProcesso: "Foram encontrados 5 novos processos.",
            justica: "Justiça:  5 Estadual",
            partes: "Partes: 1 Réu",
            UF: "UF: 5 BA",
          },
          // "Foram encontrados 1 novo processo. Justiça: 1 Trabalhista. Partes: 1 Réu. UF: 1 SP",
          dadosObtidos: true,
          obterDados: false,
          novoItem: false,
        },
        {
          termoMonitorado: "Americanas",
          dataAlerta: "09/07/2010",
          descricaoAlerta: "Acesse Aqui",
          descricaoFake: {
            qtdProcesso: "Foram encontrados 3 novos processos.",
            justica: "Justiça: 1 Estadual, 2 Federal",
            partes: "Partes: 2 Réu; 1 Autor",
            UF: "UF: 3 SP",
          },
          // "Foram encontrados 1 novo processo. Justiça: 1 Trabalhista. Partes: 1 Réu. UF: 1 SP",
          dadosObtidos: true,
          obterDados: false,
          novoItem: false,
        },
        {
          termoMonitorado: "Americanas",
          dataAlerta: "08/07/2010",
          descricaoAlerta: "Acesse Aqui",
          descricaoFake: {
            qtdProcesso: "Foi encontrado 1 novo processo.",
            justica: "Justiça: 1 Trabalhista",
            partes: "Partes: 1 Réu",
            UF: "UF: 1 BA",
          },
          // "Foram encontrados 1 novo processo. Justiça: 1 Trabalhista. Partes: 1 Réu. UF: 1 SP",
          dadosObtidos: true,
          obterDados: false,
          novoItem: false,
        },
        {
          termoMonitorado: "americanas",
          dataAlerta: "12/01/2010",
          descricaoAlerta: "Acesse Aqui",
          descricaoFake: {
            qtdProcesso: "Foi encontrado 1 novo processo.",
            justica: "Justiça: 1 Estadual",
            partes: "Partes: 1 Réu",
            UF: "UF: 1 BA",
          },
          // "Foram encontrados 1 novo processo. Justiça: 1 Trabalhista. Partes: 1 Réu. UF: 1 SP",
          dadosObtidos: true,
          obterDados: false,
          novoItem: false,
        },
      ],
    };
  },
  computed: {
    qtdDadosNaoObtidos() {
      return this.listaAlerta.filter((x) => x.dadosObtidos === false).length;
    },
    totalPage() {
      let totalPage = Math.ceil(
        this.listaAlerta.length / this.paginacao.limiteItensPagina
      );
      return totalPage;
    },
    gerarRegistroPorPagina() {
      let registrosPorPagina = [];
      let totalPage = this.totalPage;
      let qtdRegistrosAnteriores =
        this.paginacao.paginaAtual * this.paginacao.limiteItensPagina -
        this.paginacao.limiteItensPagina;
      let qtdRegistroExibicao =
        qtdRegistrosAnteriores + this.paginacao.limiteItensPagina;
      if (this.paginacao.paginaAtual <= totalPage) {
        for (let i = qtdRegistrosAnteriores; i < qtdRegistroExibicao; i++) {
          if (this.listaAlerta[i] != null) {
            registrosPorPagina.push(this.listaAlerta[i]);
          }
        }
      }
      return registrosPorPagina;
    },
  },
  watch: {
    selecinarTodos: {
      handler() {
        this.listaAlerta.map((y) => (y.obterDados = this.selecinarTodos));
      },
    },
  },

  methods: {
    navegacaoPagina(tipo) {
      if (tipo == "p") {
        this.paginacao.paginaAtual++;
      } else {
        this.paginacao.paginaAtual--;
      }
    },
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
  margin: 65px auto;
  max-width: 1000px;
  animation: fadeOut 0.3s;
}
@keyframes fadeOut {
  from {
    opacity: 0;
    margin-top: 50px;
  }
  to {
    opacity: 1;
    /* margin-top: 17px; */
  }
}
.aj-titulo {
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
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
.ant-btn-green {
  background-color: #648362 !important;
  height: 35px;
  color: #c1c8d1;
  border: none;
}
.ant-btn-green:active {
  background-color: #83a081 !important;
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
  text-decoration: underline;
  font-weight: bold;
}
.link-alert-open{
  color: rgba(31, 29, 29, 0.863);
  text-decoration: underline;
  font-weight: bold;
  cursor: pointer;
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
.rel-bl1 {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 100px;
}
.rel-bl1-page {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  /* max-width: 200px;  */
  width: 420px;
  /* width: 50px; */
  /* flex: 2; */
}
.rel-bl1-page > div {
  display: flex;
  width: 190px;
  justify-content: space-between;
}
.rel-bl1-page-selec {
  display: flex;
  align-items: center;
}
.rel-bl1-page-selec-input {
  width: 51px;
  height: 31px;
  font-size: 1.2em;
  text-align: center;
}
.rel-bl1-page-selec > p {
  font-size: 1.2em;
  margin-left: 10px;
}
.rel-bl1-page-direc-bottom p {
  font-size: 1.2em;
  margin-left: 10px;
}

.page-direct-disable {
  background-color: #edf0f2 !important;
  pointer-events: none;
  cursor: default;
}
.rel-bl1-page-direc {
  display: flex;
  width: 86px;
  justify-content: space-between;
}
.rel-bl1-page-direc-bottom {
  display: flex;
  margin-top: 34px;
  max-width: 1480px;
  justify-content: flex-end;
}
.rel-bl1-page-direc-bottom-itens {
  display: flex;
  justify-content: space-between;
  width: 86px;
}
.rel-bl1-page-direc-bottom-selec {
  display: flex;
  align-items: center;
  margin-right: 40px;
}
.rel-bl1-page-direc-a {
  height: 33px;
  width: 33px;
  background-color: #1d375c;
  border-radius: 20px 0px 0px 20px;
  cursor: pointer;
}
.rel-bl1-page-direc-a p {
  color: #cacdcf;
  font-weight: bold;
  margin-top: 4px;
  margin-left: 13px;
}
.rel-bl1-page-direc-p {
  height: 33px;
  width: 33px;
  background-color: #1d375c;
  border-radius: 0px 20px 20px 0px;
  cursor: pointer;
}
.rel-bl1-page-direc-p p {
  color: #cacdcf;
  font-weight: bold;
  margin-top: 4px;
  margin-left: 13px;
}
</style>