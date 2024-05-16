const Forum = require('../models/forum')

const getForums = (req, res) => {
	res.send('All forums')
}

const createForum = async (req, res) => {
	res.status(201).json(req.body)
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
