const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	movie_id: {
		type: ObjectId,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	}
})

module.exports = mongoose.model('Comment', CommentSchema)
