const Thread = require('../models/thread')

const getThreads = (req, res) => {
	res.send('All threads')
}

const createThread = async (req, res) => {
	const thread = await Thread.create(req.body)
	res.status(201).json({ thread })
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
