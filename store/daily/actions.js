export default {
  loadData({ commit, rootState }) {
    const { patientsSummary, inspectionsSummary } = rootState;
    commit('setPatientTotal', { data: patientsSummary });
    commit('setInspectionTotal', { data: inspectionsSummary });
    commit('calculateDailyPatientRatio');
    commit('calculateDailyPatientTotalComparison');
    commit('calculateDailyInspectionTotalComparison');
    commit('calculateDailyPatientRatioComparison');
  },
};

