const User = require('../models/user')
const asyncWrapper = require('../middleware/async')
const { customError } = require('../errors/custom-error')

const getUsers = asyncWrapper(async (req, res) => {
	const users = await User.find({})
	res.status(200).json(users)
})

const createUser = asyncWrapper(async (req, res) => {
	const user = await User.create(req.body)
	res.status(201).json(user)
})

const getUser = asyncWrapper(async (req, res, next) => {
	const { id } = req.params
	const user = await User.findById({ _id: id })
	if (!user) {
		return next(customError(`No user with id : ${id}`, 404))
	}
	res.status(200).json(user)
})

const updateUser = asyncWrapper(async (req, res, next) => {
	const { id } = req.params
	const user = await User.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidation: true })
	if (!user) {
		return next(customError(`No user with id : ${id}`, 404))
	}
	res.status(200).json({ user })
})

const deleteUser = asyncWrapper(async (req, res, next) => {
	const { id } = req.params
	const user = await User.findOneAndDelete({ _id: id })
	if (!user) {
		return next(customError(`No user with id : ${id}`, 404))
	}
	res.status(200).json(user)
})

module.exports = {
	getUsers,
	createUser,
	getUser,
	updateUser,
	deleteUser,
}

// await User.insertMany(
// 	users.map((user) => ({
// 		avatar: user.avatar,
// 		email: user.email,
// 		lastVisitAt: moment(user.lastVisitAt * 1050).format(),
// 		name: user.name,
// 		isModerator: user.isModerator,
// 		registeredAt: moment(user.registeredAt * 1050).format(),
// 		username: user.username,
// 		usernameLower: user.usernameLower,
// 		_id: new mongoose.Types.ObjectId(user._id?.slice(16)),
// 		postsCount: user.postsCount,
// 		threads: user.threads?.map((th) => new mongoose.Types.ObjectId(th.slice(8))),
// 	}))
// )
