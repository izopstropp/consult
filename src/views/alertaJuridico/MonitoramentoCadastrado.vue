<template>
  <div class="mc-container">
    <p class="mc-titulo">MONITORAMENTOS CADASTRADOS</p>
    <table>
      <thead>
        <th>Nº Identificação</th>
        <th>Apelido</th>
        <th>Data do Cadastro</th>
        <th style="width: 200px">Filtros em Monitoramento</th>
        <th style="width: 200px">Valor Monitoramento</th>
      </thead>
      <tbody>
        <tr>
          <td>00006567</td>
          <td>Ricardo Eletro</td>
          <td>03/07/2020</td>
          <td>
            <div class="filtro-monitoramento">
              <div>
                <strong>Termo:</strong> Ricardo Eletro
              </div>
              <div>
                <strong>Justiça:</strong>Estadual; Federal; Trabalhista
              </div>
              <div>
                <strong>Partes:</strong> Réu; Autor
              </div>
              <div>
                <strong>UF:</strong> SP; BA; RJ
              </div>
            </div>
          </td>
          <td>R$ 350,00</td>
        </tr>

        <tr>
          <td>00006568</td>
          <td>Americanas</td>
          <td>03/07/2020</td>
          <td>
            <div class="filtro-monitoramento">
              <div>
                <strong>Termo:</strong> Lojas Americanas
              </div>
              <div>
                <strong>Justiça:</strong>Estadual; Federal; Trabalhista
              </div>
              <div>
                <strong>Partes:</strong> Réu; Autor
              </div>
              <div>
                <strong>UF:</strong> SP; SC; PE; BA
              </div>
            </div>
          </td>
          <td>R$ 400,00</td>
        </tr>
      </tbody>
    </table>
    <a
      href="#"
      style="display: flex; justify-content: flex-end; margin-top:10px"
    >Criar novo monitoramento</a>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
p {
  margin: 0px;
}
/* *{
    border: 1px solid red;
} */
.mc-container {
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
.mc-titulo {
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 80px;
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
  /* height: 60px; */
}
td > .filtro-monitoramento {
  text-align: left;
  width: 200px;
  margin: 0 auto auto 40px;
}
</style>