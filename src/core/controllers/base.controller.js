module.exports = class BaseController {
  constructor() {
    this.service = null

    this.statusCode = {
      OK: 200,
      CREATED: 201,
      ACCEPTED: 202,
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
      SERVER_ERROR: 500
    }

    this.apiResponse = async function (
      res,
      fun,
      statusCode
    ) {
      try {
        res.status(statusCode).json(await fun())
      } catch (err) {
        if (err.name === 'Unauthorized')
          statusCode = this.statusCode.UNAUTHORIZED
        else if (err.name === 'ValidationError')
          statusCode = this.statusCode.BAD_REQUEST
        else
          statusCode = this.statusCode.SERVER_ERROR
        res.status(statusCode).json(apiError(err))
      }

    }
  }
}

function apiError(err) {
  return {
    ...err,
    name: err.name,
    message: err.message,
    details: err.details
  }
}