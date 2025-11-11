import { createStore } from "vuex";

export default createStore({
  state: {
    user: {},
  },
  getters: {
  },
  mutations: {
    setUser(state, userData) {
      state.user = userData;
    },
    clearUser(state) {
      state.user = {};
    },
  },
  actions: {
    async loginUser({ commit }, userData) {
      try {
        commit("setUser", userData);
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
  },
  modules: {
  },
});
