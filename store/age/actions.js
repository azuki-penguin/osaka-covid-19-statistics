export default {
  loadData({ commit, rootState }) {
    const { patientsDetails } = rootState;
    commit('setAgePatientsCount', { data: patientsDetails });
  },
};

