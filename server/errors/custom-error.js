class CustomApiError extends Error {
	constructor(message, statusCode) {
		super(message)
		this.statusCode = statusCode
	}
}

const customError = (message, statusCode) => {
	return new CustomApiError(message, statusCode)
}

module.exports = { customError, CustomApiError }
