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
        <v-card-title class="">
          感染者数の推移
        </v-card-title>
        <daily-patient-total-line-chart />
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import DailyPatientTotalLineChart from '~/components/DailyPatientTotalLineChart.vue';
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['loadData']),
  },
  mounted() {
    this.loadData();
  },
  components: {
    DailyPatientTotalLineChart,
  },
};
</script>
