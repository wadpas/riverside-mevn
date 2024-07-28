const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema(
	{
		avatar: {
			type: String,
		},
		bio: {
			type: String,
			maxlength: [100, 'Bio can not be more than 100 characters'],
			trim: true,
		},
		email: {
			type: String,
			maxlength: [30, 'Email can not be more than 20 characters'],
			required: [true, 'Email is required'],
			trim: true,
		},
		lastVisitAt: {
			type: Date,
			default: Date.now,
		},
		name: {
			type: String,
			maxlength: [30, 'Name can not be more than 20 characters'],
			required: [true, 'Name is required'],
			trim: true,
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
			maxlength: [30, 'Username can not be more than 20 characters'],
			required: [true, 'Username is required'],
			trim: true,
		},
		usernameLower: {
			type: String,
			maxlength: [30, 'Username Lower can not be more than 20 characters'],
			trim: true,
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

UserSchema.pre('save', function (next) {
	this.password = bcrypt.hashSync(this.password, 10)
	next()
})

UserSchema.methods.createJWT = function () {
	return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME,
	})
}

UserSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)
