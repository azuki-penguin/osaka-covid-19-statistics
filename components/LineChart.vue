<script>
import * as dateFns from 'date-fns';
import { Line, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    chartOptions: Object,
    chartData: Object,
  },
  mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  },
};
</script>

