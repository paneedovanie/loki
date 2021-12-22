export default {
  namespaced: true,

  state: () => ({
    model: true
  }),

  getters: {
    model: (state) => {
      return state.model
    }
  },

  mutations: {
    TOGGLE: (state) => {
      state.model = !state.model
    },

    SET_MODEL: (state, payload) => {
      state.model = payload
    }
  },

  actions: {
    toggle: ({ commit }) => {
      commit('TOGGLE')
    },

    setModel: ({ commit }, payload) => {
      commit('SET_MODEL', payload)
    }
  }
}