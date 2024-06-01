import axios from 'axios'
import { defineStore } from 'pinia'

export const useThreadsStore = defineStore('ThreadsStore', {
	state: () => {
		return {
			threads: [],
			thread: {},
		}
	},
	actions: {
		async fetchThreads(params) {
			await axios.get('/threads', { params: params }).then((res) => {
				this.threads = res.data.threads
			})
		},
	},
})
