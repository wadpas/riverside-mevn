const { customError } = require('../errors/custom-error')

const notFound = (req, res, next) => {
	return next(customError(`Route ${req.path} not found`, 404))
}

module.exports = notFound
