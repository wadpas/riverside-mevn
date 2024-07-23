<template>
	<div class="col-full push-top">
		<h1>{{ !!thread._id ? `Edit ${thread.title}` : 'Create' }} thread in {{ forum.name }}</h1>
		<TextForm
			:post="post"
			:thread="thread" />
	</div>
</template>

<script setup>
	import { storeToRefs } from 'pinia'
	import { useRouter } from 'vue-router'
	import { useForumsStore } from '../stores/ForumsStore'
	import { useThreadsStore } from '../stores/ThreadsStore'
	import { usePostsStore } from '../stores/PostsStore'
	import TextForm from '../components/TextForm.vue'

	const router = useRouter()
	const forumsStore = useForumsStore()
	const threadsStore = useThreadsStore()
	const postsStore = usePostsStore()
	const { forum } = storeToRefs(forumsStore)
	const { thread } = storeToRefs(threadsStore)
	const { post } = storeToRefs(postsStore)

	async function create() {
		const dbThread = await threadsStore.createThread(post.value, forum.value)
		router.push({ name: 'ThreadView', params: { id: dbThread._id } })
	}

	async function update() {
		await threadsStore.updateThread(post.value)
		router.push({ name: 'ThreadView', params: { id: thread.value._id } })
	}

	function cancel() {
		router.push({ name: 'ForumView', params: { id: forum.value_id } })
	}
</script>

<style lang="scss" scoped></style>
