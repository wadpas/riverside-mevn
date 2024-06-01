<template>
	<h1>{{ thread.title }}</h1>

	<PostItem
		v-for="post in posts"
		:post="post"
		:user="userById(post.userId)"
		:key="post._id" />

	<PostForm @save="addPost" />
</template>

<script setup>
	import axios from 'axios'
	import { onMounted, ref } from 'vue'
	import { storeToRefs } from 'pinia'
	import { useThreadsStore } from '../stores/ThreadsStore'
	import { usePostsStore } from '../stores/PostsStore'
	import { useUsersStore } from '../stores/UsersStore'
	import PostItem from '../components/PostItem.vue'
	import PostForm from '../components/PostForm.vue'

	const props = defineProps({
		id: String,
	})

	const { thread } = storeToRefs(useThreadsStore())
	const { posts } = storeToRefs(usePostsStore())
	const { users } = storeToRefs(useUsersStore())

	function userById(userId) {
		return users.value.find((user) => user._id === userId)
	}

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
			const resUsers = await axios.get('/users')
			users.value = resUsers.data

			const resThread = await axios.get('/threads/' + props.id)
			thread.value = resThread.data

			usePostsStore().fetchPosts({ threadId: props.id })
		} catch (error) {
			console.log(error)
		}
	})
</script>

<style scoped></style>
