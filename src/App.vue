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
#app {
  max-width: 2080px;
}
input,
form,
a,
p,
ul,
list-style {
  margin: 0;
  padding: 0;
}

.vld-background {
  position: relative !important;
}
.ant-checkbox-wrapper {
  border-radius: 50% !important;
  outline: 0 !important;
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
.ant-radio-inner {
  border-color: #c1c1c1 !important;
}
.ant-checkbox-inner {
  border-color: #a8a6a6 !important;
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
.resetErroInput {
  border-color: none !important;
}
.ant-checkbox-checked .ant-checkbox-inner {
  background-color: #001a3f !important;
}
.ant-radio-inner::after {
  background-color: #001a3f !important;
}
.ant-select-selection__placeholder {
  text-align: center !important;
  color: #757575 !important;
}
.bg-grey {
  background-color: #a9a9a9 !important;
}
.style-notification {
  padding: 0px;
  margin: 0 5px 5px;
  font-size: 12px;
  color: rgb(250, 249, 249) !important;
  background: #02214d !important;
  height: 46px;
  margin-bottom: 40px;
  border-radius: 3px;
}
.style-notification .notification-title {
  text-align: center;
  font-weight: normal;
  padding-top: 5px;
}
.style-notification-large {
  padding: 0px;
  margin: 0 5px 5px;
  font-size: 12px;
  color: rgb(250, 249, 249) !important;
  background: #02214d !important;
  height: 45px;
  margin-bottom: 40px;
  border-radius: 3px;
}
.style-notification-large .notification-title {
  text-align: center;
  font-weight: normal;
  padding-top: 5px;
}
.v-fade-left-enter-active,
.v-fade-left-leave-active,
.v-fade-left-move {
  transition: all 0.5s;
}
.v-fade-left-enter,
.v-fade-left-leave-to {
  opacity: 0;
  transform: translateY(200px) scale(0.2);
}
.chartjs-size-monitor,
.chartjs-size-monitor-expand,
.chartjs-size-monitor-shrink {
  position: relative;
}
</style>
