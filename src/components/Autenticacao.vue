<template>
  <div class="container-login-principal">
    <div class="container-component-login">
      <img src="../assets/LogoKurierConsult.png" alt="logo da kurier consult" />
      <a-form :layout="formLayout">
        <div class="login">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          ></a-form-item>

          <div class="login-label">
            <label>Usuário:</label>
          </div>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-model="usuario"
              @click="usuarioValidado = true"
              :class="[!usuarioValidado ? 'erroInput' : 'resetErroInput']"
            />
            <p style="color:red" v-if="!usuarioValidado">Preencha o campo corretamente.</p>
          </a-form-item>
          <div class="login-grupo-label">
            <div class="login-label">
              <label>Senha:</label>
            </div>
            <div>
              <a class="login-esqueci-senha">Esqueci minha senha</a>
              <img
                @click="mostrarSenha = !mostrarSenha"
                class="login-olho-senha"
                src="../assets/olhosenha.png"
                alt="visualizar senha"
              />
            </div>
          </div>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              :class="[!senhaValidado ? 'erroInput' : 'resetErroInput']"
              @click="senhaValidado = true"
              v-model="senha"
              :type="mostrarSenha ? 'text' : 'password'"
              placeholder
            />
            <p style="color:red" v-if="!senhaValidado">Preencha o campo corretamente.</p>
            <p></p>
          </a-form-item>

          <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
            <div class="btn-login">
              <a-button @click="autenticar">Entrar</a-button>
            </div>
          </a-form-item>
        </div>
      </a-form>
    </div>
    <div class="login-footer">
      <p>A Kurier</p>
      <p>Ajuda</p>
    </div>
  </div>
</template>

<script>
// import autenticacaoApi from "../api/consultAutenticacaoApi";
// import { DO_LOGIN } from "@/store/actions";
export default {
  name: "autenticacao",
  components: {},
  data() {
    return {
      formLayout: "vertical",
      mostrarSenha: false,
      usuarioValidado: true,
      senhaValidado: true,
      usuario: "",
      senha: ""
    };
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
          }
        : {};
    },
    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            wrapperCol: { span: 14, offset: 4 }
          }
        : {};
    },
    dataSetSelecionado() {
      let result = this.dataSettes.filter(item => {
        return item.marcado == true;
      });
      return result;
    }
  },
  methods: {
    desmarcarItem(index) {
      this.dataSettes.map(function(item) {
        if (item.nome == index.nome) {
          item.marcado = false;
        }
      });
    },
    autenticar() {
      this.$router.push("/selecao");
      if (this.validar()) {
        // autenticacaoApi.autenticar("felipe", "test").then(response => {
        //   if (response.status == 200) {
        //     this.$store.dispatch(DO_LOGIN, response.data);
        //     this.$router.push("/selecao");
        //   } else {
        //     this.usuario = "";
        //     this.senha = "";
        //     // this.$notibar.add("Usuário inválido");
        //   }
        // });
      }
    },
    validar() {
      let validado = true;
      if (!this.usuario) {
        this.usuarioValidado = false;
        validado = false;
      }
      if (!this.senha) {
        this.senhaValidado = false;
        validado = false;
      }
      return validado;
    }
  }
};
</script>
<style scoped>
body {
  background-color: #f5f5f5;
}
.container-login-principal {
  background-color: #f5f5f5;
  height: 100%;
  width: 100%;
  position: absolute;
}
img {
  text-align: center;
  margin-top: 35px;
  max-width: 50%;
}
.container-component-login {
  margin: 174px auto auto auto;
  background-color: #ffffff;
  max-width: 373px;
}
.container-component-login > img {
  margin-left: 94px;
}
.login {
  padding: 20px;
}
.ant-form-item {
  margin-bottom: 0px;
}
/* .container-component-login .ant-input:focus {
  border-color: red;
}
.container-component-login .ant-input:hover {
  border-color: yellow;
} */
.ant-input {
  height: 32px;
  max-width: 340px;
}
.login-olho-senha {
  cursor: pointer;
  position: absolute;
  width: 30px;
  margin-left: -31px;
  z-index: 1;
}
.login-grupo-label {
  max-width: 340px;
  display: flex;
  justify-content: space-between;
}
.btn-login {
  max-width: 340px;
  margin-top: 5px;
  display: flex;
  justify-content: flex-end;
}
.ant-btn {
  width: 74px;
  height: 34px;
}
.btn-login > .ant-btn:active {
  background-color: #052f6b;
}
.btn-login > .ant-btn {
  background-color: #001a3f;
  color: #edf0f2;
}

.login-label {
  margin-bottom: 5px;
  color: #525252;
  margin-left: 0px;
  display: flex;
  justify-content: flex-start;
}
.login-esqueci-senha {
  font-size: 0.8em;
}
.login-footer {
  margin: 0 auto auto auto;
  max-width: 400px;
  padding-left: 20px;
  font-size: 0.8em;
  display: flex;
  justify-content: flex-start;
}
.login-footer p {
  margin: 10px;
  color: #525252;
}
</style>
