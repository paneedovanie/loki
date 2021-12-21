export default {
  namespaced: true,

  state: () => ({
    model: false,
    text: '',
    color: null,
    timeout: 5000
  }),

  getters: {
    snackbar: (state) =>  state,
    model: (state) => state.model
  },

  mutations: {
    SET: (state, payload) => {
      state.model = payload.model
      state.text = payload.text
      state.color = payload.color
      state.timeout = payload.timeout
    },

    HIDE: (state) => {
      state.model = false
    }
  },

  actions: {
    set: ({ commit }, payload) => {
      commit('SET', payload)
    },
    
    hide: ({ commit }) => {
      commit('HIDE')
    }
  }
}