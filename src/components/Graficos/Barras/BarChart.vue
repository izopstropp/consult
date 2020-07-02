<script>
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ["tituloChart"],
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  data() {
    return {
      options: {
        scales: {
          yAxes: [
            {
              barPercentage: 0,
              stacked: false,

              ticks: {
                display: false,
                beginAtZero: true,
                suggestedMax: 70
              },
              gridLines: {
                display: false,
                color: "#1d375c"
              }
            }
          ],
          xAxes: [
            {
              ticks: { fontSize: 15, fontColor: "#1d375c" },

              gridLines: {
                display: false,
                color: "#1d375c"
              },
              scaleFontSize: 10,
              stacked: false,
              categoryPercentage: 0.5,
              barPercentage: 1
            }
          ]
        },
        Tooltips: false,
        legend: false,
        hover: {
          animationDuration: 0
        },
        responsive: true,
        maintainAspectRatio: false,
        scaleBeginAtZero: true,
        title: {
          display: true,
          text: `${this.tituloChart}`,
          position: "top",
          fontColor: "#1d375c",
          fontSize: 15.5,
          fontFamily: "sans-serif",
          padding: 10,
          fontStyle: ""
        },
        animation: {
          onProgress: function(animation) {
            animation.duration = 0;
          },
          onComplete: function() {
            var chartInstance = this.chart;
            var ctx = chartInstance.ctx;
            ctx.textAlign = "center";
            ctx.textBaseline = "alphabetic";
            ctx.fillStyle = "#C57D7D";
            ctx.font = "15px verdana";
            ctx.textBaseline = "bottom";
            this.data.datasets.forEach(function(dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function(bar, index) {
                var valorFormatado = `${dataset.data[
                  index
                ].toLocaleString("pt-br", { minimumFractionDigits: 2 })}`;
                var valor = `${dataset.data[index]}`;
                // console.log(dataset.data[index]);
                // console.log(dataset.data);
                // console.log(valorFormatado);
                if (valor > 1000000) {
                  ctx.fillStyle = "#708D6E";
                } else {
                  ctx.fillStyle = "#C57D7D";
                }
                const regex = /^\d{0,3}/gm;

                if (valor >= 1000000) {
                  valor = regex.exec(valorFormatado) + "M";
                } else if (valor >= 1000) {
                  valor = regex.exec(valorFormatado) + "K";
                }

                ctx.fillText(valor, bar._model.x, bar._model.y);
                // ctx.fillText([2, 2], bar._model.x, bar._model.y);
              });
            });
          }
        }
      }
    };
  },
  methods: {}
};
</script>
