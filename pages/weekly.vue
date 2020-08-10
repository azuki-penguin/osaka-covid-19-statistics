<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card>
        <v-card-title class="text-subtitle-1">
          週平均の陽性者数の推移
        </v-card-title>
        <line-chart
          :chartData="weeklyPatientTotalAverageDataSets"
          :chartOptions="weeklyPatientTotalAverageOptions" />
      </v-card>

      <v-card>
        <v-card-title class="text-subtitle-1">
          週平均の検査数と週平均の陽性者数の推移
        </v-card-title>
        <combo-chart
          :chartData="weeklyInspectionTotalAverageDataSets"
          :chartOptions="weeklyInspectionTotalAverageOptions" />
      </v-card>
 
      <v-card>
        <v-card-title class="text-subtitle-1">
          陽性者率の推移 (週別)
        </v-card-title>
        <line-chart
          :chartData="weeklyPatientRatioDataSets"
          :chartOptions="weeklyPatientRatioOptions" />
      </v-card>

      <v-card>
        <v-card-title class="text-subtitle-1">
          週平均の陽性者数の増減推移
        </v-card-title>
        <line-chart
          :chartData="weeklyPatientTotalAverageComparisonDataSets"
          :chartOptions="weeklyPatientTotalAverageComparisonOptions" />
      </v-card>

      <v-card>
        <v-card-title class="text-subtitle-1">
          週平均の検査数と週平均の陽性者数の増減推移
        </v-card-title>
        <combo-chart
          :chartData="weeklyInspectionTotalAverageComparisonDataSets"
          :chartOptions="weeklyInspectionTotalAverageComparisonOptions" />
      </v-card>
 
      <v-card>
        <v-card-title class="text-subtitle-1">
          陽性者率の増減推移 (週別)
        </v-card-title>
        <line-chart
          :chartData="weeklyPatientRatioComparisonDataSets"
          :chartOptions="weeklyPatientRatioComparisonOptions" />
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions, createNamespacedHelpers } from 'vuex';
import LineChart from '~/components/LineChart.vue';
import ComboChart from '~/components/ComboChart.vue';

const {
  mapGetters: mapGettersOfWeekly,
  mapActions: mapActionsOfWeekly,
} = createNamespacedHelpers('weekly');

export default {
  methods: {
    ...mapActions(['loadData']),
    ...mapActionsOfWeekly({
      loadWeeklyData: 'loadData',
    }),
  },
  computed: {
    ...mapGettersOfWeekly([
      'weeklyPatientRatioDataSets',
      'weeklyPatientRatioOptions',
      'weeklyPatientRatioComparisonDataSets',
      'weeklyPatientRatioComparisonOptions',
      'weeklyPatientTotalAverageDataSets',
      'weeklyPatientTotalAverageOptions',
      'weeklyInspectionTotalAverageDataSets',
      'weeklyInspectionTotalAverageOptions',
      'weeklyPatientTotalAverageComparisonDataSets',
      'weeklyPatientTotalAverageComparisonOptions',
      'weeklyInspectionTotalAverageComparisonDataSets',
      'weeklyInspectionTotalAverageComparisonOptions',
    ])
  },
  async mounted() {
    await this.loadData();
    this.loadWeeklyData();
  },
  components: {
    LineChart,
    ComboChart,
  },
};
</script>
