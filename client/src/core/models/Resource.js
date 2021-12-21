export default class {
  constructor() {
    this.data = {}
    this.isFetching = true
    this.isPrestine = true
    this.isLoading = false
    this.errorMessage = null
  }

  setData(val = {}) {
    this.data = val
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

  setErrorMessage(val = null) {
    this.errorMessage = val
  }

  isDisabled() {
    return this.isLoading || this.isPrestine
  }

  readyData(form) {
    let
      data = { ...this.data },
      formData = new FormData(form)

    data = formData

    return data
  }

  getData(fields = null) {
    if (!fields) return this.data
    let tempData = {}
    for (const key of Object.keys(this.data)) {
      if (!fields.includes(key)) continue
      tempData[key] = this.data[key]
    }

    return tempData
  }

  async request(options = { method: 'get', url: '' }) {
    this.load()
    let data = null
    try {
      const response = await window.axios(options)
      data = response.data
    } catch (err) {
      if (!err.response) console.error(err)
    } finally {
      this.fetch(false)
      this.load(false)
    }
    return data
  }
}