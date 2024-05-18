const mongoose = require('mongoose')

const ForumSchema = new mongoose.Schema(
	{
		description: {
			type: String,
			required: [true, 'Description is required'],
			trim: true,
			maxlength: [100, 'Description can not be more than 100 characters'],
		},
		lastPostId: {
			type: mongoose.Types.ObjectId,
		},
		name: {
			type: String,
			required: [true, 'Name is required'],
			trim: true,
			maxlength: [20, 'Name can not be more than 20 characters'],
		},
		slug: {
			type: String,
			required: [true, 'Slug is required'],
			trim: true,
			maxlength: [20, 'Slug can not be more than 20 characters'],
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
