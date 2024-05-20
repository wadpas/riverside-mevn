const Post = require('../models/post')

const getPosts = async (req, res) => {
	try {
		const posts = await Post.find({})
		res.status(200).json(posts)
	} catch (error) {
		res.status(500).json(error)
	}
}

const createPost = async (req, res) => {
	try {
		const thread = await Post.create(req.body)
		res.status(201).json(thread)
	} catch (error) {
		res.status(500).json(error.message)
	}
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
