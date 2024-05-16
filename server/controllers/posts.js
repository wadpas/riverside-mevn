const Post = require('../models/post')

const getPosts = (req, res) => {
	res.send('All posts')
}

const createPost = async (req, res) => {
	res.status(201).json(req.body)
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
