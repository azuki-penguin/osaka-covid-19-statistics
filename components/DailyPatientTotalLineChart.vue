<script>
import * as dateFns from 'date-fns';
import { Line } from 'vue-chartjs';
import { mapState } from 'vuex';

export default {
  extends: Line,
  data() {
    return {
      options: {
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
                labelString: '感染者数',
              },
              ticks: {
                beginAtZero: true,
                stepSize: 10,
              },
            },
          ],
        },
      },
    };
  },
  computed: {
    ...mapState(['dailyPatientTotal']),
    data() {
      return {
        labels: this.dailyPatientTotal.map(
          x => dateFns.format(
            dateFns.parseJSON(x.date),
            'yyyy/MM/dd'
          )
        ),
        datasets: [
          {
            label: '感染者数',
            lineTension: 0,
            data: this.dailyPatientTotal.map(x => x.count),
            borderColor: 'rgba(255, 255, 255, 1)',
          }
        ],
      };
    },
  },
  mounted() {
    this.renderChart(this.data, this.options);
  },
};
</script>

