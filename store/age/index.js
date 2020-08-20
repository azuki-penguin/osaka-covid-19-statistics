import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export const age = {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};

