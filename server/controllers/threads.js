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

const getThread = async (req, res) => {
	try {
		const { id } = req.params
		const thread = await Thread.findById({ _id: id })
		if (!thread) {
			return res.status(404).json(`Thread ${id} not found`)
		}
		res.status(200).json(thread)
	} catch (error) {
		res.status(500).json(error)
	}
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
