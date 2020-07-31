<template>
  <div class="his-bl">
    <div class="his-bl-block">
      <div class="his-bl-titulo">PASSIVO JURÍDICO</div>
      <div class="his-bl-form">
        <div class="consulta-form-input">
          <p>Razão Social</p>
          <a-input
            v-model="parametrosConsulta.razaoSocial"
            style="width: 340px"
          />
        </div>
        <div class="consulta-form-input">
        <p>CNPJ</p>
        
        <a-input
         v-mask="['##.###.###/####-##']"
          v-model="parametrosConsulta.cnpj"
          style="width: 340px"
        />
        </div>
      </div>
      <div class="btn-consulta">
            <a class="consulta-form-btn">Consultar</a>
       </div>
    </div>
  </div>
</template>
<script>
// import consultProcessosApi from "../api/consultProcessosApi.js";
import { mask } from "vue-the-mask";

export default {
  name: "PassivoJuridico",
directives: { mask },
  data() {
    return {
      parametrosConsulta: [
        {
          razaoSocial:"",
          cnpj:""
        },
      ]
    };
  },
  beforeMount(){
    // consultProcessosApi.buscarAcoesPorUsuario().then(response => {
    //   if(response.status == 200){
    //     // this.dadosHistorico.response.data.Content
    //   }

    // })
  }
};
</script>
<style scoped>
p{
    margin:0px;
}
.his-bl{
    margin:0 auto;
    width: 700px;
}
.his-bl-titulo {
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 65px;
  margin-bottom: 131px;
}
.his-bl-form {
  display: flex;
  
  width: 700px;
  justify-content: space-between;
  
}
.btn-consulta:active{
    background-color:rgb(3, 51, 119);
}
.btn-consulta {
    cursor: pointer;
width: 144px;
    margin: 59px auto;
    padding-top: 5px;
  height: 32px;
  background-color:#001A3F;
  
  text-align: center;
}
a{
    color:rgb(194, 189, 189);
}
.consulta-form-btn {
  margin: 67px auto auto auto;
  font-size: 0.9em;
  
}

</style>
