<script>
import * as dateFns from 'date-fns';
import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  props: {
    patientsData: Array,
    inspectionsData: Array,
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
                labelString: '検査数',
              },
              ticks: {
                beginAtZero: true,
                stepSize: 50,
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
        labels: this.inspectionsData.map(
          x => dateFns.format(x.date, 'yyyy/MM/dd')
        ),
        datasets: [
          {
            label: '検査数',
            data: this.inspectionsData.map(x => x.count),
            backgroundColor: 'rgba(48, 128, 255, 1)',
            order: 2,
          },
          {
            label: '感染者数',
            type: 'line',
            lineTension: 0,
            data: this.patientsData.map(x => x.count),
            borderColor: 'rgba(255, 255, 255, 1)',
            order: 1,
          }
        ],
      };
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  },
  watch: {
    patientsData() {
      this.renderChart(this.chartData, this.chartOptions);
    },
    inspectionsData() {
      this.renderChart(this.chartData, this.chartOptions);
    },
  },
};
</script>

