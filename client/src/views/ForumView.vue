<template>
	<div class="forum-header">
		<div class="forum-details">
			<h1>{{ forum?.name }}</h1>
			<p class="text-lead">{{ forum?.description }}</p>
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
	import { onBeforeMount, onUnmounted } from 'vue'
	import { storeToRefs } from 'pinia'
	import { useRouter } from 'vue-router'
	import { useForumsStore } from '../stores/ForumsStore'
	import { useThreadsStore } from '../stores/ThreadsStore'
	import { usePostsStore } from '../stores/PostsStore'
	import { useUsersStore } from '../stores/UsersStore'
	import ThreadList from '../components/ThreadList.vue'

	const props = defineProps({ id: String })
	const forumsStore = useForumsStore()
	const threadsStore = useThreadsStore()
	const postsStore = usePostsStore()
	const usersStore = useUsersStore()
	const router = useRouter()

	const { forum } = storeToRefs(forumsStore)
	const { threads } = storeToRefs(threadsStore)

	onBeforeMount(async () => {
		threads.value = []
		forumsStore.fetchForum(props.id)
		await threadsStore.fetchThreads({ forumId: props.id })
		const usersIds = threads.value.map((p) => p.userId)
		usersStore.fetchUsers({ usersIds })
	})

	function pushNewThread() {
		threadsStore.thread = {}
		postsStore.post = {}
		router.push({ name: 'ThreadCreateEditView' })
	}
</script>
