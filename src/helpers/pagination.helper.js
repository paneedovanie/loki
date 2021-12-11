const ObjectId = require('mongoose').Types.ObjectId

module.exports = class {
  constructor(service, populate) {
    this.service = service
    this.populate = populate
  }

  async paginate(query, itemsPerPage, page, lastId) {
    let
      pages = { 1: null },
      list = [],
      prevPage = null,
      nextPage = null,
      iIdPrev = lastId,
      iIdNext = lastId

    pages[page] = lastId

    const
      totalItems = await this.service.read(query).countDocuments(),
      totalPages = itemsPerPage > -1 ? Math.ceil(totalItems / itemsPerPage) : 1,
      remainder = totalItems % itemsPerPage

    for (let i = 1; i < 3; i++) {
      const iPage = page - i
      if (iPage < 1) break
      const result = await this.getPrevPage(query, itemsPerPage, iIdPrev)
      if (!prevPage) prevPage = iPage
      if (iPage !== 1)
        pages[iPage] = result.id
      iIdPrev = result.id
    }

    for (let i = 1; i < 3; i++) {
      const iPage = page + i
      const result = await this.getNextPage(query, itemsPerPage, iIdNext)
      if (result.list.length && i === 1)
        list = result.list
      if (!result.id || iPage > totalPages) break
      if (!nextPage) nextPage = iPage
      pages[iPage] = result.id
      iIdNext = result.id
    }

    delete query._id

    if (page < totalPages)
      pages[totalPages] = await this.getLastPage(query, remainder || itemsPerPage)

    return {
      list,
      itemsPerPage,
      totalItems,
      totalPages,
      page,
      prevPage,
      nextPage,
      pages,
      lastId
    }
  }

  async getPrevPage(query, itemsPerPage, lastId) {
    let
      id = null,
      ipp = itemsPerPage > -1 ? itemsPerPage + 1 : null
    if (lastId) query._id = { $lte: new ObjectId(lastId) }
    const list = await this.service.read(query).sort({ _id: -1 }).limit(ipp)
    if (list.length === ipp) id = list[list.length - 1]._id
    return {
      list,
      id
    }
  }

  async getNextPage(query, itemsPerPage, lastId) {
    let
      id = null,
      ipp = itemsPerPage > -1 ? itemsPerPage : null
    if (lastId) query._id = { $gt: new ObjectId(lastId) }
    const list = await this.service.read(query, this.populate).limit(ipp)
    if (list.length === ipp + 1) id = list[list.length - 1]._id
    return {
      list,
      id
    }
  }

  async getLastPage(query, remainder) {
    const result = await this.service.read(query).sort({ _id: -1 }).limit(remainder + 1)
    return result[result.length - 1]._id
  }
}