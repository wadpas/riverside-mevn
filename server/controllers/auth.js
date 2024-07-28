const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
	const user = await User.create({ ...req.body })

	res.send({
		message: 'register',
	})
}

const login = async (req, res) => {
	res.send({
		message: 'login',
	})
}

module.exports = { register, login }
