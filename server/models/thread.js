const mongoose = require('mongoose')

const ThreadSchema = new mongoose.Schema(
	{
		contributors: [],
		firstPostId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		forumId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		lastPostAt: {
			type: Date,
			default: Date.now,
		},
		lastPostId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		posts: [],
		publishedAt: {
			type: Date,
			default: Date.now,
		},
		slug: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		userId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		_id: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
	},
	{
		versionKey: false,
	}
)

module.exports = mongoose.model('Thread', ThreadSchema)
