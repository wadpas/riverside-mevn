<template>
	<h1>
		<router-link
			:to="{ name: 'ThreadCreateEditView' }"
			class="btn-green btn-small"
			tag="button">
			Edit
		</router-link>
		{{ thread?.title }}
	</h1>
	<p>
		By
		<a
			href="#"
			class="link-unstyled">
			{{ userById(thread?.userId)?.name }}
		</a>
		,
		<AppDate :timestamp="thread?.publishedAt" />
		<span
			style="float: right; margin-top: 2px"
			class="hide-mobile text-faded text-small">
			{{ thread?.posts.length - 1 }} replies by {{ thread?.contributors.length }} contributors
		</span>
	</p>
	<PostList :posts="posts" />

	<PostForm @save="addPost" />
</template>

<script setup>
	import { onBeforeMount, onUnmounted } from 'vue'
	import { storeToRefs } from 'pinia'
	import { useThreadsStore } from '../stores/ThreadsStore'
	import { usePostsStore } from '../stores/PostsStore'
	import { useUsersStore } from '../stores/UsersStore'
	import PostList from '../components/PostList.vue'
	import PostForm from '../components/PostForm.vue'
	import AppDate from '../components/AppDate.vue'

	const props = defineProps({ id: String })
	const threadsStore = useThreadsStore()
	const postsStore = usePostsStore()
	const usersStore = useUsersStore()
	const { thread } = storeToRefs(threadsStore)
	const { posts } = storeToRefs(postsStore)
	const { userById } = storeToRefs(usersStore)

	onBeforeMount(async () => {
		posts.value = []
		await threadsStore.fetchThread(props.id)
		await postsStore.fetchPosts({ threadId: props.id })
		const usersIds = posts.value.map((p) => p.userId)
		usersStore.fetchUsers({ usersIds })
	})

	async function addPost(eventData) {
		const post = {
			...eventData.post,
			threadId: props.id,
		}
		try {
			postsStore.createPost(post, props.id)
		} catch (error) {
			console.log(error)
		}
	}
</script>

<style scoped></style>
