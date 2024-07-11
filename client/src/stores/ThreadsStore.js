import axios from 'axios'
import { defineStore } from 'pinia'
import { useUsersStore } from '../stores/UsersStore'
import { usePostsStore } from '../stores/PostsStore'
import { useForumsStore } from '../stores/ForumsStore'

export const useThreadsStore = defineStore('ThreadsStore', {
	state: () => {
		return {
			threads: [],
			thread: {},
			usersStore: useUsersStore(),
			postsStore: usePostsStore(),
			forumsStore: useForumsStore(),
		}
	},
	getters: {
		threadById(state) {
			return (id) => state.threads.find((thread) => thread._id === id)
		},
	},
	actions: {
		async fetchThreads(params) {
			if (this.threads.length > 0) return
			await axios.get('/threads', { params: params }).then((res) => {
				this.threads = res.data.threads
			})
		},

		async appendToThread(threadId, postId, userId) {
			const thread = this.threadById(threadId)
			if (!thread) return
			thread.posts.push(postId)
			await axios.patch('/threads/' + threadId, {
				posts: thread.posts,
			})
			if (this.thread.contributors.includes(userId)) return
			thread.posts.push(userId)
			thread.contributors.push(userId)
			await axios.patch('/threads/' + threadId, {
				contributors: thread.contributors,
			})
		},

		async createThread(post, forum) {
			this.thread.contributors = []
			this.thread.firstPostId = '2d2d61706a4442775342435a'
			this.thread.lastPostAt = Date.now().toString()
			this.thread.lastPostId = '7a66707a6e55566834445361'
			this.thread.posts = []
			this.thread.publishedAt = Date.now().toString()
			this.thread.slug = this.thread.title.toLowerCase().replace(/ /g, '-')
			this.thread.userId = this.usersStore.authUser._id
			this.thread.forumId = forum._id

			const resThread = await axios.post('/threads', this.thread, null)
			const dbThread = resThread.data.thread
			this.threads.push(dbThread)
			post.threadId = dbThread._id

			this.postsStore.createPost(post)
			this.appendToThread(dbThread._id, createdPost._id)
			this.forumsStore.appendThreadToForum(dbThread._id, forum._id)
			this.usersStore.appendThreadToUser(dbThread._id, this.usersStore.authUser._id)

			return dbThread
		},

		async updateThread() {
			await axios.patch('/threads/' + this.thread._id, this.thread)
			const index = this.threads.findIndex((item) => item._id === this.thread._id)
			this.threads[index] = this.thread

			await this.postsStore.updatePost()
		},
	},
})
