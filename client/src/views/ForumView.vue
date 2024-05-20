<template>
	<div class="col-full">
		<div class="thread-list">
			<h2 class="list-title">Threads</h2>
			<div
				v-for="thread in threads"
				:key="thread.id"
				class="thread">
				<div>
					<p>
						<router-link :to="{ name: 'ThreadView', params: { id: thread._id } }">{{ thread.title }}</router-link>
					</p>
					<p class="text-faded text-xsmall">
						By
						<a href="#">{{ userById(thread.userId)?.name }}</a>
						, {{ thread.publishedAt }}.
					</p>
				</div>
				<div class="activity">
					<p class="replies-count">{{ thread.posts.length }} replies</p>
					<img
						class="avatar-medium"
						:src="userById(thread.userId)?.avatar"
						alt="" />
					<div>
						<p class="text-xsmall">
							<a href="#">{{ userById(thread.userId)?.name }}</a>
						</p>
						<p class="text-xsmall text-faded">{{ thread.publishedAt }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import axios from 'axios'
	import { onMounted, ref } from 'vue'

	const props = defineProps({
		threads: Array,
	})

	const posts = ref([])
	const users = ref([])

	function userById(userId) {
		return users.value.find((user) => user._id === userId)
	}

	onMounted(async () => {
		try {
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
