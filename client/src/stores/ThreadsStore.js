import axios from 'axios'
import { defineStore } from 'pinia'
import { useUsersStore } from '../stores/UsersStore'

export const useThreadsStore = defineStore('ThreadsStore', {
	state: () => {
		return {
			threads: [],
			usersStore: useUsersStore(),
		}
	},
	getters: {
		threadById(state) {
			return (id) => state.threads.find((thread) => thread._id === id)
		},
	},
	actions: {
		async fetchThreads(params) {
			await axios.get('/threads', { params: params }).then((res) => {
				this.threads = res.data.threads
			})
		},
		async updateThread(postId, threadId) {
			const thread = this.threadById(threadId)
			if (!thread) return
			await axios.patch('/threads/' + threadId, { posts: thread.posts })
			thread.posts.push(postId)
		},
		async createThread(postId) {
			// await axios.post('/threads', { title, forumId })
			console.log(this.usersStore.authUser)
		},
	},
})
