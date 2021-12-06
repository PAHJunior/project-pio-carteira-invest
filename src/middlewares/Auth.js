const createError = require('http-errors')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const auth = req.headers.authorization
    if (!auth) {
      next(createError(401))
    }

    const parts = auth.split(' ')

    if (!parts.length !== 2) {
      next(createError(401))
    }

    const [scheme, token] = parts

    if (!/^Beare$/i.test(scheme)) {
      next(createError(401))
    }

    jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
      if (err) {
        next(createError(401))
      }
      next()
    })
  } catch (error) {
    next(error)
  }
}
