import axios from 'axios'
import { defineStore } from 'pinia'

export const useThreadsStore = defineStore('ThreadsStore', {
	state: () => {
		return {
			threads: [],
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
	},
})
