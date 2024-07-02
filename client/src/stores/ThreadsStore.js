import axios from 'axios'
import { defineStore } from 'pinia'
import { useUsersStore } from '../stores/UsersStore'
import { usePostsStore } from '../stores/PostsStore'
import { useForumsStore } from '../stores/ForumsStore'

export const useThreadsStore = defineStore('ThreadsStore', {
	state: () => {
		return {
			threads: [],
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

		async appendPostToThread(postId, threadId) {
			const thread = this.threadById(threadId)
			if (!thread) return
			thread.posts.push(postId)
			await axios.patch('/threads/' + threadId, { posts: thread.posts })
		},

		async createThread(thread, post, forumId) {
			thread.contributors = []
			thread.firstPostId = '2d2d61706a4442775342435a'
			thread.lastPostAt = Math.floor(Date.now() / 1000)
			thread.lastPostId = '7a66707a6e55566834445361'
			thread.posts = []
			thread.publishedAt = Math.floor(Date.now() / 1000)
			thread.slug = thread.title.toLowerCase().replace(/ /g, '-')
			thread.userId = this.usersStore.authUser._id

			const resThread = await axios.post('/threads', thread)
			const dbThread = resThread.data.thread
			this.threads.push(dbThread)
			post.threadId = dbThread._id

			const createdPost = await this.postsStore.createPost(post)
			this.appendPostToThread(createdPost._id, dbThread._id)
			this.forumsStore.appendThreadToForum(dbThread._id, forumId)
			this.usersStore.appendThreadToUser(dbThread._id, this.usersStore.authUser._id)

			return dbThread
		},
	},
})
