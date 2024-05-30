import { defineStore } from 'pinia'

export const useUsersStore = defineStore('UsersStore', {
	state: () => {
		return {
			users: [],
		}
	},
	getters: {},
	actions: {},
})
