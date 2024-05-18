const mongoose = require('mongoose')

const ThreadSchema = new mongoose.Schema(
	{
		contributors: {
			type: [mongoose.Types.ObjectId],
		},
		firstPostId: {
			type: mongoose.Types.ObjectId,
		},
		forumId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		lastPostAt: {
			type: Date,
		},
		lastPostId: {
			type: mongoose.Types.ObjectId,
		},
		posts: {
			type: [mongoose.Types.ObjectId],
		},
		publishedAt: {
			type: Date,
			default: Date.now,
		},
		slug: {
			type: String,
			required: [true, 'Slug is required'],
			trim: true,
			maxlength: [20, 'Slug can not be more than 20 characters'],
		},
		title: {
			type: String,
			required: [true, 'Title is required'],
			trim: true,
			maxlength: [20, 'Title can not be more than 20 characters'],
		},
		userId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
	},
	{
		versionKey: false,
	}
)

module.exports = mongoose.model('Thread', ThreadSchema)
