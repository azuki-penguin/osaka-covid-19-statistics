import _ from 'lodash';

export default {
  setAgePatientsCount(state, { data }) {
    state.agePatientsCount = _.chain(data)
      .filter(x => x.age >= 0)
      .countBy('age')
      .map((value, key) => ({ age: Number(key), count: value }))
      .sortBy('age')
      .value();
  },
};

