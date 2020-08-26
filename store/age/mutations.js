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
};

