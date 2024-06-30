<template>
	<div class="col-full push-top">
		<h1>
			Create new thread in
			{{ forumById(forumId)?.name }}
		</h1>

		<form @submit.prevent="save">
			<div class="form-group">
				<label for="thread_title">Title:</label>
				<input
					v-model="title"
					type="text"
					id="thread_title"
					class="form-input"
					name="title" />
			</div>

			<div class="form-group">
				<label for="thread_content">Content:</label>
				<textarea
					v-model="text"
					id="thread_content"
					class="form-input"
					name="content"
					rows="8"
					cols="140"></textarea>
			</div>

			<div class="btn-group">
				<button class="btn btn-ghost">Cancel</button>
				<button
					class="btn btn-blue"
					type="submit"
					name="Publish">
					Publish
				</button>
			</div>
		</form>
	</div>

	{{ forum }}
</template>

<script setup>
	import { storeToRefs } from 'pinia'
	import { useRoute, useRouter } from 'vue-router'
	import { useForumsStore } from '../stores/ForumsStore'
	import { useThreadsStore } from '../stores/ThreadsStore'

	const router = useRouter()
	const forumsStore = useForumsStore()
	const threadsStore = useThreadsStore()
	const { forumById } = storeToRefs(forumsStore)

	const props = defineProps({
		forumId: { type: String },
	})

	let title = ''
	let text = ''

	function save() {
		threadsStore.createThread()
		// router.push({ name: 'ProfileView' })
	}
</script>

<style lang="scss" scoped></style>
