const Post = require('../models/post')
const asyncWrapper = require('../middleware/async')
const { customError } = require('../errors/custom-error')

const getPosts = asyncWrapper(async (req, res) => {
	const { threadId } = req.query
	const posts = await Post.find({ threadId: threadId })
	res.status(200).json({ posts })
})

const createPost = asyncWrapper(async (req, res) => {
	const post = await Post.create(req.body)
	res.status(201).json({ post })
})

const getPost = asyncWrapper(async (req, res, next) => {
	const { id } = req.params
	const post = await Post.findById({ _id: id })
	if (!post) {
		return next(customError(`No post with id : ${id}`, 404))
	}
	res.status(200).json({ post })
})

const updatePost = asyncWrapper(async (req, res, next) => {
	const { id } = req.params
	const post = await Post.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidation: true })
	if (!post) {
		return next(customError(`No post with id : ${id}`, 404))
	}
	res.status(200).json({ post })
})

const deletePost = asyncWrapper(async (req, res, next) => {
	const { id } = req.params
	const post = await Post.findOneAndDelete({ _id: id })
	if (!post) {
		return next(customError(`No post with id : ${id}`, 404))
	}
	res.status(200).json({ post })
})

module.exports = {
	getPosts,
	createPost,
	getPost,
	updatePost,
	deletePost,
}
