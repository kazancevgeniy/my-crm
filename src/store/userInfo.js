import firebase from 'firebase/app';

export default {
  state: {
    userInfo: {
    },
  },
  getters: {
    userInfo: s => s.userInfo,
  },
  actions: {
    async updateInfo({ commit, dispatch, getters }, toUpdate) {
      try {
        const uId = await dispatch('getUid');
        const updateData = { ...getters.userInfo, ...toUpdate };
        await firebase.database().ref(`/users/${uId}/info`).update(updateData);
        commit('SET_USER', updateData);
      } catch (e) {
        commit('setError', e);
      }
    },
    async fetchUser({ commit, dispatch }) {
      try {
        const uId = await dispatch('getUid');
        const userInfo = (await firebase.database().ref(`/users/${uId}/info`).once('value')).val();
        commit('SET_USER', userInfo);
      } catch (e) {
        throw e;
      }
    },
  },
  mutations: {
    SET_USER(state, userInfo) {
      state.userInfo = userInfo;
    },
    CLEAR_USER(state) {
      state.userInfo = null;
    },
  },
};
