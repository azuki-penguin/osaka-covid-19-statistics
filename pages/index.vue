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
        <v-card-title class="headline">
          大阪府新型コロナウイルス統計情報
        </v-card-title>
        <v-card-text>
          <p>
            <a href="https://github.com/codeforosaka/covid19">大阪府 新型コロナウイルス感染症対策サイトのGitHubリポジトリ</a>で公開されている統計データに基づいてデータをグラフ化しています。
          </p>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title class="text-subtitle-1">
          感染者数の推移
        </v-card-title>
        <daily-patient-total-line-chart :data="dailyPatientTotal" />
      </v-card>
      <v-card>
        <v-card-title class="text-subtitle-1">
          検査数と陽性者数の推移
        </v-card-title>
        <daily-inspection-total-combo-chart
          :patientsData="dailyPatientTotal"
          :inspectionsData="dailyInspectionTotal" />
      </v-card>
      <v-card>
        <v-card-title class="text-subtitle-1">
          陽性者率の推移
        </v-card-title>
        <daily-patient-ratio-line-chart :data="dailyPatientRatio" />
       <v-card>
        <v-card-title class="text-subtitle-1">
          陽性者の増減の推移
        </v-card-title>
        <daily-patient-total-comparison-line-chart
          :data="dailyPatientTotalComparison" />
      </v-card>
     </v-card>
      <v-card>
        <v-card-title class="text-subtitle-1">
          検査数の増減と陽性者数の増減推移
        </v-card-title>
        <daily-inspection-total-comparison-combo-chart
          :patientsData="dailyPatientTotalComparison"
          :inspectionsData="dailyInspectionTotalComparison" />
      </v-card>
      <v-card>
        <v-card-title class="text-subtitle-1">
          陽性者率の増減推移
        </v-card-title>
        <daily-patient-ratio-comparison-line-chart
          :data="dailyPatientRatioComparison" />
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import DailyPatientTotalLineChart from '~/components/DailyPatientTotalLineChart.vue';
import DailyInspectionTotalComboChart from '~/components/DailyInspectionTotalComboChart.vue';
import DailyPatientRatioLineChart from '~/components/DailyPatientRatioLineChart.vue';
import DailyPatientTotalComparisonLineChart from '~/components/DailyPatientTotalComparisonLineChart.vue';
import DailyInspectionTotalComparisonComboChart from '~/components/DailyInspectionTotalComparisonComboChart.vue';
import DailyPatientRatioComparisonLineChart from '~/components/DailyPatientRatioComparisonLineChart.vue';
import { mapState, mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['loadData']),
  },
  computed: {
    ...mapState([
      'dailyPatientTotal',
      'dailyInspectionTotal',
      'dailyPatientRatio',
      'dailyPatientTotalComparison',
      'dailyInspectionTotalComparison',
      'dailyPatientRatioComparison',
    ]),
  },
  mounted() {
    this.loadData();
  },
  components: {
    DailyPatientTotalLineChart,
    DailyInspectionTotalComboChart,
    DailyPatientRatioLineChart,
    DailyPatientTotalComparisonLineChart,
    DailyInspectionTotalComparisonComboChart,
    DailyPatientRatioComparisonLineChart,
  },
};
</script>
