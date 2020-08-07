export default {
  loadData({ commit, rootState }) {
    const { patientsSummary, inspectionsSummary } = rootState;
    commit('setWeeklyPatientTotal', { data: patientsSummary });
    commit('setWeeklyInspectionTotal', { data: inspectionsSummary });
    commit('calculateWeeklyPatientRatio');
    commit('calculateWeeklyPatientRatioComparison');
    commit('calculateWeeklyPatientTotalAverate');
    commit('calculateWeeklyInspectionTotalAverate');
    commit('calculateWeeklyPatientTotalAverateComparison');
    commit('calculateWeeklyInspectionTotalAverateComparison');
  },
};

