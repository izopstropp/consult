<template>
    <div class="aj-container">
        <p class="aj-titulo">ALERTAS DE MONITORAMENTO</p>
        <p>Você possui 1 novo alerta!</p>
        <table>
            <thead>
                <th>Termo Monitorado</th>
                <th>Data do Alerta</th>
                <th>Descrição do Alerta</th>
                <th>Obter Dados</th>
            </thead>
            <tbody>
                <td>Ricardo Eletro</td>
                <td>06/07/2020</td>
                <td>Acesse Aqui!</td>
                <td></td>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
p{
    margin: 0px
}
/* *{
    border: 1px solid red;
} */
.aj-container{
    margin:0 auto;
    max-width: 1000px;
}
.aj-titulo{
    text-align: center;
    font-size: 1.5em;
    font-weight: bold;
    margin-top: 65px;
    margin-bottom: 136px;
}
table{
  width:100%;
  border-collapse: collapse;

}
table,th,td{
    border: 1px solid #a8b2c0;
    text-align: center;
}
th{
    height: 47px;
    background-color: #1D375C;
    color: white;
    font-size: 0.9em;
}
td{
    height: 90px;
}
</style>