<template>
	<div>HomeView</div>
	{{ threads2 }}
	<div
		v-for="thread in threads"
		:key="thread.id">
		<h2>{{ thread.title }}</h2>
		<div
			v-for="postId in thread.posts"
			:key="postId">
			<p>{{ postById(postId).text }}</p>
		</div>
	</div>
</template>

<script setup>
	import axios from 'axios'
	import sourceData from '../../../../school/src/data.json'
	import { onMounted, ref } from 'vue'

	let threads2 = ref([])
	const threads = ref(sourceData.threads)
	const posts = ref(sourceData.posts)
	const users = ref(sourceData.users)

	function postById(postId) {
		return posts.value.find((post) => post.id === postId)
	}

	onMounted(() => {
		axios.get('http://localhost:5000/api/v1/forums/').then((res) => {
			threads2.value = res.data
			console.log(res.data)
		})
		console.log(`the component is now mounted.`)
	})
</script>

<style scoped></style>
