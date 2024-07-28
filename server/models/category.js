const mongoose = require('mongoose')

const ForumSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			maxlength: [30, 'Name can not be more than 20 characters'],
			required: [true, 'Name is required'],
			trim: true,
		},
		slug: {
			type: String,
			maxlength: [30, 'Slug can not be more than 20 characters'],
			trim: true,
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
