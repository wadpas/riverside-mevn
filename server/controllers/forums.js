const Forum = require('../models/forum')
const asyncWrapper = require('../middleware/async')

const getForums = asyncWrapper(async (req, res) => {
	const posts = await Forum.find({})
	res.status(200).json(posts)
})

const createForum = asyncWrapper(async (req, res) => {
	const thread = await Forum.create(req.body)
	res.status(201).json(thread)
})

const getForum = (req, res) => {
	res.json({ id: req.params.id })
}

const updateForum = (req, res) => {
	res.send('Update forum')
}

const deleteForum = (req, res) => {
	res.send('Delete forum')
}

module.exports = {
	getForums,
	createForum,
	getForum,
	updateForum,
	deleteForum,
}
