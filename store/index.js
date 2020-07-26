import axios from 'axios';

const DATA_JSON_URL = 'https://raw.githubusercontent.com/codeforosaka/covid19/master/data/data.json';

Array.prototype.diff = function(callback) {
  const arr = this;
  if (arr.length < 2) return [];
  const diffArr = [];
  for (let i = 1; i < arr.length; i++) {
    diffArr.push(callback(arr[i-1], arr[i]));
  }
  return diffArr;
};

export function state() {
  return {
    dailyPatientTotal: [],
    dailyPatientRatio: [],
    dailyInspectionTotal: [],
    dailyPatientTotalComparison: [],
    dailyPatientRatioComparison: [],
    dailyInspectionTotalComparison: [],
  };
};

export const mutations = {
  setPatientTotal(state, { data }) {
    state.dailyPatientTotal = data.map(x => ({
      date: x["日付"],
      count: x["小計"],
    }));
  },
  setInspectionTotal(state, { data }) {
    state.dailyInspectionTotal = data.map(x => ({
      date: x["日付"],
      count: x["小計"],
    }));
  },
  calculateDailyPatientRatio(state) {
    state.dailyPatientRatio = state.dailyInspectionTotal.map(x => {
      const index = state.dailyPatientTotal
        .findIndex(y => y.date === x.date);
      if (index < 0) {
        console.error(`the patient data not found at ${x.date}.`);
        return;
      }
      const patientCount = state.dailyPatientTotal[index].count;
      const inspectionCount = x.count;
      return {
        date: x.date,
        count: inspectionCount > 0 ? patientCount / inspectionCount : 0,
      };
    });
  },
  calculateDailyPatientTotalComparison(state) {
    state.dailyPatientTotalComparison = state.dailyPatientTotal
      .diff((x, y) => y.count - x.count)
  },
  calculateDailyPatientRatioComparison(state) {
    state.dailyPatientRatioComparison = state.dailyPatientRatio
      .diff((x, y) => y.count - x.count)
  },
  calculateDailyInspectionTotalComparison(state) {
    state.dailyInspectionTotalComparison = state.dailyInspectionTotal
      .diff((x, y) => y.count - x.count)
  },
};

export const actions = {
  async loadData({ commit }) {
    const { data } = await axios.get(DATA_JSON_URL);
    const { patients_summary, inspections_summary } = data;
    commit('setPatientTotal', { data: patients_summary.data });
    commit('setInspectionTotal', { data: inspections_summary.data });
    commit('calculateDailyPatientRatio');
    commit('calculateDailyPatientTotalComparison');
    commit('calculateDailyInspectionTotalComparison');
    commit('calculateDailyPatientRatioComparison');
  },
};

