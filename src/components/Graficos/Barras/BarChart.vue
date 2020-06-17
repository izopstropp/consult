<script>
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Bar,
  mixins: [reactiveProp],
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  data() {
    return {
      options: {
        scales: {
          yAxes: [
            {
              stacked: false,
              ticks: {
                display: false,
                beginAtZero: true,
                suggestedMax: 70,
              },
              gridLines: {
                display: false,
                color: "#85CFE2",
              },
            },
          ],
          xAxes: [
            {
              ticks: { fontSize: 15, fontColor: "#85CFE2" },

              gridLines: {
                display: false,
                color: "#85CFE2",
              },
              // scaleFontSize: 10,
              // stacked: false,
              // categoryPercentage: 0.5,
              // barPercentage: 1,
            },
          ],
        },
        Tooltips: false,
        legend: false,
        hover: {
          animationDuration: 0,
        },
        responsive: true,
        maintainAspectRatio: false,
        scaleBeginAtZero: true,
        title: {
          display: true,
          text: "Justiça",
          position: "top",
          fontColor: "#FFFFFF",
          fontSize: 14,
          fontFamily: "sans-serif",
          padding: 10,
          fontStyle: "",
        },
        animation: {
          onComplete: function() {
            var chartInstance = this.chart;
            var ctx = chartInstance.ctx;
            ctx.textAlign = "center";
            ctx.textBaseline = "alphabetic";
            ctx.fillStyle = "#A6E9A8";
            ctx.font = "15px verdana";
            ctx.textBaseline = "bottom";
            this.data.datasets.forEach(function(dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function(bar, index) {
                var data = `${dataset.data[index].toLocaleString()}`;
                ctx.fillText(data, bar._model.x, bar._model.y);
              });
            });
          },
        },
      },
    };
  },
  methods: {},
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
