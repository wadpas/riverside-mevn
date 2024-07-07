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

	<PostList :posts="posts" />

	<PostForm @save="addPost" />
</template>

<script setup>
	import { onMounted, onUnmounted } from 'vue'
	import { storeToRefs } from 'pinia'
	import { useThreadsStore } from '../stores/ThreadsStore'
	import { usePostsStore } from '../stores/PostsStore'
	import PostList from '../components/PostList.vue'
	import PostForm from '../components/PostForm.vue'

	const props = defineProps({ id: String })

	const threadsStore = useThreadsStore()
	const postsStore = usePostsStore()
	const { threadById, thread } = storeToRefs(threadsStore)
	const { posts, post } = storeToRefs(postsStore)

	onMounted(async () => {
		try {
			posts.value = []
			thread.value = {}
			await threadsStore.fetchThreads()
			await postsStore.fetchPosts({ threadId: props.id })
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
