const Thread = require('../models/thread')

const getThreads = async (req, res) => {
	try {
		const threads = await Thread.find({})
		res.status(200).json(threads)
	} catch (error) {
		res.status(500).json(error)
	}
}

const createThread = async (req, res) => {
	try {
		const thread = await Thread.create(req.body)
		res.status(201).json(thread)
	} catch (error) {
		res.status(500).json(error.message)
	}
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
