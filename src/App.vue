<template>
  <div id="app">
    <!-- <div id="nav"></div> -->
    <router-view />
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/pt-br";

moment.locale("pt");
export default {};
</script>
<style>
/* #nav a.router-link-exact-active {
  color: #42b983;
} */
input,
form,
a,
p,
ul,
list-style {
  margin: 0;
  padding: 0;
}
.ant-calendar-picker-container {
  margin-top: 480px !important;
  position: absolute !important;
}
.ant-calendar-month .ant-calendar-month-header-wrap {
  position: relative !important;
  height: 150px !important;
}
.ant-calendar {
  max-width: 200px !important;
}
.ant-calendar-header {
  line-height: 0px !important;
}
.ant-calendar-month-panel-selected-cell .ant-calendar-month-panel-month {
  background: #001a3f !important;
}
.ant-select-selection {
  min-height: 35px !important;
  border-color: #c1c1c1 !important;
}
.ant-input {
  height: 35px !important;
  border-color: #c1c1c1 !important;
}
.notibar {
  height: 30px;
}
.notibar .text {
  margin-top: -10px;
  font-size: 0.9em;
}
.erroInput {
  border-color: red !important;
}
resetErroInput {
  border-color: none !important;
}
</style>
