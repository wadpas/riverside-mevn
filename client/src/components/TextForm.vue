<template>
	<form @submit.prevent="submit">
		<div class="form-group">
			<input
				v-if="newTread || editTread"
				v-model="formThread.title"
				type="text"
				id="thread_title"
				class="form-input"
				name="title"
				placeholder="Title" />
			<textarea
				v-model="formPost.text"
				id="post_content"
				class="form-input"
				name="content"
				rows="8"
				placeholder="Post"></textarea>
		</div>
		<div class="form-actions">
			<button class="btn-blue">Submit</button>
		</div>
	</form>
</template>

<script setup>
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'

	const router = useRouter()
	import { usePostsStore } from '../stores/PostsStore'
	import { useThreadsStore } from '../stores/ThreadsStore'
	const postsStore = usePostsStore()
	const threadsStore = useThreadsStore()

	const props = defineProps({
		thread: { type: Object, default: () => ({ title: null }) },
		post: { type: Object, default: () => ({ text: null }) },
	})
	const emit = defineEmits(['savePost'])

	const newTread = props.thread.title === undefined && props.post.text === undefined
	const editTread = props.thread.title !== null && props.post.text !== null
	const newPost = props.thread.title === null && props.post.text === null
	const editPost = props.thread.title === null && props.post.text !== null

	let formThread = ref({ ...props.thread })
	let formPost = ref({ ...props.post })

	async function submit() {
		switch (true) {
			case newTread:
				console.log('createThread')
				const dbThread = await threadsStore.createThread(formThread.value.title, formPost.value)
				router.push({ name: 'ThreadView', params: { id: dbThread._id } })
				break
			case editTread:
				console.log('editTread')
				await threadsStore.updateThread({ thread: formThread.value, post: formPost.value })
				router.push({ name: 'ThreadView', params: { id: props.thread._id } })
				break
			case newPost:
				console.log('newPost')
				postsStore.createPost(formPost.value)
				break
			case editPost:
				emit('savePost', formPost)
				break
		}
	}
</script>
