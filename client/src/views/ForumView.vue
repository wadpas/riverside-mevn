<template>
	<div class="forum-header">
		<div class="forum-details">
			<h1>{{ forum.name }}</h1>
			<p class="text-lead">{{ forum.description }}</p>
		</div>
		<a
			href="new-thread.html"
			class="btn-green btn-small">
			Start a thread
		</a>
	</div>
	<div class="thread-list push-top">
		<h2 class="list-title">Threads</h2>
		<ThreadItem
			v-for="thread in threads"
			:thread="thread"
			:user="userById(thread.userId)"
			:key="thread._id" />
	</div>
</template>

<script setup>
	import axios from 'axios'
	import { onMounted } from 'vue'
	import { storeToRefs } from 'pinia'
	import { useUsersStore } from '../stores/UsersStore'
	import { useForumsStore } from '../stores/ForumsStore'
	import { useThreadsStore } from '../stores/ThreadsStore'
	import ThreadItem from '../components/ThreadItem.vue'

	const props = defineProps({
		id: String,
	})

	const { users } = storeToRefs(useUsersStore())
	const { forum } = storeToRefs(useForumsStore())
	const { threads } = storeToRefs(useThreadsStore())

	function userById(userId) {
		return users.value.find((user) => user._id === userId)
	}

	onMounted(async () => {
		try {
			threads.value = []
			const resUsers = await axios.get('/users')
			users.value = resUsers.data

			const resForum = await axios.get('/forums/' + props.id)
			forum.value = resForum.data

			const resThreads = await axios.get('/threads', { params: { forumId: props.id } })
			threads.value = resThreads.data
		} catch (error) {
			console.log(error)
		}
	})
</script>

<style scoped></style>
