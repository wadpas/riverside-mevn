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
			console.log(params)
			console.log(this.threads)
			await axios.get('/threads', { params: params }).then((res) => {
				this.threads = res.data.threads
			})
			console.log(this.threads)
		},
	},
})
