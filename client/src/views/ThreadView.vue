<template>
	<div class="col-large push-top">
		<h1>{{ thread.title }}</h1>

		<PostItem
			v-for="post in threadPosts"
			:post="post"
			:user="userById(post.userId)"
			:key="post._id"
			class="post" />

		<PostForm @save="addPost" />
	</div>
</template>

<script setup>
	import axios from 'axios'
	import { onMounted, ref } from 'vue'
	import PostItem from '../components/PostItem.vue'
	import PostForm from '../components/PostForm.vue'

	const props = defineProps({
		id: String,
	})

	const thread = ref({})
	const threadPosts = ref([])
	const users = ref([])

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
			threadPosts.value.push(dbPost)

			const resThread = await axios.patch('/threads/' + props.id, { posts: threadPosts.value })
			thread.value = resThread.data.thread
		} catch (error) {
			console.log(error)
		}
	}

	onMounted(async () => {
		try {
			const resThread = await axios.get('/threads/' + props.id)
			thread.value = resThread.data

			const resPosts = await axios.get('/posts', { params: { threadId: thread.value._id } })
			threadPosts.value = resPosts.data

			const resUsers = await axios.get('/users')
			users.value = resUsers.data
		} catch (error) {
			console.log(error)
		}
	})
</script>

<style scoped></style>
