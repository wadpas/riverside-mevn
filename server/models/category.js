const mongoose = require('mongoose')

const ForumSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'field is required'],
			trim: true,
			maxlength: [30, 'field can not be more than 20 characters'],
		},
		slug: {
			type: String,
			required: [true, 'field is required'],
			trim: true,
			maxlength: [30, 'field can not be more than 20 characters'],
		},
		forums: {
			type: [mongoose.Types.ObjectId],
		},
	},
	{
		versionKey: false,
	}
)

module.exports = mongoose.model('Category', ForumSchema)
