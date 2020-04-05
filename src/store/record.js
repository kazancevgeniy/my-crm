import firebase from 'firebase/app';

export default {
  state: {
    records: null,
  },
  getters: {
    getRecords: state => state.records,
  },
  actions: {
    async createRecord({ commit, dispatch }, record) {
      try {
        const uid = await dispatch('getUid');
        return await firebase.database().ref(`/users/${uid}/records`).push(record);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchRecords({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid');
        const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {};
        const result = Object.keys(records).map(key => ({ ...records[key], id: key }));
        commit('SET_RECORDS', result);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
  },
  mutations: {
    SET_RECORDS(state, records) {
      state.records = records;
    },
  },
};
