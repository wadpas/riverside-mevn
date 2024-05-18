<template>
	<div>HomeView</div>
	<div
		v-for="thread in threads"
		:key="thread.id">
		<h2>{{ thread.title }}</h2>
		<div
			v-for="postId in thread.posts"
			:key="postId">
			<p>{{ postById(postId)?.text }}</p>
		</div>
	</div>
</template>

<script setup>
	import axios from 'axios'
	import sourceData from '../../../../school/src/data.json'
	import { onMounted, ref } from 'vue'

	const threads = ref([])
	const posts = ref([])

	function postById(postId) {
		return posts.value.find((post) => post._id === postId)
	}

	onMounted(async () => {
		try {
			const resThreads = await axios.get('/threads')
			threads.value = resThreads.data
			const resPosts = await axios.get('/posts')
			posts.value = resPosts.data
		} catch (error) {
			console.log(error)
		}
	})
</script>

<style scoped></style>
