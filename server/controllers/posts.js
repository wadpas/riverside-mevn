const Post = require('../models/post')

const getPosts = (req, res) => {
	res.send('All posts')
}

const createPost = async (req, res) => {
	const post = await Post.create(req.body)
	res.status(201).json({ post })
}

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
