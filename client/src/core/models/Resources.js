import Resource from './Resource'

export default class extends Resource {
  constructor () {
    super()
    this.headers = []
    this.data = []
    this.search = ""
    this.options = {
      nextPage: null,
      page: 1,
      pages: {1: null},
      prevPage: null,
      totalItems: 0,
      totalPages: 1,
      itemsPerPage: 10
    }
    this.fetchCount = 0
  }

  updateData ( response ) {
    const { 
      list,
      itemsPerPage,
      nextPage,
      page,
      pages,
      prevPage,
      totalItems,
      totalPages
    } = response

    this.data = list

    this.options = {
      ...this.options,
      itemsPerPage,
      nextPage,
      page,
      pages,
      prevPage,
      totalItems,
      totalPages
    } 
  }

  async getResources ( options = null) {
    const data = await this.request( options )
    this.updateData( data )
    this.load( false )
  }

  optionsChanged ( options ) {
    if( this.isFetching ) return
    this.getResources( options )
  }
}