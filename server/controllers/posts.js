const Post = require('../models/post')
const asyncWrapper = require('../middleware/async')

const getPosts = asyncWrapper(async (req, res) => {
	const posts = await Post.find({})
	res.status(200).json(posts)
})

const createPost = asyncWrapper(async (req, res) => {
	const thread = await Post.create(req.body)
	res.status(201).json(thread)
})

const getPost = (req, res) => {
	res.json({ id: req.params.id })
}

const updatePost = (req, res) => {
	res.send('Update post')
}

const deletePost = (req, res) => {
	res.send('Delete post')
}

module.exports = {
	getPosts,
	createPost,
	getPost,
	updatePost,
	deletePost,
}
