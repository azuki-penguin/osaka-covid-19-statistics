<script>
import { Bar, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    chartData: Object,
    chartOptions: Object,
  },
  mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  },
};
</script>

