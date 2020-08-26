export default {
  loadData({ commit, rootState }) {
    const { patientsDetails, patientsSummary } = rootState;
    commit('setAgePatientsCount', { data: patientsDetails });
    commit('setAgePatientsTotal', {
      patientsTotal: patientsSummary,
      ageData: patientsDetails,
    });
  },
};

