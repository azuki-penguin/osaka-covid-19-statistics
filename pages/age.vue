<template>
  <v-container>
    <v-row justify="center">
      <v-col sm=12>
        <v-card>
          <v-card-title class="text-subtitle-1">
            年代別の感染者数の内訳
          </v-card-title>
          <pie-chart
            :chartData="agePatientsCountDataSets"
            :chartOptions="agePatientsCountOptions" />
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col sm=12>
        <v-card>
          <v-card-title class="text-subtitle-1">
            年代別の感染者数の推移 (日別)
          </v-card-title>
          <line-chart
            :chartData="dailyAgePatientsTotalDatasets"
            :chartOptions="dailyAgePatientsTotalOptions" />
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col sm=12>
        <v-card>
          <v-card-title class="text-subtitle-1">
            検査数と年代別の感染者数の推移 (日別)
          </v-card-title>
          <combo-chart
            :chartData="dailyAgePatientsTotalWithInspectationDatasets"
            :chartOptions="dailyAgePatientsTotalWithInspectationOptions" />
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col sm=12>
        <v-card>
          <v-card-title class="text-subtitle-1">
            年代別の週平均の陽性者数の推移 (週別)
          </v-card-title>
          <line-chart
            :chartData="weeklyAgePatientsTotalAverageDatasets"
            :chartOptions="weeklyAgePatientsTotalAverageOptions" />
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col sm=12>
        <v-card>
          <v-card-title class="text-subtitle-1">
            週平均の検査数と年代別の週平均の陽性者数の推移 (週別)
          </v-card-title>
          <combo-chart
            :chartData="weeklyAgePatientsTotalAverageWithInspectationDatasets"
            :chartOptions="weeklyAgePatientsTotalAverageWithInspectationOptions" />
        </v-card>
      </v-col>
    </v-row>
 </v-container>
</template>

<script>
import { mapState, mapActions, createNamespacedHelpers } from 'vuex';
import PieChart from '~/components/PieChart.vue';
import ComboChart from '~/components/ComboChart.vue';
import LineChart from '~/components/LineChart.vue';

const {
  mapGetters: mapGettersOfAge,
  mapActions: mapActionsOfAge,
} = createNamespacedHelpers('age');

export default {
  methods: {
    ...mapActions(['loadData']),
   ...mapActionsOfAge({
      loadAgeData: 'loadData',
    }),
  },
  computed: {
    ...mapGettersOfAge([
      'agePatientsCountDataSets',
      'agePatientsCountOptions',
      'dailyAgePatientsTotalDatasets',
      'dailyAgePatientsTotalOptions',
      'dailyAgePatientsTotalWithInspectationDatasets',
      'dailyAgePatientsTotalWithInspectationOptions',
      'weeklyAgePatientsTotalAverageDatasets',
      'weeklyAgePatientsTotalAverageOptions',
      'weeklyAgePatientsTotalAverageWithInspectationDatasets',
      'weeklyAgePatientsTotalAverageWithInspectationOptions',
    ]),
  },
  async mounted() {
    await this.loadData();
   this.loadAgeData();
  },
  components: {
   PieChart,
   ComboChart,
   LineChart,
  },
};
</script>
