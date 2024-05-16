const Thread = require('../models/thread')

const getThreads = (req, res) => {
	res.send('All threads')
}

const createThread = async (req, res) => {
	res.status(201).json(req.body)
}

const getThread = (req, res) => {
	res.json({ id: req.params.id })
}

const updateThread = (req, res) => {
	res.send('Update thread')
}

const deleteThread = (req, res) => {
	res.send('Delete thread')
}

module.exports = {
	getThreads,
	createThread,
	getThread,
	updateThread,
	deleteThread,
}
