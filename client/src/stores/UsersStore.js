import axios from 'axios'
import { defineStore } from 'pinia'

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
			return (id) => state.users.find((user) => user._id === id)
		},
	},

	actions: {
		async fetchUsers() {
			if (this.users.length) return
			await axios.get('/users').then((res) => {
				this.users = res.data.users
				this.authUser = { ...this.userById('324d58435944716d4e416832') }
				this.activeUser = { ...this.userById('324d58435944716d4e416832') }
			})
		},

		async appendThreadToUser(threadId, userId) {
			const user = this.userById(userId)
			if (!user) return
			user.threads.push(threadId)
			await axios.patch('/users/' + userId, { threads: user.threads })
		},

		async updateUser() {
			const userIndex = this.users.findIndex((user) => user._id === this.activeUser._id)
			this.users[userIndex] = this.activeUser
			this.authUser = this.activeUser
			await axios.patch('/users/' + this.activeUser._id, this.activeUser)
		},
	},
})
