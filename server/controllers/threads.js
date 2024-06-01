const Thread = require('../models/thread')
const asyncWrapper = require('../middleware/async')

const getThreads = asyncWrapper(async (req, res) => {
	const threads = await Thread.find(req.query)
	res.status(200).json({ threads })
})

const createThread = asyncWrapper(async (req, res) => {
	const thread = await Thread.create(req.body)
	res.status(201).json({ thread })
})

const getThread = asyncWrapper(async (req, res) => {
	const { id } = req.params
	const thread = await Thread.findById({ _id: id })
	if (!thread) {
		return res.status(404).json(`Thread ${id} not found`)
	}
	res.status(200).json({ thread })
})

const updateThread = asyncWrapper(async (req, res) => {
	const { id } = req.params
	const thread = await Thread.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidation: true })
	if (!thread) {
		return res.status(404).json(`Thread ${threadId} not found`)
	}
	res.status(200).json({ thread })
})

const deleteThread = asyncWrapper(async (req, res, next) => {
	const { id } = req.params
	const thread = await Thread.findOneAndDelete({ _id: id })
	if (!thread) {
		return next(customError(`No thread with id : ${id}`, 404))
	}
	res.status(200).json({ thread })
})

module.exports = {
	getThreads,
	createThread,
	getThread,
	updateThread,
	deleteThread,
}
