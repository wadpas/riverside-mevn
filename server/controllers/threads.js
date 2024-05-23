const Thread = require('../models/thread')
const asyncWrapper = require('../middleware/async')

const getThreads = asyncWrapper(async (req, res) => {
	const threads = await Thread.find({})
	res.status(200).json(threads)
})

const createThread = asyncWrapper(async (req, res) => {
	const thread = await Thread.create(req.body)
	res.status(201).json(thread)
})

const getThread = asyncWrapper(async (req, res) => {
	const { id } = req.params
	const thread = await Thread.findById({ _id: id })
	if (!thread) {
		return res.status(404).json(`Thread ${id} not found`)
	}
	res.status(200).json(thread)
})

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
