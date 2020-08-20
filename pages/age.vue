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
  </v-container>
</template>

<script>
import { mapState, mapActions, createNamespacedHelpers } from 'vuex';
import PieChart from '~/components/PieChart.vue';

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
    ]),
  },
  async mounted() {
    await this.loadData();
   this.loadAgeData();
  },
  components: {
   PieChart,
  },
};
</script>
