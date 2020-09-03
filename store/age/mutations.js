import _ from 'lodash';
import * as dateFns from 'date-fns';

export default {
  setAgePatientsCount(state, { data }) {
    state.agePatientsCount = _.chain(data)
      .filter(x => x.age >= 0)
      .countBy('age')
      .map((value, key) => ({ age: Number(key), count: value }))
      .sortBy('age')
      .value();
  },
  setAgePatientsTotal(state, { patientsTotal, ageData }) {
    const ages = _.chain(ageData)
      .filter(x => x.age >= 0)
      .groupBy('age')
      .map((value, key) => ({ age: Number(key) }))
      .value();
    const dailyAgeData = _.groupBy(ageData, x => x.date.toJSON());
    state.dailyAgePatientsTotal = patientsTotal.map(x => ({
      ...x,
      ageCounts: _.chain(dailyAgeData[x.date.toJSON()] ?? [])
        .countBy('age')
        .map((value, key) => ({ age: Number(key), count: value }))
        .unionBy(ages, 'age')
        .value(),
    }));
  },
  setWeeklyAgePatientTotal(state, { patientsTotal, ageData }) {
    state.weeklyAgePatientsTotal = _.chain(state.dailyAgePatientsTotal)
      .chunk(7)
      .map(x => ({
        firstDate: _.minBy(x, 'date').date,
        lastDate: _.maxBy(x, 'date').date,
        totalCounts: _.sumBy(x, 'count'),
        ageCounts: x.reduce((acc, val) => _.chain(acc)
          .union(val.ageCounts), [])
          .groupBy('age')
          .map((value, key) => ({
            age: Number(key),
            count: value.reduce((acc, val) => acc + (val.count ?? 0), 0),
          }))
          .value(),
      }))
      .value();
  },
  calculateWeeklyAgePatientTotalAverage(state) {
    state.weeklyAgePatientsTotalAverage =
      state.weeklyAgePatientsTotal.map(x => ({
        ...x,
        ageCounts: x.ageCounts.map(data => ({
          age: data.age,
          count: Math.round(
            (data.count / dateFns.differenceInDays(x.lastDate, x.firstDate))
              * 100) / 100,
        })),
        totalCounts: Math.round(
          (x.totalCounts / dateFns.differenceInDays(x.lastDate, x.firstDate))
            * 100) / 100,
      }));
  },
};

