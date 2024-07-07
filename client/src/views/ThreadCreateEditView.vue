<template>
	<div class="col-full push-top">
		<h1>{{ !!thread._id ? 'Edit' : 'Create' }} new thread in {{ forum.name }}</h1>

		<form @submit.prevent="true ? update() : create()">
			<div class="form-group">
				<label for="thread_title">Title:</label>
				<input
					v-model="thread.title"
					type="text"
					id="thread_title"
					class="form-input"
					name="title" />
			</div>

			<div class="form-group">
				<label for="thread_content">Content:</label>
				<textarea
					v-model="post.text"
					id="thread_content"
					class="form-input"
					name="content"
					rows="8"
					cols="140"></textarea>
			</div>

			<div class="btn-group">
				<button
					@click="cancel"
					class="btn btn-ghost">
					Cancel
				</button>
				<button
					class="btn btn-blue"
					type="submit"
					name="Publish">
					Publish
				</button>
			</div>
		</form>
	</div>
</template>

<script setup>
	import { storeToRefs } from 'pinia'
	import { useRouter } from 'vue-router'
	import { useForumsStore } from '../stores/ForumsStore'
	import { useThreadsStore } from '../stores/ThreadsStore'
	import { usePostsStore } from '../stores/PostsStore'

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
		router.push({ name: 'ForumView', params: { id: props.forumId } })
	}
</script>

<style lang="scss" scoped></style>
