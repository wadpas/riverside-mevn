const User = require('../models/user')

const getUsers = async (req, res) => {
	try {
		const users = await User.find({})
		res.status(200).json(users)
	} catch (error) {
		res.status(500).json(error)
	}
}

const createUser = async (req, res) => {
	try {
		const user = await User.create(req.body)
		res.status(201).json(user)
	} catch (error) {
		res.status(500).json(error.message)
	}
}

const getUser = async (req, res) => {
	try {
		const { id } = req.params
		const user = await User.findById({ _id: id })
		if (!user) {
			return res.status(404).json(`User ${id} not found`)
		}
		res.status(200).json(user)
	} catch (error) {
		res.status(500).json(error)
	}
}

const updateUser = async (req, res) => {
	try {
		const { id: UserId } = req.params
		const user = await User.findOneAndUpdate({ _id: UserId }, req.body, { new: true, runValidation: true })
		if (!user) {
			return res.status(404).json(`User ${UserId} not found`)
		}
		res.status(200).json({ user })
	} catch (error) {
		res.status(500).json({ error })
	}
}

const deleteUser = async (req, res) => {
	try {
		const { id } = req.params
		const user = await User.findOneAndDelete({ _id: id })
		if (!user) {
			return res.status(404).json(`User ${id} not found`)
		}
		res.status(200).json(user)
	} catch (error) {
		res.status(500).json(error)
	}
}

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
