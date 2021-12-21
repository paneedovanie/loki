const
  BaseController = require(`./base.controller`)

module.exports = class extends BaseController {
  constructor() {
    super()
  }

  async index(req, res) {
    this.apiResponse(res, async () => {
      return this.service.index(req.query)
    }, this.statusCode.OK)
  }

  async store(req, res) {
    this.apiResponse(res, async () => {
      return this.service.store(req.body)
    }, this.statusCode.CREATED)
  }

  async read(req, res) {
    this.apiResponse(res, async () => {
      return this.service.read(req.params.id)
    }, this.statusCode.OK)
  }

  async update(req, res) {
    this.apiResponse(res, async () => {
      return this.service.update(req.params.id, req.body)
    }, this.statusCode.ACCEPTED)
  }

  async deletePermanently(req, res) {
    this.apiResponse(res, async () => {
      return this.service.deletePermanently(req.body.ids || req.params.id)
    }, this.statusCode.ACCEPTED)
  }

  async trashed(req, res) {
    this.apiResponse(res, async () => {
      return this.service.trashed(req.query)
    }, this.statusCode.ACCEPTED)
  }

  async trash(req, res) {
    this.apiResponse(res, async () => {
      return this.service.trash(req.body.ids || req.params.id)
    }, this.statusCode.ACCEPTED)
  }

  async restore(req, res) {
    this.apiResponse(res, async () => {
      return this.service.restore(req.body.ids || req.params.id)
    }, this.statusCode.ACCEPTED)
  }
}