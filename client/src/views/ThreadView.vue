<template>
	<div class="col-large push-top">
		<h1>{{ thread.title }}</h1>

		<div class="post-list">
			<div
				v-for="postId in thread.posts"
				:key="postId"
				class="post">
				<div class="user-info">
					<a
						href="#"
						class="user-name">
						{{ userById(postById(postId)?.userId)?.name }}
					</a>
					<a href="#">
						<img
							class="avatar-large"
							:src="userById(postById(postId)?.userId)?.avatar"
							alt="" />
					</a>

					<p class="desktop-only text-small">107 posts</p>
				</div>

				<div class="post-content">
					<div>
						<p>
							{{ postById(postId)?.text }}
						</p>
					</div>
				</div>
				<div class="post-date text-faded">{{ postById(postId)?.publishedAt }}</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { onMounted, ref } from 'vue'

	const props = defineProps({
		id: String,
	})

	const thread = ref([])
	const posts = ref([])
	const users = ref([])

	function postById(postId) {
		return posts.value.find((post) => post._id === postId)
	}
	function userById(userId) {
		return users.value.find((user) => user._id === userId)
	}

	onMounted(async () => {
		try {
			const resThread = await axios.get('/threads/' + props.id)
			thread.value = resThread.data
			const resPosts = await axios.get('/posts')
			posts.value = resPosts.data
			const resUsers = await axios.get('/users')
			users.value = resUsers.data
		} catch (error) {
			console.log(error)
		}
	})
</script>

<style scoped></style>
