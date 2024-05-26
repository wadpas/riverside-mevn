const Post = require('../models/post')
const asyncWrapper = require('../middleware/async')

const getPosts = asyncWrapper(async (req, res) => {
	const { threadId } = req.query
	const posts = await Post.find({ threadId: threadId })
	res.status(200).json(posts)
})

const createPost = asyncWrapper(async (req, res) => {
	const thread = await Post.create(req.body)
	res.status(201).json(thread)
})

const getPost = asyncWrapper(async (req, res) => {
	const { id } = req.params
	const post = await Post.findById({ _id: id })
	if (!post) {
		return res.status(404).json(`Post ${id} not found`)
	}
	res.status(200).json(post)
})

const updatePost = asyncWrapper(async (req, res) => {
	const { id } = req.params
	const thread = await Post.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidation: true })
	if (!thread) {
		return res.status(404).json(`Thread ${threadId} not found`)
	}
	res.status(200).json({ thread })
})

const deletePost = asyncWrapper(async (req, res) => {
	const { id } = req.params
	const user = await Post.findOneAndDelete({ _id: id })
	if (!user) {
		return res.status(404).json(`User ${id} not found`)
	}
	res.status(200).json(user)
})

module.exports = {
	getPosts,
	createPost,
	getPost,
	updatePost,
	deletePost,
}
