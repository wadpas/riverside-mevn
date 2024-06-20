import axios from 'axios'
import { defineStore } from 'pinia'

export const usePostsStore = defineStore('PostsStore', {
	state: () => ({
		posts: [],
	}),
	getters: {
		getPostsIds: (state) => {
			return state.posts.map((post) => post.id)
		},
		getPostById: (state) => {
			return (id) => state.posts.find((post) => post.id === id)
		},
	},
	actions: {
		async fetchPosts(params) {
			await axios.get('/posts', { params: params }).then((res) => {
				this.posts = res.data.posts
			})
		},
		async createPost(post) {
			try {
				const resPost = await axios.post('/posts', post)
				const dbPost = resPost.data.post
				this.posts.push(dbPost)
				return dbPost
			} catch (error) {
				console.log(error.response.data.msg)
			}
		},
	},
})
