import axios from '../axios'
import { defineStore } from 'pinia'
import { findById, upsert } from '../helpers'

export const useUsersStore = defineStore('UsersStore', {
	state: () => ({
		users: [],
		authUser: {},
		activeUser: {},
	}),
	getters: {
		userById(state) {
			return (id) => findById(state.users, id)
		},
		authUserExist() {
			return Object.keys(this.authUser).length > 0
		},
	},

	actions: {
		async fetchUser() {
			const token = localStorage.getItem('token')
			if (!token) return
			const resUser = await axios.get(`/users/me`)
			this.authUser = resUser.data.user
			upsert(this.users, this.authUser)
			return this.authUser
		},

		async fetchUsers(params) {
			await axios.get('/users', { params: params }).then((res) => {
				res.data.users.forEach((user) => upsert(this.users, user))
			})
		},

		async appendThreadToUser(threadId, userId) {
			const user = this.userById(userId)
			if (!user) return
			user.threads.push(threadId)
			console.log(user.threads)
			await axios.patch(`/users/${userId}`, { threads: user.threads })
		},

		async appendPostToUser() {
			const token = localStorage.getItem('token')
			if (!token) return
			await axios.patch(`/users/me`, { postsCount: this.authUser.postsCount + 1 })
		},

		async createUser(user) {
			user.usernameLower = user.username.toLowerCase()
			user.email = user.email.toLowerCase()
			try {
				const resUser = await axios.post('/auth/register', user)
				const dbUser = resUser.data.user
				this.authUser = dbUser
				upsert(this.users, dbUser)
			} catch (error) {
				console.log(error)
			}
		},

		async loginUser(credentials) {
			try {
				const resUser = await axios.post('/auth/login', credentials)
				this.authUser = resUser.data.user
				upsert(this.users, this.authUser)
				localStorage.setItem('token', resUser.data.token)
			} catch (error) {
				console.log(error)
			}
		},

		async signOut() {
			this.authUser = {}
			localStorage.removeItem('token')
		},

		async updateUser() {
			const userIndex = this.users.findIndex((user) => user._id === this.activeUser._id)
			this.users[userIndex] = this.activeUser
			this.authUser = this.activeUser
			await axios.patch('/users/' + this.activeUser._id, this.activeUser)
		},
	},
})
//
