const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
	{
		edited: {
			at: {
				type: Date,
			},
			by: {
				type: mongoose.Types.ObjectId,
			},
			moderated: {
				type: Boolean,
			},
		},
		publishedAt: {
			type: Date,
			default: Date.now,
		},
		text: {
			type: String,
			required: [true, 'field is required'],
			trim: true,
			maxlength: [200, 'field can not be more than 200 characters'],
		},
		threadId: {
			type: mongoose.Types.ObjectId,
			required: true,
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

module.exports = mongoose.model('Post', PostSchema)
