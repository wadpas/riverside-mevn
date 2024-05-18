const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		avatar: {
			type: String,
			required: true,
		},
		bio: {
			type: String,
			trim: true,
			maxlength: [100, 'field can not be more than 100 characters'],
		},
		email: {
			type: String,
			trim: true,
			required: true,
			maxlength: [20, 'field can not be more than 20 characters'],
		},
		lastVisitAt: {
			type: Date,
			default: Date.now,
		},
		name: {
			type: String,
			required: [true, 'field is required'],
			trim: true,
			maxlength: [20, 'field can not be more than 20 characters'],
		},
		isModerator: {
			type: Boolean,
		},
		registeredAt: {
			type: Date,
			default: Date.now,
		},
		username: {
			type: String,
			required: [true, 'field is required'],
			trim: true,
			maxlength: [20, 'field can not be more than 20 characters'],
		},
		usernameLower: {
			type: String,
			required: [true, 'field is required'],
			trim: true,
			maxlength: [20, 'field can not be more than 20 characters'],
		},
		postsCount: {
			type: Number,
			default: 0,
		},
		threads: {
			type: [mongoose.Types.ObjectId],
		},
	},
	{
		versionKey: false,
	}
)

module.exports = mongoose.model('User', UserSchema)
