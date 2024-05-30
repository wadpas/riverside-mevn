import { defineStore } from 'pinia'
import { useThreadsStore } from '../stores/ThreadsStore'

export const usePostsStore = defineStore('PostsStore', {
	state: () => {
		return {
			posts: [],
		}
	},
	getters: {},
	actions: {
		createPost(post) {
			this.posts.push(post)
			useThreadsStore().thread.posts.push(post._id)
		},
	},
})
