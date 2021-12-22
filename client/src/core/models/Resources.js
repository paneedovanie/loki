import Resource from './Resource'

export default class extends Resource {
  constructor () {
    super()
    this.headers = []
    this.data = []
    this.options = {
      search: '',
      page: 1,
      itemsPerPage: 10
    }
    this.fetchCount = 0
  }

  updateData ( { data, options} ) {
    this.data = data
    this.options = { ...this.options, ...options }
  }

  async getResources ( options = null, cb) {
    this.fetch()
    this.data = []
    const data = await this.request( options )
    this.updateData( data )
    this.fetch( false )
    if(cb)
      cb(this.options)
  }

  optionsChanged ( options ) {
    if( this.isFetching ) return
    this.getResources( options )
  }
}