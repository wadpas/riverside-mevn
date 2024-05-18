const mongoose = require('mongoose')

const ForumSchema = new mongoose.Schema(
	{
		description: {
			type: String,
			required: [true, 'field is required'],
			trim: true,
			maxlength: [100, 'field can not be more than 100 characters'],
		},
		lastPostId: {
			type: mongoose.Types.ObjectId,
		},
		name: {
			type: String,
			required: [true, 'field is required'],
			trim: true,
			maxlength: [20, 'field can not be more than 20 characters'],
		},
		slug: {
			type: String,
			required: [true, 'field is required'],
			trim: true,
			maxlength: [20, 'field can not be more than 20 characters'],
		},
		threads: {
			type: [mongoose.Types.ObjectId],
		},
	},
	{
		versionKey: false,
	}
)

module.exports = mongoose.model('Forum', ForumSchema)
