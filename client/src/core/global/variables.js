import axios from 'axios'
export default {
  axios,
  formatTo: ( component, name = 'dashboard', params = {}, query = {} ) => {
    return {
      name,
      params,
      query: { ...query, from: component.$route.fullPath }
    }
  }
}