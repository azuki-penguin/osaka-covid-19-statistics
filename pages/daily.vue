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
          感染者数の推移 (日別)
        </v-card-title>
        <line-chart
          :chartData="dailyPatientTotalDataSets"
          :chartOptions="dailyPatientTotalOptions" />
      </v-card>

      <v-card>
        <v-card-title class="text-subtitle-1">
          検査数と陽性者数の推移 (日別)
        </v-card-title>
        <combo-chart
          :chartData="dailyInspectionTotalDataSets"
          :chartOptions="dailyInspectionTotalOptions" />
      </v-card>

      <v-card>
        <v-card-title class="text-subtitle-1">
          陽性者率の推移 (日別)
        </v-card-title>
        <line-chart
          :chartData="dailyPatientRatioDataSets"
          :chartOptions="dailyPatientRatioOptions" />
      </v-card>

      <v-card>
        <v-card-title class="text-subtitle-1">
          陽性者の増減の推移 (日別)
        </v-card-title>
        <line-chart
          :chartData="dailyPatientTotalComparisonDataSets"
          :chartOptions="dailyPatientTotalComparisonOptions" />
      </v-card>

      <v-card>
        <v-card-title class="text-subtitle-1">
          検査数の増減と陽性者数の増減推移 (日別)
        </v-card-title>
        <combo-chart
          :chartData="dailyInspectionTotalComparisonDataSets"
          :chartOptions="dailyInspectionTotalComparisonOptions" />
      </v-card>

      <v-card>
        <v-card-title class="text-subtitle-1">
          陽性者率の増減推移 (日別)
        </v-card-title>
        <line-chart
          :chartData="dailyPatientRatioComparisonDataSets"
          :chartOptions="dailyPatientRatioComparisonOptions" />
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions, createNamespacedHelpers } from 'vuex';
import LineChart from '~/components/LineChart.vue';
import ComboChart from '~/components/ComboChart.vue';

const {
  mapGetters: mapGettersOfDaily,
  mapActions: mapActionsOfDaily,
} = createNamespacedHelpers('daily');

export default {
  methods: {
    ...mapActions(['loadData']),
    ...mapActionsOfDaily({
      loadDailyData: 'loadData',
    }),
  },
  computed: {
    ...mapGettersOfDaily([
      'dailyPatientTotalDataSets',
      'dailyPatientTotalOptions',
      'dailyInspectionTotalDataSets',
      'dailyInspectionTotalOptions',
      'dailyPatientRatioDataSets',
      'dailyPatientRatioOptions',
      'dailyPatientTotalComparisonDataSets',
      'dailyPatientTotalComparisonOptions',
      'dailyInspectionTotalComparisonDataSets',
      'dailyInspectionTotalComparisonOptions',
      'dailyPatientRatioComparisonDataSets',
      'dailyPatientRatioComparisonOptions',
    ]),
  },
  async mounted() {
    await this.loadData();
    this.loadDailyData();
  },
  components: {
    LineChart,
    ComboChart,
  },
};
</script>

