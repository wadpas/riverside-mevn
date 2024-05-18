const Forum = require('../models/forum')

const getForums = (req, res) => {
	res.status(201).json({ test: 'test' })
}

const createForum = async (req, res) => {
	const forum = await Forum.create(req.body)
	res.status(201).json({ forum })
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
