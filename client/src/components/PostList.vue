<template>
	<div
		v-for="post in posts"
		class="post">
		<div class="user-info">
			<a
				href="#"
				class="user-name">
				{{ userById(post.userId)?.name }}
			</a>
			<a href="#">
				<img
					class="avatar-large"
					:src="userById(post.userId)?.avatar"
					alt="" />
			</a>

			<p class="desktop-only text-small">107 posts</p>
		</div>

		<div class="post-content">
			<div>
				<p>
					{{ post.text }}
				</p>
			</div>
		</div>

		<div class="post-date text-faded">
			<AppDate :timestamp="post.publishedAt" />
		</div>
	</div>
</template>

<script setup>
	import { onMounted } from 'vue'
	import { storeToRefs } from 'pinia'
	import { useUsersStore } from '../stores/UsersStore'
	import AppDate from './AppDate.vue'

	const props = defineProps({ posts: Array })
	const usersStore = useUsersStore()
	const { userById } = storeToRefs(usersStore)

	onMounted(async () => {
		try {
			await usersStore.fetchUsers()
		} catch (error) {
			console.log(error)
		}
	})
</script>

<style scoped></style>
