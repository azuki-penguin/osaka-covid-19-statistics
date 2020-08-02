import axios from 'axios';
import * as dateFns from 'date-fns';

const DATA_JSON_URL = 'https://raw.githubusercontent.com/codeforosaka/covid19/master/data/data.json';

export function state() {
  return {
    patientsSummary: [],
    inspectionsSummary: [],
  };
};

export const mutations = {
  setPatientsSummary(state, { data }) {
    state.patientsSummary = data.map(x => ({
      date: dateFns.parseJSON(x["日付"]),
      count: x["小計"],
    }));
  },
  setInspectionsSummary(state, { data }) {
    state.inspectionsSummary = data.map(x => ({
      date: dateFns.parseJSON(x["日付"]),
      count: x["小計"],
    }));
  },
};

export const actions = {
  async loadData({ commit }) {
    const { data } = await axios.get(DATA_JSON_URL);
    const { patients_summary, inspections_summary } = data;
    commit('setPatientsSummary', { data: patients_summary.data });
    commit('setInspectionsSummary', { data: inspections_summary.data });
  },
};

