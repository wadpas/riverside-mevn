const Forum = require('../models/forum')

const getForums = async (req, res) => {
	try {
		const posts = await Forum.find({})
		res.status(200).json(posts)
	} catch (error) {
		res.status(500).json(error)
	}
}

const createForum = async (req, res) => {
	try {
		const thread = await Forum.create(req.body)
		res.status(201).json(thread)
	} catch (error) {
		res.status(500).json(error.message)
	}
}

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
