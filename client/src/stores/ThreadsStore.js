import axios from 'axios'
import { defineStore } from 'pinia'
import { findById, upsert } from '../helpers'
import { useUsersStore } from '../stores/UsersStore'
import { usePostsStore } from '../stores/PostsStore'
import { useForumsStore } from '../stores/ForumsStore'

export const useThreadsStore = defineStore('ThreadsStore', {
	state: () => ({
		threads: [],
		thread: {},
		usersStore: useUsersStore(),
		postsStore: usePostsStore(),
		forumsStore: useForumsStore(),
	}),
	getters: {
		threadById(state) {
			return (id) => findById(state.threads, id)
		},
	},
	actions: {
		async fetchThreads(params) {
			await axios.get('/threads', { params: params }).then((res) => {
				this.threads = res.data.threads
			})
		},

		async fetchThread(id) {
			this.thread = this.threadById(id)
			if (this.thread) return
			await axios.get(`/threads/${id}`).then((res) => {
				this.thread = res.data.thread
			})
		},

		async appendToThread(threadId, postId) {
			console.log(threadId)

			this.thread.posts.push(postId)

			await axios.patch('/threads/' + threadId, {
				posts: this.thread.posts,
			})
			if (this.thread.contributors.includes(this.usersStore.authUser._id)) return
			this.thread.contributors.push(this.usersStore.authUser._id)
			await axios.patch('/threads/' + threadId, {
				contributors: this.thread.contributors,
			})
		},

		async createThread(title, post) {
			this.thread.title = title
			this.thread.contributors = []
			this.thread.firstPostId = '2d2d61706a4442775342435a'
			this.thread.lastPostAt = Date.now().toString()
			this.thread.lastPostId = '7a66707a6e55566834445361'
			this.thread.posts = []
			this.thread.publishedAt = Date.now().toString()
			this.thread.slug = this.thread.title.toLowerCase().replace(/ /g, '-')
			this.thread.forumId = this.forumsStore.forum._id

			const resThread = await axios.post('/threads', this.thread)
			this.thread = resThread.data.thread
			this.threads.push(this.thread)

			post.threadId = this.thread._id
			await this.postsStore.createPost(post)
			return this.thread
		},

		async updateThread({ thread }) {
			if (thread) this.thread = thread
			await axios.patch('/threads/' + this.thread._id, thread)
			upsert(this.threads, this.thread)
		},
	},
})
