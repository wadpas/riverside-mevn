const Forum = require('../models/forum')
const Movie = require('../models/movie')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const year = 2015
const limit = 24

const getMovies = async (req, res) => {
	const movies = await Movie.find({ year: year }).limit(limit)
	res.status(StatusCodes.OK).json({ movies, count: movies.length })
}

const getForum = async (req, res) => {
	const { id: forumId } = req.params
	const forum = await Forum.findById({ _id: forumId })
	if (!forum) {
		throw new NotFoundError(`No forum with id ${forumId}`)
	}
	res.status(StatusCodes.OK).json({ forum })
}

const createForum = async (req, res) => {
	req.body.createdBy = req.user.userId
	const forum = await Forum.create(req.body)
	res.status(StatusCodes.CREATED).json({ forum })
}

const updateForum = async (req, res) => {
	const {
		body: { description, name },
		params: { id: forumId },
		user: { userId },
	} = req
	if (description === '' || name === '') {
		throw new BadRequestError('Description and name fields cannot be empty')
	}
	const forum = await Forum.findOneAndUpdate({ _id: forumId, createdBy: userId }, req.body, {
		new: true,
		runValidation: true,
	})
	if (!forum) {
		throw new NotFoundError(`No forum with id ${forumId}`)
	}
	res.status(StatusCodes.OK).json({ forum })
}

const deleteForum = async (req, res) => {
	const {
		user: { userId },
		params: { id: forumId },
	} = req
	const forum = await Forum.findOneAndDelete({ _id: forumId, createdBy: userId })
	if (!forum) {
		throw new NotFoundError(`No forum with id ${forumId}`)
	}
	res.status(StatusCodes.OK).send()
}

module.exports = {
	getMovies,
	createForum,
	getForum,
	updateForum,
	deleteForum,
}
