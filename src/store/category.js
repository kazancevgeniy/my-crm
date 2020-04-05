import firebase from 'firebase/app';

export default {
  state: {
    categories: null,
  },
  getters: {
    getCategories: state => state.categories,
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
  },
  actions: {
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid');
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {};
        const result = Object.keys(categories).map(key => ({ ...categories[key], id: key }));
        commit('SET_CATEGORIES', result);
        return result;
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch('getUid');
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({ title, limit });
        return { title, limit, id: category.key };
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async updateCategory({ commit, dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch('getUid');
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({ title, limit });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
  },
};
