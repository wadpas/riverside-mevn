<template>
	<h1>Welcome to the Forum</h1>
	<ForumView :threads="threads" />
</template>

<script setup>
	import axios from 'axios'
	import ForumView from './ForumView.vue'
	import { onMounted, ref } from 'vue'

	const threads = ref([])

	onMounted(async () => {
		try {
			const resThreads = await axios.get('/threads')
			threads.value = resThreads.data
		} catch (error) {
			console.log(error)
		}
	})
</script>

<style scoped></style>
