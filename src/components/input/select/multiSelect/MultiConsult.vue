<template>
  <div tabindex="-1" @blur="handleFocusOut" class="container">
    <div
      :style="{
        textAlign: textAlignTextButtom,
        paddingLeft: paddingLeftTextButtom,
        backgroundColor: colorButtomActive,
        borderColor: borderColorButtom,
      }"
      @click="exibirMulti = !exibirMulti"
      class="btn-item"
    >
      <div
        :style="{ fontSize: fonteSizeTextButtom }"
        style="display:flex;justify-content: flex-end; margin-top:3px"
      >
        <div style="flex:1;width:50px;">{{ nomeCampo }}</div>
        <div style="width:50px">
          <img
            style="width:15px"
            src="../../../../assets/icons/Seta.png"
            alt="setaDown"
          />
        </div>
      </div>
    </div>
    <transition-group
      tag="ul"
      :class="[
        exibirMulti ? 'animation-height' : '',
        exibirBarraRolagem ? 'barraRolagem' : '',
        'lista-itens',
      ]"
      :style="{ paddingLeft: paddingLeftList }"
    >
      <li
        v-show="exibirMulti"
        v-for="item in listagemItems"
        :key="item.nome"
        @click="addItenSelected(item)"
        class="lista-itens-excluir"
      >
        <span
          ><img
            v-if="exibirIndicadorItem"
            class="img-item"
            src="../../../../assets/icons/Seta.png"
            alt=""
          />
          {{ item.nome }}</span
        >
        <span style="color:#648362;" v-if="item.marcado">&#10003;</span>
      </li>
    </transition-group>
  </div>
</template>
<script>
export default {
  name: "multiSelectConsult",
  props: {
    nomeExibicao: {
      type: String,
    },
    dataSet: {
      type: Array,
      required: true,
    },
    nomeCampo: {
      type: String,
      required: true,
    },

    paddingLeftList: {
      type: String,
      default: "10px",
    },
    textAlignTextButtom: {
      type: String,
      default: "left",
    },
    paddingLeftTextButtom: {
      type: String,
      default: "",
    },
    backgroudColorButtom: {
      type: String,
      default: "#EDF0F2",
    },
    fonteSizeTextButtom: {
      type: String,
      default: "1em",
    },
    borderColorButtom: {
      type: String,
      default: "#c5c5c5",
    },
    blurCloseList: {
      type: Boolean,
      default: true,
    },
    desmarcarItem: {
      type: Boolean,
      default: true,
    },
    exibirBarraRolagem: {
      type: Boolean,
      default: false,
    },
    permitirZeroSelecionado: {
      type: Boolean,
      default: true,
    },
    exibirIndicadorItem: {
      type: Boolean,
      default: true,
    },
  },
  model: {
    prop: "dataSet",
    event: "change",
  },
  computed: {
    listagemItems() {
      let result = this.dataSet.filter((item) => {
        return item;
      });
      return result;
    },
    // dataSetSelecionado() {
    //   let result = this.dataSet.filter(item => {
    //     return item.marcado == true;
    //   });
    //   return result;
    // },
    colorButtomActive() {
      if (this.exibirMulti) {
        return this.backgroudColorButtom;
      }
      return "";
    },
  },
  data() {
    return {
      exibirMulti: false,
    };
  },

  methods: {
    addItenSelected(item) {
      if (item.nome === "Todas" && item.marcado === false) {
        this.dataSet.map((x) => (x.marcado = true));
      } else {
        if (item.marcado == false) {
          item.marcado = true;
        } else {
          let qtdSelecionas = this.dataSet
            .map((x) => x)
            .filter((y) => y.marcado == true).length;
          if (this.permitirZeroSelecionado === true) {
            item.marcado = false;
          } else if (
            this.permitirZeroSelecionado === false &&
            qtdSelecionas > 1
          ) {
            item.marcado = false;
          } else if (
            this.permitirZeroSelecionado === false &&
            qtdSelecionas == 1
          ) {
            console.log("entrei aqui");
            this.$emit("clickInvalido");
          }
        }
        let itemPrincipal = this.dataSet
          .map((x) => x)
          .filter((y) => y.nome == "Todas");
        if (itemPrincipal.length) itemPrincipal[0].marcado = false;
      }
    },
    handleFocus() {
      this.exibirMulti = true;
    },
    handleFocusOut() {
      if (this.blurCloseList) {
        this.exibirMulti = false;
      }
    },
  },
};
</script>
<style scoped>
p,
ul {
  margin: 0;
}
.container {
  width: 100%;
  position: relative;
  height: 100%;
  border-radius: 2px;
  cursor: pointer;
}
.btn-item {
  background-color: #ffffff;
  border: 1px solid black;
  max-width: 100vw;
  height: 32px;
  position: relative;
}

.btn-item p {
  margin-top: 2px;
  color: #78797a;
}

.lista-itens::-webkit-scrollbar {
  width: 2px;
}

.barraRolagem::-webkit-scrollbar-thumb {
  background: #1d375c;
}

.lista-itens {
  padding: 0px 10px 0px 10px;
  background-color: #ffffff;
  transition: max-height 0.3s;
  max-height: 0px;
  overflow-y: scroll;
  max-width: 100vw;
  -webkit-box-shadow: 10px 14px 23px -15px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 14px 23px -15px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 14px 15px -23px rgba(0, 0, 0, 0.75);
  border-radius: 5px;
  scrollbar-width: 0px;
  -webkit-scrollbar: 0px;
  margin-bottom: 20px;
}
.animation-height {
  max-height: 176px;
}
.img-item {
  width: 11px;
  transform: rotate(-90deg);
  margin-top: -5px;
}
span {
  color: #8d8e8f;
}
.lista-itens-excluir {
  display: flex;
  max-width: 266px;
  justify-content: space-between;
}
.hide-item {
  display: none;
}

li {
  cursor: pointer;
}
.data-list {
  display: flex;
  max-width: 100vw;
  justify-content: space-between;
}

.v-enter {
  min-height: 0;
}
.v-enter-active {
  transition: opacity 0.2s;
}
.v-leave-active {
  transition: opacity 0.2s;
}
</style>
