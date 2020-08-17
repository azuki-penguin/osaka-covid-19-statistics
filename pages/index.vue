<template>
  <v-container>
    <v-row justify="center">
      <v-col sm=12 md=12>
        <v-card>
          <v-card-title class="text-h6">
            概要
          </v-card-title>
          <v-card-text>
            <p>
              <a href="https://github.com/codeforosaka/covid19">大阪府 新型コロナウイルス感染症対策サイトのGitHubリポジトリ</a>で公開されている統計データに基づいてデータをグラフ化しています。
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col sm=12 md=4>
        <v-card>
          <v-card-title class="text-subtitle-1">
            感染者数の推移 (日別)
          </v-card-title>
          <line-chart
            :chartData="dailyPatientTotalDataSets"
            :chartOptions="dailyPatientTotalOptions" />
        </v-card>
      </v-col>

      <v-col sm=12 md=4>
        <v-card>
          <v-card-title class="text-subtitle-1">
            検査数と陽性者数の推移 (日別)
          </v-card-title>
          <combo-chart
            :chartData="dailyInspectionTotalDataSets"
            :chartOptions="dailyInspectionTotalOptions" />
        </v-card>
      </v-col>

      <v-col sm=12 md=4>
        <v-card>
          <v-card-title class="text-subtitle-1">
            陽性者率の推移 (日別)
          </v-card-title>
          <line-chart
            :chartData="dailyPatientRatioDataSets"
            :chartOptions="dailyPatientRatioOptions" />
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col sm=12 md=4>
        <v-card>
          <v-card-title class="text-subtitle-1">
            週平均の陽性者数の推移
          </v-card-title>
          <line-chart
            :chartData="weeklyPatientTotalAverageDataSets"
            :chartOptions="weeklyPatientTotalAverageOptions" />
        </v-card>
      </v-col>

      <v-col sm=12 md=4>
        <v-card>
          <v-card-title class="text-subtitle-1">
            週平均の検査数と週平均の陽性者数の推移
          </v-card-title>
          <combo-chart
            :chartData="weeklyInspectionTotalAverageDataSets"
            :chartOptions="weeklyInspectionTotalAverageOptions" />
        </v-card>
      </v-col>
 
      <v-col sm=12 md=4>
        <v-card>
          <v-card-title class="text-subtitle-1">
            陽性者率の推移 (週別)
          </v-card-title>
          <line-chart
            :chartData="weeklyPatientRatioDataSets"
            :chartOptions="weeklyPatientRatioOptions" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions, createNamespacedHelpers } from 'vuex';
import LineChart from '~/components/LineChart.vue';
import ComboChart from '~/components/ComboChart.vue';

const {
  mapGetters: mapGettersOfDaily,
  mapActions: mapActionsOfDaily,
} = createNamespacedHelpers('daily');

const {
  mapGetters: mapGettersOfWeekly,
  mapActions: mapActionsOfWeekly,
} = createNamespacedHelpers('weekly');

export default {
  methods: {
    ...mapActions(['loadData']),
    ...mapActionsOfDaily({
      loadDailyData: 'loadData',
    }),
    ...mapActionsOfWeekly({
      loadWeeklyData: 'loadData',
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
    ]),
    ...mapGettersOfWeekly([
      'weeklyPatientRatioDataSets',
      'weeklyPatientRatioOptions',
      'weeklyPatientTotalAverageDataSets',
      'weeklyPatientTotalAverageOptions',
      'weeklyInspectionTotalAverageDataSets',
      'weeklyInspectionTotalAverageOptions',
    ])
  },
  async mounted() {
    await this.loadData();
    this.loadDailyData();
    this.loadWeeklyData();
  },
  components: {
    LineChart,
    ComboChart,
  },
};
</script>
