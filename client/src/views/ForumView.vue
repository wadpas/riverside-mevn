<template>
	<div class="forum-header">
		<div class="forum-details">
			<h1>{{ forumById(props.id)?.name }}</h1>
			<p class="text-lead">{{ forumById(props.id)?.description }}</p>
		</div>
		<button
			@click="pushNewThread"
			class="btn-green btn-small">
			Start a thread
		</button>
	</div>

	<div class="thread-list push-top">
		<h2 class="list-title">Threads</h2>
		<ThreadList :threads="threads" />
	</div>
</template>

<script setup>
	import { onMounted } from 'vue'
	import { storeToRefs } from 'pinia'
	import { useRouter } from 'vue-router'
	import { useForumsStore } from '../stores/ForumsStore'
	import { useThreadsStore } from '../stores/ThreadsStore'
	import { usePostsStore } from '../stores/PostsStore'
	import ThreadList from '../components/ThreadList.vue'

	const props = defineProps({ id: String })
	const forumsStore = useForumsStore()
	const threadsStore = useThreadsStore()
	const postsStore = usePostsStore()
	const router = useRouter()
	const { forumById, forum } = storeToRefs(forumsStore)
	const { threads } = storeToRefs(threadsStore)

	onMounted(async () => {
		try {
			threads.value = []
			await forumsStore.fetchForums()
			await threadsStore.fetchThreads({ forumId: props.id })
			forum.value = forumById.value(props.id)
			console.log('Forum page is Mounted')
		} catch (error) {
			console.log(error)
		}
	})

	function pushNewThread() {
		threadsStore.thread = {}
		postsStore.post = {}
		router.push({ name: 'ThreadCreateEditView' })
	}
</script>

<style scoped></style>
