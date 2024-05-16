const mongoose = require('mongoose')

const ForumSchema = new mongoose.Schema(
	{
		description: {
			type: String,
			required: true,
		},
		lastPostId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			required: true,
		},
		threads: [],
		_id: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
	},
	{
		versionKey: false,
	}
)

module.exports = mongoose.model('Forum', ForumSchema)
