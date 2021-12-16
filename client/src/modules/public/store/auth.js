import axios from "axios";
import api from "../config/api";

const state = () => ({
  auth: {
    token: null,
    user: null,
  },
});

const getters = {
  auth: (state) => state.auth,
  isAuthenticated: (state) => state.auth.token && state.auth.user && true,
};

const mutations = {
  SET_TOKEN(state, payload) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${payload}`;
    state.auth.token = payload;
    window.axios = axios;
  },

  SET_USER(state, payload) {
    state.auth.user = payload;
  },

  SAVE_CREDENTIAL(state, payload) {
    localStorage.setItem("token", payload.token);
    localStorage.setItem("data", JSON.stringify(payload.user));
  },

  CLEAR_CREDENTIAL(state) {
    state.auth = { token: null, user: null };
    localStorage.clear();
  },
};

const actions = {
  checkForCreds: async ({ commit }) => {
    return new Promise((res) => {
      const lsToken = localStorage.getItem("token"),
        lsData = localStorage.getItem("data");

      if (!lsToken || !lsData) return res(commit("CLEAR_CREDENTIAL"));

      axios
        .get(api.session(), {
          headers: { Authorization: `Bearer ${lsToken}` },
        })
        .then(() => {
          const user = JSON.parse(lsData);

          commit("SET_TOKEN", lsToken);
          commit("SET_USER", user);
        })
        .catch(() => commit("CLEAR_CREDENTIAL"))
        .finally(() => res());
    });
  },

  login: ({ commit }, payload) => {
    return new Promise((res, rej) => {
      axios
        .post(api.login(), payload)
        .then((response) => {
          commit("SAVE_CREDENTIAL", response.data);
          commit("SET_TOKEN", response.data.token);
          commit("SET_USER", response.data.user);
          res(response.data);
        })
        .catch((err) => rej(err));
    });
  },

  register: (fix, payload) => {
    return new Promise((res, rej) => {
      axios
        .post(api.register(), payload)
        .then((response) => {
          res(response.data);
        })
        .catch((err) => rej(err));
    });
  },

  sso: ({ commit }, payload) => {
    return new Promise((res, rej) => {
      axios
        .post(api.sso(), payload)
        .then((response) => {
          commit("SAVE_CREDENTIAL", response.data);
          commit("SET_TOKEN", response.data.token);
          commit("SET_USER", response.data.user);
          res(response.data);
        })
        .catch((err) => rej(err));
    });
  },

  password: (fix, payload) => {
    return new Promise((res, rej) => {
      axios
        .patch(api.password(), payload)
        .then((response) => {
          res(response.data);
        })
        .catch((err) => rej(err));
    });
  },

  update: ({ commit, state }, payload) => {
    return new Promise((res, rej) => {
      axios
        .patch(api.update(), payload)
        .then((response) => {
          commit("SET_USER", response.data);
          commit("SAVE_CREDENTIAL", {
            token: state.auth.token,
            user: state.auth.user,
          });
          res(response.data);
        })
        .catch((err) => rej(err));
    });
  },

  logout: ({ commit }) => {
    commit("CLEAR_CREDENTIAL");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
