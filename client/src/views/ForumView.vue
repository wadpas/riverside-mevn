<template>
	<div class="forum-header">
		<div class="forum-details">
			<h1>{{ forumById(props.id)?.name }}</h1>
			<p class="text-lead">{{ forumById(props.id)?.description }}</p>
		</div>
		<router-link
			:to="{ name: 'ThreadCreate', params: { forumId: props.id } }"
			class="btn-green btn-small">
			Start a thread
		</router-link>
	</div>

	<div class="thread-list push-top">
		<h2 class="list-title">Threads</h2>
		<ThreadList :threads="threads" />
	</div>
</template>

<script setup>
	import { onMounted } from 'vue'
	import { storeToRefs } from 'pinia'
	import { useForumsStore } from '../stores/ForumsStore'
	import { useThreadsStore } from '../stores/ThreadsStore'
	import ThreadList from '../components/ThreadList.vue'

	const props = defineProps({ id: String })

	const forumsStore = useForumsStore()
	const threadsStore = useThreadsStore()
	const { forumById } = storeToRefs(forumsStore)
	const { threads } = storeToRefs(threadsStore)

	onMounted(async () => {
		try {
			threads.value = []
			await forumsStore.fetchForums()
			await threadsStore.fetchThreads({ forumId: props.id })
			console.log('Forum page is Mounted')
		} catch (error) {
			console.log(error)
		}
	})
</script>

<style scoped></style>
