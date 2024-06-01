import { defineStore } from 'pinia'

export const useUsersStore = defineStore('UsersStore', {
	state: () => {
		return {
			users: [],
			authUser: {
				_id: '5232703943485466346e7931',
				avatar: 'http://i.imgur.com/s0AzOkO.png',
				email: 'robin@batmail.com',
				lastVisitAt: '2023-02-22T17:43:32.000Z',
				name: 'Robin',
				registeredAt: '2023-01-15T00:55:40.000Z',
				username: 'robin',
				usernameLower: 'robin',
				postsCount: 7,
				threads: ['7161792d746d346d53626f57', '46367847364f766d7165646c'],
			},
		}
	},
	getters: {},
	actions: {},
})
