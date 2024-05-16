const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		avatar: {
			type: String,
			required: true,
		},
		bio: {
			type: String,
		},
		email: {
			type: String,
			required: true,
		},
		lastVisitAt: {
			type: Date,
			default: Date.now,
		},
		name: {
			type: String,
			required: true,
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
			required: true,
		},
		usernameLower: {
			type: String,
			required: true,
		},
		_id: {
			type: mongoose.Types.ObjectId,
			required: true,
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
