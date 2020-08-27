import axios from 'axios';
import * as dateFns from 'date-fns';

const DATA_JSON_URL = 'https://raw.githubusercontent.com/codeforosaka/covid19/master/data/data.json';

function parseAge(age)
{
  if (/^(\d+)代?$/.test(age)) {
    return Number(RegExp.$1);
  } else if (/^未?就学児$/.test(age)) {
    return 0;
  } else {
    return -1;
  }
}

export function state() {
  return {
    patientsSummary: [],
    inspectionsSummary: [],
    patientsDetails: [],
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
  setPatientsDetails(state, { data }) {
    state.patientsDetails = data.map(x => ({
      date: dateFns.parseJSON(x["リリース日"]),
      age: parseAge(x["年代"]),
      gender: x["性別"],
    }));
  },
};

export const actions = {
  async loadData({ commit }) {
    const { data } = await axios.get(DATA_JSON_URL);
    const { patients_summary, inspections_summary, patients } = data;
    commit('setPatientsSummary', { data: patients_summary.data });
    commit('setInspectionsSummary', { data: inspections_summary.data });
    commit('setPatientsDetails', { data: patients.data });
  },
};

