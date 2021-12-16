export default class {
  constructor() {
    this.data = {}
    this.errors = {}
    this.isFetching = false
    this.isPrestine = true
    this.response = null
    this.isLoading = true
  }

  async getResource(options) {
    const data = await this.request(options)
    this.data = data
    this.load(false)
  }

  async request(options = { method: 'get', url: '' }) {
    this.updateErrors()
    this.fetch()
    let data = null
    try {
      const response = await window.axios(options)
      data = response.data
    } catch (err) {
      if (!err.response) console.error(err)
      this.updateErrors(err.response ? err.response.data : err)
    } finally {
      this.fetch(false)
    }
    return data
  }

  fetch(val = true) {
    this.isFetching = val
  }

  load(val = true) {
    this.isLoading = val
  }

  prestine(val = true) {
    this.isPrestine = val
  }

  updateErrors(errors = {}) {
    this.errors = errors
  }

  setData(data = {}) {
    this.data = data
  }

  readyData(form) {
    let
      data = { ...this.data },
      formData = new FormData(form)

    data = formData

    return data
  }
}