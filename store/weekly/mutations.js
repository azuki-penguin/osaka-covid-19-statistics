import * as dateFns from 'date-fns';
import _ from 'lodash';
import diff from '@/util/array/prototype/diff';

Array.prototype.diff = diff;

export default {
  setWeeklyPatientTotal(state, { data }) {
    state.weeklyPatientTotal = _.chain(data)
      .chunk(7)
      .map(x => ({
        length: x.length,
        firstDate: _.minBy(x, val => val.date).date,
        lastDate: _.maxBy(x, val => val.date).date,
        count: x.reduce((acc, val) => val.count + acc, 0),
      }))
      .value();
  },
  setWeeklyInspectionTotal(state, { data }) {
    state.weeklyInspectionTotal = _.chain(data)
      .chunk(7)
      .map(x => ({
        length: x.length,
        firstDate: _.minBy(x, val => val.date).date,
        lastDate: _.maxBy(x, val => val.date).date,
        count: x.reduce((acc, val) => val.count + acc, 0),
      }))
      .value();
  },
  calculateWeeklyPatientTotalAverate(state) {
    state.weeklyPatientTotalAverage = state.weeklyPatientTotal.map(x => ({
      ...x,
      count: Math.round((x.count / x.length) * 100) / 100,
    }));
  },
  calculateWeeklyInspectionTotalAverate(state) {
    state.weeklyInspectionTotalAverage =
      state.weeklyInspectionTotal.map(x => ({
        ...x,
        count: Math.round(
          (x.count / x.length) * 100) / 100,
      }));
  },
  calculateWeeklyPatientRatio(state) {
    state.weeklyPatientRatio = state.weeklyInspectionTotal.map(x => {
      const index = state.weeklyPatientTotal
        .findIndex(
          y => dateFns.isEqual(y.firstDate, x.firstDate)
            && dateFns.isEqual(y.lastDate, x.lastDate)
        );
      if (index < 0) {
        console.error(`the patient data not found at ${x.date}.`);
        return;
      }
      const patientCount = state.weeklyPatientTotal[index].count;
      const inspectionCount = x.count;
      return {
        firstDate: x.firstDate,
        lastDate: x.lastDate,
        count: inspectionCount > 0 ? patientCount / inspectionCount : 0,
      };
    });
  },
  calculateWeeklyPatientRatioComparison(state) {
    state.weeklyPatientRatioComparison = state.weeklyPatientRatio
      .diff((x, y) => ({
        firstDate: y.firstDate,
        lastDate: y.lastDate,
        count: y.count - x.count,
      }))
  },
  calculateWeeklyPatientTotalAverateComparison(state) {
    state.weeklyPatientTotalAverageComparison =
      state.weeklyPatientTotalAverage.diff((x, y) => ({
        firstDate: y.firstDate,
        lastDate: y.lastDate,
        count: y.count - x.count,
      }));
  },
  calculateWeeklyInspectionTotalAverateComparison(state) {
    state.weeklyInspectionTotalAverageComparison =
      state.weeklyInspectionTotalAverage.diff((x, y) => ({
        firstDate: y.firstDate,
        lastDate: y.lastDate,
        count: y.count - x.count,
      }));
  },
};

