import { defineStore } from 'pinia'

export const useForumsStore = defineStore('ForumsStore', {
	state: () => {
		return {
			forums: [],
			forum: {},
		}
	},
	getters: {},
	actions: {},
})
