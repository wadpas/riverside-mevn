import axios from 'axios'
import { defineStore } from 'pinia'
import { useThreadsStore } from '../stores/ThreadsStore'

export const usePostsStore = defineStore('PostsStore', {
	state: () => ({
		posts: [],
	}),
	actions: {
		async fetchPosts(params) {
			await axios.get('/posts', { params: params }).then((res) => {
				this.posts = res.data.posts
			})
		},
		createPost(post) {
			this.posts.push(post)
			useThreadsStore().thread.posts.push(post._id)
		},
	},
})
