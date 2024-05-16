const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
	{
		edited: {
			at: {
				type: Date,
				default: Date.now,
			},
			by: {
				type: mongoose.Types.ObjectId,
				required: true,
			},
			moderated: {
				type: Boolean,
				default: false,
			},
		},
		publishedAt: {
			type: Date,
			default: Date.now,
		},
		text: {
			type: String,
			required: true,
		},
		threadId: {
			type: mongoose.Types.ObjectId,
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

module.exports = mongoose.model('Post', PostSchema)
