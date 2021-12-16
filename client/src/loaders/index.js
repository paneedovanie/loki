import '../components'
import '../plugins/vee-validate';
import '@/styles/index.scss'
import axios from 'axios'
import Vue from 'vue'
import wsLoader from './websocket'
import eventLoader from './event'
import subscriberLoader from './subscriber'

window.events = eventLoader()
window.ws = wsLoader()
subscriberLoader()

Vue.mixin({
  data: function () {
    return {
      events: window.events,
      axios,
      formatTo: (component, name = 'dashboard', params = {}, query = {}) => {
        return {
          name,
          params,
          query: { ...query, from: component.$route.fullPath }
        }
      },
      ws: window.ws
    }
  }
})