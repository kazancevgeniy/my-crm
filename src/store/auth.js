/* eslint-disable no-unused-vars */
import firebase from 'firebase';

export default {
  store: {

  },
  getters: {

  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async logout({ commit }) {
      try {
        await firebase.auth().signOut();
        commit('CLEAR_USER');
      } catch (e) {
        console.log(e);
      }
    },
    async register({ commit, dispatch }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch('getUid');
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name,
        });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
  },
  mutations: {

  },
};
