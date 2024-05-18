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
			maxlength: [100, 'Bio can not be more than 100 characters'],
		},
		email: {
			type: String,
			trim: true,
			required: true,
			maxlength: [20, 'Email can not be more than 20 characters'],
		},
		lastVisitAt: {
			type: Date,
			default: Date.now,
		},
		name: {
			type: String,
			required: [true, 'Name is required'],
			trim: true,
			maxlength: [20, 'Name can not be more than 20 characters'],
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
			required: [true, 'Username is required'],
			trim: true,
			maxlength: [20, 'Username can not be more than 20 characters'],
		},
		usernameLower: {
			type: String,
			required: [true, 'UsernameLower is required'],
			trim: true,
			maxlength: [20, 'UsernameLower can not be more than 20 characters'],
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
