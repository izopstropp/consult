<template>
  <div class="aj-container">
    <p class="aj-titulo">ALERTAS DE MONITORAMENTO</p>
    <div class="aj-bl1">
      <div>
        <p>Filtrar pelo termo:</p>
        <a-input class="aj-filtro"></a-input>
      </div>
    </div>
    <div class="aj-bl2">
      <p>
        Você possui
        <span class="color-red">{{qtdDadosNaoObtidos}}</span> novo(s) alerta(s)!
      </p>
      <!-- <p>
        
      </p> -->
    </div>
    <table>
      <thead>
        <th>Termo Monitorado</th>
        <th>Data do Alerta</th>
        <th style="width: 290px">Descrição do Alerta</th>
        <th style="width: 30px"></th>
        <th>Obter Dados <a-checkbox class='check-obter-todos' v-model="selecionarTodos"></a-checkbox></th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in gerarRegistroPorPagina" :key="index">
          <td>{{item.termoMonitorado}}</td>
          <td>{{item.dataAlerta}}</td>
          <td
            v-if="item.resumoVisualizado"
            :class="[!item.resumoVisualizado ? 'color-red':'text-align-left padding-left-20']"
          >
            Foram encontrados <strong>{{item.volumetria.qtdProcesso}}</strong> novo(s) processo(s).
            <br />
            <strong>Justiça:</strong> {{item.volumetria.justica.reduce((acc,cur) =>acc + cur.qtd +" "+fomatarCampoExibicao(cur.nome) +", ","")}}
            <br />
            <strong>Partes:</strong> {{item.volumetria.partes.reduce((acc,cur) =>acc + cur.qtd +" "+ fomatarCampoExibicao(cur.nome) +", ","")}}
            <br />
            <strong>UF:</strong> {{item.volumetria.UF.reduce((acc,cur) =>acc + cur.qtd +" "+cur.sigla +", ","")}}
          </td>
          <td v-else :class="[!item.resumoVisualizado ? 'link-alert-open':'text-align-left padding-left-20']">
            <p
              @click="[item.descricaoAlerta=item.descricaoFake, item.resumoVisualizado = true]"
            >Acesse Aqui</p>
          </td>
          <td></td>
          <td style="width:90px">
            <!-- <a-checkbox v-model="item.dadosObtidos" v-if="!item.resumoVisualizado"></a-checkbox> -->
            <a-checkbox v-model="item.obterDados"></a-checkbox>
          </td>
        </tr>
      </tbody>
    </table>
    <p style="display: flex; justify-content: flex-end; margin-top: 10px">
      <a-checkbox v-model="selecionarTodos">Selecionar todos</a-checkbox>
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
          <a-button :disabled="dadosSelecionados.length > 0 ? false : true">Obter dados selecionados</a-button>
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
      selecionarTodos: false,
      paginacao: {
        limiteItensPagina: 7,
        paginaAtual: 1,
      },
      listaAlerta: [
        {
          termoMonitorado: "Ricardo Eletro",
          dataAlerta: "03/08/2020",
          volumetria: {
            qtdProcesso: "3",
            justica:[
              {
                nome:"estadual",
                qtd:2
              },
              {
                nome:"federal",
                qtd:1
              }
            ],
            partes:[
              {
                nome:"réu",
                qtd:1
              },
              {
                nome:"autor",
                qtd:2
              },
              
            ],
            UF:[
              {
                sigla:"SP",
                qtd: 2
              },
              {
                sigla:"RJ",
                qtd: 1
              }
            ] 
          },
          resumoVisualizado: false,
          dadosObtidos: false,
          obterDados:false
        },
         {
          termoMonitorado: "Americanas",
          dataAlerta: "29/07/2020",
          volumetria: {
            qtdProcesso: "1",
            justica:[
              {
                nome:"estadual",
                qtd:1
              }
            ],
            partes:[
              {
                nome:"réu",
                qtd:1
              }   
            ],
            UF:[
              {
                sigla:"SP",
                qtd: 1
              }
            ] 
          },
          resumoVisualizado: false,
          dadosObtidos: false,
          obterDados:false
        }
        ,
         {
          termoMonitorado: "Ricardo Eletro",
          dataAlerta: "27/07/2020",
          volumetria: {
            qtdProcesso: "9",
            justica:[
              {
                nome:"estadual",
                qtd:2
              },
              {
                nome:"federal",
                qtd:3
              },
              {
                nome:"trabalhista",
                qtd:4
              }
            ],
            partes:[
              {
                nome:"réu",
                qtd:1
              }   
            ],
            UF:[
              {
                sigla:"SP",
                qtd: 4
              },
               {
                sigla:"BA",
                qtd: 5
              }
            ] 
          },
          resumoVisualizado: true,
          dadosObtidos: false,
          obterDados:false
        },
         {
          termoMonitorado: "Ricardo Eletro",
          dataAlerta: "24/07/2010",
          volumetria: {
            qtdProcesso: "2",
            justica:[
              {
                nome:"estadual",
                qtd:1
              },
              {
                nome:"trabalhista",
                qtd:1
              }
            ],
            partes:[
              {
                nome:"réu",
                qtd:1
              },
              {
                nome:"autor",
                qtd:1
              }  
            ],
            UF:[
              {
                sigla:"RJ",
                qtd: 2
              },
            ] 
          },
          resumoVisualizado: true,
          dadosObtidos: false,
          obterDados:false
        },
         {
          termoMonitorado: "Americanas",
          dataAlerta: "23/07/2010",
          volumetria: {
            qtdProcesso: "1",
            justica:[
              {
                nome:"trabalhista",
                qtd:1
              }
            ],
            partes:[
              {
                nome:"réu",
                qtd:1
              }           
            ],
            UF:[
              {
                sigla:"SC",
                qtd: 1
              },
            ] 
          },
          resumoVisualizado: true,
          dadosObtidos: false,
          obterDados:false
        },
        {
          termoMonitorado: "Americanas",
          dataAlerta: "21/07/2010",
          volumetria: {
            qtdProcesso: "5",
            justica:[
              {
                nome:"federal",
                qtd:3
              },
              {
                nome:"trabalhista",
                qtd:2
              }
            ],
            partes:[
              {
                nome:"réu",
                qtd:5
              }           
            ],
            UF:[
              {
                sigla:"PE",
                qtd: 4
              },
              {
                sigla:"SC",
                qtd: 1
              },
            ] 
          },
          resumoVisualizado: true,
          dadosObtidos: false,
          obterDados:false
        },
         {
          termoMonitorado: "Ricardo Eletro",
          dataAlerta: "20/07/2010",
          volumetria: {
            qtdProcesso: "3",
            justica:[
              {
                nome:"estadual",
                qtd:1
              },
              {
                nome:"federal",
                qtd:2
              }
            ],
            partes:[
              {
                nome:"réu",
                qtd:2
              },
              {
                nome:"autor",
                qtd:1
              }   

            ],
            UF:[
              {
                sigla:"SP",
                qtd: 3
              },
            ] 
          },
          resumoVisualizado: true,
          dadosObtidos: false,
          obterDados:false
        },
         {
          termoMonitorado: "Ricardo Eletro",
          dataAlerta: "16/07/2020",
          volumetria: {
            qtdProcesso: "3",
            justica:[
              {
                nome:"estadual",
                qtd:1
              },
              {
                nome:"trabalhista",
                qtd:2
              }
            ],
            partes:[
              {
                nome:"réu",
                qtd:3
              }
            ],
            UF:[
              {
                sigla:"SP",
                qtd: 1
              },
              {
                sigla:"BA",
                qtd: 2
              },
              
            ] 
          },
          resumoVisualizado: true,
          dadosObtidos: false,
          obterDados:false
        },
        {
          termoMonitorado: "Americanas",
          dataAlerta: "15/07/2020",
          volumetria: {
            qtdProcesso: "10",
            justica:[
              {
                nome:"estadual",
                qtd:7
              },
              {
                nome:"federal",
                qtd:1
              },
              {
                nome:"trabalhista",
                qtd:2
              }
            ],
            partes:[
              {
                nome:"réu",
                qtd:8
              },
              {
                nome:"autor",
                qtd:2
              }
            ],
            UF:[
              {
                sigla:"SP",
                qtd: 9
              },
              {
                sigla:"PE",
                qtd: 1
              },
              
            ] 
          },
          resumoVisualizado: true,
          dadosObtidos: false,
          obterDados:false
        },
        {
          termoMonitorado: "Ricardo Eletro",
          dataAlerta: "13/07/2020",
          volumetria: {
            qtdProcesso: "5",
            justica:[
              {
                nome:"estadual",
                qtd:5
              }
            ],
            partes:[
              {
                nome:"réu",
                qtd:5
              }
            ],
            UF:[
              {
                sigla:"BA",
                qtd: 5
              }
            ] 
          },
          resumoVisualizado: true,
          dadosObtidos: false,
          obterDados:false
        },
         {
          termoMonitorado: "Americanas",
          dataAlerta: "09/07/2020",
          volumetria: {
            qtdProcesso: "3",
            justica:[
              {
                nome:"estadual",
                qtd:1
              },
              {
                nome:"federal",
                qtd:2
              }
            ],
            partes:[
              {
                nome:"réu",
                qtd:2
              },
              {
                nome:"autor",
                qtd:2
              }
            ],
            UF:[
              {
                sigla:"SP",
                qtd: 3
              }
            ] 
          },
          resumoVisualizado: true,
          dadosObtidos: false,
          obterDados:false
        },
         {
          termoMonitorado: "Americanas",
          dataAlerta: "08/07/2010",
          volumetria: {
            qtdProcesso: "3",
            justica:[
              {
                nome:"trabalhista",
                qtd:1
              }
            ],
            partes:[
              {
                nome:"réu",
                qtd:1
              }
            ],
            UF:[
              {
                sigla:"BA",
                qtd: 1
              }
            ] 
          },
          resumoVisualizado: true,
          dadosObtidos: false,
          obterDados:false
        },
        {
          termoMonitorado: "Americanas",
          dataAlerta: "06/07/2010",
          volumetria: {
            qtdProcesso: "1",
            justica:[
              {
                nome:"estadual",
                qtd:1
              }
            ],
            partes:[
              {
                nome:"réu",
                qtd:1
              }
            ],
            UF:[
              {
                sigla:"BA",
                qtd: 1
              }
            ] 
          },
          resumoVisualizado: true,
          dadosObtidos: false,
          obterDados:false
        }
      ],
    };
  },
  computed: {
    dadosSelecionados(){
      return this.listaAlerta.filter(x=> x.obterDados === true)
    },
    qtdDadosNaoObtidos() {
      return this.listaAlerta.filter((x) => x.resumoVisualizado === false).length;
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
    selecionarTodos: {
      handler() {
        this.listaAlerta.map((y) => (y.obterDados = this.selecionarTodos));
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
    fomatarCampoExibicao(string){
       return string.charAt(0).toUpperCase() + string.slice(1);
    },
    test() {
      let listaAlerta2 = [
        {
          termoMonitorado: "NOVO",
          dataAlerta: "12/01/2010",
          descricaoAlerta: "NOVO",
          resumoVisualizado: false,
          dadosObtidos: false,
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
@media screen and (max-width: 700px) {
  .aj-container{
    padding: 30px;
  }
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
  justify-content: flex-start;
  align-items: flex-end;
  margin-bottom: 20px;
  flex-wrap: wrap;
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
button:disabled,
button[disabled]{
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}

.ant-btn:active {
  background-color: #001a3f81;
}
.aj-bl2 {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 4px;
}
.color-red {
  color: rgba(187, 7, 7, 0.657);
  text-decoration: underline;
  font-weight: bold;
}
.link-alert-open{
  color: rgba(70, 68, 68, 0.863);
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
/* TABLE */
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
table th:nth-last-child(2),td:nth-last-child(2){
  border-top:hidden;
  background-color: white;
}
table th:nth-last-child(1){
  width: 140px;

}
tr:last-child td:nth-last-child(2){
  border-bottom:hidden;
}
.check-obter-todos{
  margin-left:6px;
}
/* FIM-TABLE */
.rel-bl1 {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 100px;
  flex-wrap: wrap;
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