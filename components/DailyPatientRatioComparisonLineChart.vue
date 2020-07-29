<script>
import * as dateFns from 'date-fns';
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: {
    data: Array,
  },
  data() {
    return {
      chartOptions: {
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: '日付',
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: '感染者率の増減',
              },
              ticks: {
                beginAtZero: true,
                stepSize: 5,
              },
            },
          ],
        },
      },
    };
  },
  computed: {
    chartData() {
      return {
        labels: this.data.map(
          x => dateFns.format(x.date, 'yyyy/MM/dd')
        ),
        datasets: [
          {
            label: '感染者率の増減',
            lineTension: 0,
            data: this.data.map(x => Math.round(x.count * 10000) / 100),
            borderColor: 'rgba(255, 255, 255, 1)',
          }
        ],
      };
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  },
  watch: {
    data() {
      this.renderChart(this.chartData, this.chartOptions);
    },
  },
};
</script>

