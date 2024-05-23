<template>
	<div class="col-large push-top">
		<h1>{{ thread.title }}</h1>
		<div class="post-list">
			<PostItem
				v-for="post in postsByThreadId(thread._id)"
				:post="post"
				:user="userById(post.userId)"
				:key="post._id"
				class="post" />
		</div>
	</div>
</template>

<script setup>
	import axios from 'axios'
	import { onMounted, ref } from 'vue'
	import PostItem from '../components/PostItem.vue'

	const props = defineProps({
		id: String,
	})

	const thread = ref([])
	const posts = ref([])
	const users = ref([])

	function postsByThreadId(thread_id) {
		return posts.value.filter((post) => post.threadId === thread_id)
	}
	function userById(userId) {
		return users.value.find((user) => user._id === userId)
	}

	onMounted(async () => {
		try {
			const resThread = await axios.get('/threads/' + props.id)
			thread.value = resThread.data
			const resPosts = await axios.get('/posts')
			posts.value = resPosts.data
			const resUsers = await axios.get('/users')
			users.value = resUsers.data
		} catch (error) {
			console.log(error)
		}
	})
</script>

<style scoped></style>
