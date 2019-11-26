import firebase from 'firebase';

export default {
  store: {

  },
  getters: {

  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    async login({ commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        throw e;
      }
    },
  },
  mutations: {

  },
};
