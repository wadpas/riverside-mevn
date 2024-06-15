<template>
	<h1>{{ threadById(props.id)?.title }}</h1>

	<PostList :posts="posts" />

	<PostForm @save="addPost" />
</template>

<script setup>
	import axios from 'axios'
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

	async function addPost(eventData) {
		const post = {
			...eventData.post,
			threadId: props.id,
		}
		try {
			const resPost = await axios.post('/posts', post)
			const dbPost = resPost.data
			usePostsStore().createPost(dbPost)
			const resThread = await axios.patch('/threads/' + props.id, { posts: posts.value })
		} catch (error) {
			console.log(error.response.data.msg)
		}
	}

	onMounted(async () => {
		try {
			posts.value = []
			await threadsStore.fetchThreads({ _id: props.id })
			await postsStore.fetchPosts({ threadId: props.id })
		} catch (error) {
			console.log(error)
		}
	})
</script>

<style scoped></style>
