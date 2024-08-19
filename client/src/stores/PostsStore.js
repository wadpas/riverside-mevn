import axios from 'axios'
import { defineStore } from 'pinia'
import { findById, upsert } from '../helpers'
import { useUsersStore } from '../stores/UsersStore'
import { useThreadsStore } from '../stores/ThreadsStore'
import { useForumsStore } from '../stores/ForumsStore'

export const usePostsStore = defineStore('PostsStore', {
	state: () => ({
		posts: [],
		post: {},
		usersStore: useUsersStore(),
		threadsStore: useThreadsStore(),
		forumsStore: useForumsStore(),
	}),
	getters: {
		getUserPosts: (state) => {
			return (id) => state.posts.filter((post) => post.userId === id)
		},
	},
	actions: {
		async fetchPosts(params) {
			await axios.get('/posts', { params: params }).then((res) => {
				this.posts = res.data.posts
				this.post = { ...res.data.posts[0] }
			})
		},

		async createPost(post) {
			post.userId = this.usersStore.authUser._id
			post.threadId = post.threadId || this.threadsStore.thread._id
			const token = localStorage.getItem('neos_token')
			if (!token) return
			try {
				const resPost = await axios.post('/posts', post)
				this.post = resPost.data.post
				this.posts.push(this.post)
				this.threadsStore.appendToThread(post.threadId, this.post._id)
				this.usersStore.appendPostToUser()
				return this.post
			} catch (error) {
				console.log(error)
			}
		},

		async updatePost(newPost) {
			console.log(newPost)
			if (newPost) this.post = newPost
			await axios.patch(`/posts/${this.post._id}`, this.post)
			upsert(this.posts, this.post)
		},
	},
})
