import axios from 'axios'
import { defineStore } from 'pinia'
import { findById, upsert } from '../helpers'

export const useUsersStore = defineStore('UsersStore', {
	state: () => {
		return {
			users: [],
			authUser: {},
			activeUser: {},
		}
	},
	getters: {
		userById(state) {
			return (id) => findById(state.users, id)
		},
	},
	actions: {
		async fetchAuthUser(id) {
			await axios.get(`/users/${id}`).then((res) => {
				this.authUser = res.data.user
				upsert(this.users, this.authUser)
			})
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

		async appendPostToUser(userId) {
			const user = this.userById(userId)
			if (!user) return
			user.postsCount += 1
			await axios.patch(`/users/${userId}`, { postsCount: user.postsCount })
		},

		async updateUser() {
			const userIndex = this.users.findIndex((user) => user._id === this.activeUser._id)
			this.users[userIndex] = this.activeUser
			this.authUser = this.activeUser
			await axios.patch('/users/' + this.activeUser._id, this.activeUser)
		},
	},
})
