import { defineStore } from 'pinia'

export const useThreadsStore = defineStore('ThreadsStore', {
	state: () => {
		return {
			threads: [],
			thread: {},
		}
	},
	getters: {},
	actions: {},
})
