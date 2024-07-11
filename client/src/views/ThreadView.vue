<template>
	<h1>
		<router-link
			:to="{ name: 'ThreadCreateEditView' }"
			class="btn-green btn-small"
			tag="button">
			Edit
		</router-link>
		{{ thread?.title }}
	</h1>
	<p>
		By
		<a
			href="#"
			class="link-unstyled">
			{{ userById(thread.userId)?.name }}
		</a>
		,
		<AppDate :timestamp="thread?.publishedAt" />
		<span
			style="float: right; margin-top: 2px"
			class="hide-mobile text-faded text-small">
			{{ thread.posts?.length - 1 }} replies by {{ thread.contributors?.length }} contributors
		</span>
	</p>
	<PostList :posts="getThreadPosts(id)" />

	<PostForm @save="addPost" />
</template>

<script setup>
	import { onMounted, onUnmounted } from 'vue'
	import { storeToRefs } from 'pinia'
	import { useThreadsStore } from '../stores/ThreadsStore'
	import { usePostsStore } from '../stores/PostsStore'
	import { useUsersStore } from '../stores/UsersStore'
	import PostList from '../components/PostList.vue'
	import PostForm from '../components/PostForm.vue'
	import AppDate from '../components/AppDate.vue'

	const props = defineProps({ id: String })

	const threadsStore = useThreadsStore()
	const postsStore = usePostsStore()
	const usersStore = useUsersStore()
	const { threadById, thread } = storeToRefs(threadsStore)
	const { posts, post, getThreadPosts } = storeToRefs(postsStore)
	const { userById } = storeToRefs(usersStore)

	onMounted(async () => {
		try {
			posts.value = []
			thread.value = {}
			await threadsStore.fetchThreads()
			await postsStore.fetchPosts()
			thread.value = threadById.value(props.id)
			post.value = posts.value[0]
			console.log('Thread page is Mounted')
		} catch (error) {
			console.log(error)
		}
	})

	async function addPost(eventData) {
		const post = {
			...eventData.post,
			threadId: props.id,
		}
		try {
			postsStore.createPost(post, props.id)
		} catch (error) {
			console.log(error)
		}
	}
</script>

<style scoped></style>
