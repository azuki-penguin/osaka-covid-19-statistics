import * as dateFns from 'date-fns';
import diff from '@/util/array/prototype/diff';

Array.prototype.diff = diff;

export default {
  setPatientTotal(state, { data }) {
    state.dailyPatientTotal = data.map(x => ({
      date: dateFns.parseJSON(x.date),
      count: x.count,
    }));
  },
  setInspectionTotal(state, { data }) {
    state.dailyInspectionTotal = data.map(x => ({
      date: dateFns.parseJSON(x.date),
      count: x.count,
    }));
  },
  calculateDailyPatientRatio(state) {
    state.dailyPatientRatio = state.dailyInspectionTotal.map(x => {
      const index = state.dailyPatientTotal
        .findIndex(y => dateFns.isEqual(y.date, x.date));
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
      .diff((x, y) => ({ date: y.date, count: y.count - x.count }))
  },
  calculateDailyPatientRatioComparison(state) {
    state.dailyPatientRatioComparison = state.dailyPatientRatio
      .diff((x, y) => ({ date: y.date, count: y.count - x.count }))
  },
  calculateDailyInspectionTotalComparison(state) {
    state.dailyInspectionTotalComparison = state.dailyInspectionTotal
      .diff((x, y) => ({ date: y.date, count: y.count - x.count }))
  },
};

