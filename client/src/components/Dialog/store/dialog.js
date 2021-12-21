export default {
  namespaced: true,

  state: () => ({
    model: false,
    component: null
  }),

  getters: {
    dialog: (state) => state
  },

  mutations: {
    TOGGLE: (state) => {
      state.model = !state.model
    },

    SET: (state, payload) => {
      state = payload
    }
  },

  actions: {
    toggle: ({ commit }) => {
      commit('TOGGLE')
    },

    set: ({ commit }, payload) => {
      commit('SET', payload)
    }
  }
}