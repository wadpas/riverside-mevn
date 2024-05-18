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
	const user = await User.create(req.body)
	res.status(201).json({ user })
}

const getUser = (req, res) => {
	res.json({ id: req.params.id })
}

const updateUser = (req, res) => {
	res.send('Update user')
}

const deleteUser = (req, res) => {
	res.send('Delete user')
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
