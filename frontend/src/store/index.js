import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    user: {},
    loading: false,
    error: null,
  },
  getters: {
    isLoggedIn: (state) => Object.keys(state.user).length > 0,
    getUserRoles: (state) => state.user.roles || [],
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
  },
  mutations: {
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_USER(state, userData) {
      state.user = userData;
    },
    CLEAR_USER(state) {
      state.user = {};
    },
    CLEAR_ERROR(state) {
      state.error = null;
    },
  },
  actions: {
    async loginUser({ commit }, username) {
      commit("SET_LOADING", true);
      commit("CLEAR_ERROR");

      try {
        const response = await axios.post(
          `/api/users/login/${username}`,
          {},
          {
            headers: {
              token: username,
            },
          }
        );

        if (response.data) {
          commit("SET_USER", response.data);
          return response.data;
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Login failed";
        commit("SET_ERROR", errorMessage);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    logoutUser({ commit }) {
      commit("CLEAR_USER");
      commit("CLEAR_ERROR");
    },

    clearError({ commit }) {
      commit("CLEAR_ERROR");
    },
  },
  modules: {},
});
