import axios from 'axios'
import { defineStore } from 'pinia'
import { findById } from '../helpers'

export const useForumsStore = defineStore('ForumsStore', {
	state: () => {
		return {
			forums: [],
			forum: {},
		}
	},
	getters: {
		forumsByIds(state) {
			return (ids) => ids.map((id) => findById(state.forums, id))
		},
		forumById(state) {
			return (id) => findById(state.forums, id)
		},
	},
	actions: {
		async fetchForums() {
			await axios.get('/forums').then((res) => {
				this.forums = res.data.forums
			})
		},

		async fetchForum(id) {
			this.forum = this.forumById(id)
			if (this.forum) return
			await axios.get(`/forums/${id}`).then((res) => {
				this.forum = res.data.forum
			})
		},

		async appendThreadToForum(threadId, forumId) {
			const forum = this.forumById(forumId)
			if (!forum) return
			forum.threads.push(threadId)
			await axios.patch('/forums/' + forumId, { threads: forum.threads })
		},
	},
})
