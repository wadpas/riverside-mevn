<template>
	<h1>{{ threadById(props.id)?.title }}</h1>

	<PostList :posts="posts" />

	<PostForm @save="addPost" />
</template>

<script setup>
	import { onMounted, ref } from 'vue'
	import { storeToRefs } from 'pinia'
	import { useThreadsStore } from '../stores/ThreadsStore'
	import { usePostsStore } from '../stores/PostsStore'
	import PostList from '../components/PostList.vue'
	import PostForm from '../components/PostForm.vue'

	const props = defineProps({ id: String })

	const threadsStore = useThreadsStore()
	const postsStore = usePostsStore()
	const { threadById } = storeToRefs(threadsStore)
	const { posts } = storeToRefs(postsStore)

	onMounted(async () => {
		try {
			posts.value = []
			await threadsStore.fetchThreads({ _id: props.id })
			await postsStore.fetchPosts({ threadId: props.id })
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
